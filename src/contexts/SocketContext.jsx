import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useRealtimeJson } from '../hooks/useRealtimeJson';
import { endpoints } from '../api/endpoints';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [socketData, setSocketData] = useState(null);
  const [status, setStatus] = useState('closed');
  const socketRef = useRef(null);
  const currentLoginIdRef = useRef(null);

  // Primary source: Dashboard
  const { data: dashData } = useRealtimeJson(endpoints.dashboard, {
    enabled: isAuthenticated && !!endpoints.dashboard,
  });

  // Secondary source: User-DashboardById (mapped as deposits)
  const { data: dashDataAlt } = useRealtimeJson(endpoints.deposits, {
    enabled: isAuthenticated && !!endpoints.deposits,
  });

  // Fallback source: Accounts List
  const { data: accountsData } = useRealtimeJson(endpoints.accounts, {
    enabled: isAuthenticated && !!endpoints.accounts && !dashData && !dashDataAlt,
  });

  // Extract loginId from whichever source actually HAS accounts
  const loginId = useMemo(() => {
    const sources = [
      { name: 'dashboard', data: dashData?.data || dashData },
      { name: 'dashboard-alt', data: dashDataAlt?.data || dashDataAlt },
      { name: 'accounts', data: accountsData?.data || accountsData }
    ];

    for (const source of sources) {
      const dataObj = source.data;
      if (!dataObj) continue;

      const list = Array.isArray(dataObj) 
        ? dataObj 
        : (dataObj?.mT5AccountList || dataObj?.accounts || dataObj?.accountList || dataObj?.accountDetails || []);
      
      if (list.length > 0) {
        const first = list[0];
        const id = first?.login || first?.accountNo || first?.account_no || first?.id;
        if (id) {
          console.log(`[SocketContext] Found loginId ${id} from source: ${source.name}`);
          return id;
        }
      }

      // Special case: check for walletAccountNo if no MT5 list found in this source
      if (dataObj?.walletAccountNo) {
        console.log(`[SocketContext] Using walletAccountNo ${dataObj.walletAccountNo} from source: ${source.name}`);
        return dataObj.walletAccountNo;
      }
    }
    
    console.log('[SocketContext] loginId still null after checking all sources');
    return null;
  }, [dashData, dashDataAlt, accountsData]);

  useEffect(() => {
    console.log('[SocketContext] Auth State:', { isAuthenticated, hasToken: !!token, loginId });

    if (!isAuthenticated || !token || !loginId) {
      // Close socket if we lose auth/loginId
      if (socketRef.current && socketRef.current.readyState !== WebSocket.CLOSED) {
        console.log('[SocketContext] Closing socket due to missing requirements');
        socketRef.current.close();
        socketRef.current = null;
        setStatus('closed');
      }
      return;
    }

    // Don't reconnect if already open for the same loginId
    if (
      socketRef.current &&
      currentLoginIdRef.current === loginId &&
      (socketRef.current.readyState === WebSocket.CONNECTING ||
        socketRef.current.readyState === WebSocket.OPEN)
    ) {
      return;
    }

    // Close old socket if loginId changed
    if (socketRef.current && socketRef.current.readyState !== WebSocket.CLOSED) {
      socketRef.current.close();
    }

    currentLoginIdRef.current = loginId;
    // Use direct wss URL to cabinet server to bypass proxy upgrade issues
    const wsUrl = `wss://cabinet.neptunefxcrm.com/ws?token=${token}`;
    console.log('[SocketContext] Connecting WebSocket directly to cabinet:', wsUrl);

    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;
    setStatus('connecting');

    const sendSubscriptions = (socket, id) => {
      console.log('[SocketContext] Sending subscriptions for loginId:', id);
      if (!id || id === 'null' || id === 'undefined') {
        console.error('[SocketContext] Cannot subscribe with invalid loginId:', id);
        return;
      }
      socket.send(JSON.stringify({
        action: 'subscribe',
        eventType: 'UserLiveDashboard',
        loginId: parseInt(id),
      }));
      socket.send(JSON.stringify({
        action: 'subscribe',
        eventType: 'OpenPosition',
        loginId: parseInt(id),
      }));
    };

    ws.onopen = () => {
      console.log('[SocketContext] WebSocket connection opened');
      setStatus('open');
      // Some servers allow immediate subscription, others wait for 'connected' message
      sendSubscriptions(ws, loginId);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('[SocketContext] Received:', message);

        // Handle initial connection confirmation if needed
        if (message.type === 'connected') {
          console.log('[SocketContext] Server confirmed connection, resending subscriptions if needed');
          sendSubscriptions(ws, loginId);
          return;
        }

        let innerData = null;
        if (typeof message.data === 'string') {
          try { innerData = JSON.parse(message.data); } catch (_) {}
        } else if (message.data && typeof message.data === 'object') {
          innerData = message.data;
        }

        const eventType = message.eventType || message.type || message.event;

        if (!innerData && (message.Balance !== undefined || message.Equity !== undefined)) {
          innerData = message; // Case where message IS the data
        }

        if (!innerData) return;

        if (eventType === 'UserLiveDashboard' || eventType === 'Dashboard') {
          setSocketData(prev => ({
            ...prev,
            ...innerData,
            balance: innerData.Balance ?? innerData.balance,
            equity: innerData.Equity ?? innerData.equity,
            floatingProfit: innerData.PlFloating ?? innerData.Pl ?? innerData.floatingProfit ?? 0,
            margin: innerData.Margin ?? innerData.margin,
            freeMargin: innerData.MarginFree ?? innerData.freeMargin,
          }));
        } else if (eventType === 'OpenPosition' || eventType === 'Trades') {
          setSocketData(prev => ({
            ...prev,
            openTrades: Array.isArray(innerData) ? innerData : [innerData],
          }));
        }
      } catch (e) {
        console.error('[SocketContext] Parse error:', e);
      }
    };

    ws.onerror = (error) => {
      console.error('[SocketContext] WebSocket error:', error);
      setStatus('error');
    };

    ws.onclose = () => {
      console.log('[SocketContext] WebSocket closed');
      setStatus('closed');
    };

    // No cleanup on unmount — we want the socket to persist across navigation
  }, [isAuthenticated, token, loginId]);

  return (
    <SocketContext.Provider value={{ socketData, status, loginId }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
