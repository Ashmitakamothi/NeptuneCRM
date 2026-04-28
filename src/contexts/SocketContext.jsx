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

  // Use User-DashboardById to get account list (same as what live site calls)
  const { data: dashData } = useRealtimeJson(endpoints.deposits, {
    enabled: isAuthenticated && !!endpoints.deposits,
  });

  // Extract loginId from dashboard data's MT5 account list
  const loginId = useMemo(() => {
    const list =
      dashData?.data?.mT5AccountList ||
      dashData?.mT5AccountList ||
      [];
    const first = list[0];
    return (
      first?.login ||
      first?.accountNo ||
      first?.account_no ||
      null
    );
  }, [dashData]);

  useEffect(() => {
    if (!isAuthenticated || !token || !loginId) {
      // Close socket if we lose auth/loginId
      if (socketRef.current && socketRef.current.readyState !== WebSocket.CLOSED) {
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
    const wsUrl = `wss://mt5.neptunefxcrm.com/api/MTFiveAccount/ws?authorization=Bearer%20${token}`;
    console.log('[SocketContext] Connecting WebSocket for loginId:', loginId);

    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;
    setStatus('connecting');

    ws.onopen = () => {
      console.log('[SocketContext] WebSocket connected');
      setStatus('open');

      ws.send(JSON.stringify({
        action: 'subscribe',
        eventType: 'UserLiveDashboard',
        loginId: parseInt(loginId),
      }));
      ws.send(JSON.stringify({
        action: 'subscribe',
        eventType: 'OpenPosition',
        loginId: parseInt(loginId),
      }));
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        let innerData = null;

        if (typeof message.data === 'string') {
          try { innerData = JSON.parse(message.data); } catch (_) {}
        } else if (message.data && typeof message.data === 'object') {
          innerData = message.data;
        }

        if (!innerData) return;

        if (message.eventType === 'UserLiveDashboard') {
          setSocketData(prev => ({
            ...prev,
            ...innerData,
            balance: innerData.Balance,
            equity: innerData.Equity,
            floatingProfit: innerData.PlFloating || innerData.Pl || 0,
            margin: innerData.Margin,
            freeMargin: innerData.MarginFree,
          }));
        } else if (message.eventType === 'OpenPosition') {
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
