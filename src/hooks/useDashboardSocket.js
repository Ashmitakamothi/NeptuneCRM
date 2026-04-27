import { useEffect, useState, useRef } from 'react';

export function useDashboardSocket(loginId) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('connecting');
  const socketRef = useRef(null);

  useEffect(() => {
    if (!loginId) return;

    const token = import.meta.env.VITE_API_TOKEN;
    // Note: In production, you might need a separate proxy for WSS or use absolute URL if allowed
    const wsUrl = `wss://mt5.neptunefxcrm.com/api/MTFiveAccount/ws?authorization=Bearer%20${token}`;

    console.log('Connecting to WebSocket for account:', loginId);
    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setStatus('open');
      
      // Send subscription messages for the specific loginId
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
          try {
            innerData = JSON.parse(message.data);
          } catch (e) {}
        } else if (typeof message.data === 'object') {
          innerData = message.data;
        }

        if (innerData) {
          if (message.eventType === 'UserLiveDashboard') {
            setData(prev => ({ 
              ...prev, 
              ...innerData,
              balance: innerData.Balance,
              equity: innerData.Equity,
              floatingProfit: innerData.PlFloating || innerData.Pl || 0,
              margin: innerData.Margin,
              freeMargin: innerData.MarginFree
            }));
          } else if (message.eventType === 'OpenPosition') {
            setData(prev => ({ 
              ...prev, 
              openTrades: Array.isArray(innerData) ? innerData : [innerData] 
            }));
          }
        }
      } catch (e) {
        console.error('Failed to parse WS message:', e);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
      setStatus('error');
    };

    ws.onclose = () => {
      console.log('WebSocket Closed');
      setStatus('closed');
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [loginId]);

  return { data, status };
}
