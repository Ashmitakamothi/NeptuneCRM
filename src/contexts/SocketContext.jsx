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

  // Fetch accounts to get a loginId for the socket
  const { data: accountsData } = useRealtimeJson(endpoints.accounts, { 
    enabled: isAuthenticated && !!endpoints.accounts 
  });

  const loginId = useMemo(() => {
    const list = Array.isArray(accountsData?.data) ? accountsData.data : Array.isArray(accountsData) ? accountsData : [];
    return list[0]?.login || list[0]?.accountNo || list[0]?.account_no || null;
  }, [accountsData]);

  useEffect(() => {
    if (!isAuthenticated || !token || !loginId) {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
        setStatus('closed');
      }
      return;
    }

    // Don't reconnect if already connecting/open for the same loginId
    if (socketRef.current && (socketRef.current.readyState === WebSocket.CONNECTING || socketRef.current.readyState === WebSocket.OPEN)) {
      return;
    }

    const wsUrl = `wss://mt5.neptunefxcrm.com/api/MTFiveAccount/ws?authorization=Bearer%20${token}`;
    console.log('Connecting Global WebSocket for account:', loginId);
    
    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;
    setStatus('connecting');

    ws.onopen = () => {
      console.log('Global WebSocket Connected');
      setStatus('open');
      
      const sub1 = JSON.stringify({
        action: "subscribe",
        eventType: "UserLiveDashboard",
        loginId: parseInt(loginId)
      });
      const sub2 = JSON.stringify({
        action: "subscribe",
        eventType: "OpenPosition",
        loginId: parseInt(loginId)
      });
      
      ws.send(sub1);
      ws.send(sub2);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        let innerData = null;
        
        if (typeof message.data === 'string') {
          try { innerData = JSON.parse(message.data); } catch (e) {}
        } else if (typeof message.data === 'object') {
          innerData = message.data;
        }

        if (innerData) {
          if (message.eventType === 'UserLiveDashboard') {
            setSocketData(prev => ({ 
              ...prev, 
              ...innerData,
              balance: innerData.Balance,
              equity: innerData.Equity,
              floatingProfit: innerData.PlFloating || innerData.Pl || 0,
              margin: innerData.Margin,
              freeMargin: innerData.MarginFree
            }));
          } else if (message.eventType === 'OpenPosition') {
            setSocketData(prev => ({ 
              ...prev, 
              openTrades: Array.isArray(innerData) ? innerData : [innerData] 
            }));
          }
        }
      } catch (e) {
        console.error('Failed to parse Global WS message:', e);
      }
    };

    ws.onerror = (error) => {
      console.error('Global WebSocket Error:', error);
      setStatus('error');
    };

    ws.onclose = () => {
      console.log('Global WebSocket Closed');
      setStatus('closed');
    };

    return () => {
      // We don't close here because we want it to stay open during navigation
      // It will only close if isAuthenticated/token/loginId changes
    };
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
