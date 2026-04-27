import { useEffect, useState, useRef } from 'react';

export function useDashboardSocket() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('connecting');
  const socketRef = useRef(null);

  useEffect(() => {
    const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIzYzc4NzQ1ZC0xNWJhLTQxYmUtYjhlMi0xYTJlNzUyMjg3NDMiLCJyb2xlIjpbIklCVXNlciIsIlVzZXIiXSwibmJmIjoxNzc3Mjc4MTY3LCJleHAiOjE3NzcyODUzNjcsImlhdCI6MTc3NzI3ODE2NywiaXNzIjoiTmVwdHVuZSIsImF1ZCI6Ik5lcHR1bmUifQ.ltSPaO9SS4yAjgbfqlhpyMnC2WYSJEv1KxUfhpPtNzqoc5GNs6NOe6YIqmIRzFXP29uOuPTdQoDnU7cP9PThEw';
    const wsUrl = `wss://mt5.neptunefxcrm.com/api/MTFiveAccount/ws?authorization=Bearer%20${token}`;

    console.log('Connecting to WebSocket:', wsUrl);
    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setStatus('open');
      
      // Send subscription messages
      const sub1 = JSON.stringify({
        action: "subscribe",
        eventType: "UserLiveDashboard",
        loginId: 555166
      });
      const sub2 = JSON.stringify({
        action: "subscribe",
        eventType: "OpenPosition",
        loginId: 555166
      });
      
      ws.send(sub1);
      ws.send(sub2);
      console.log('Subscription messages sent');
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
              totalProfit: innerData.Pl ?? innerData.PlFloating ?? innerData.TotalProfit,
              usedMargin: innerData.Margin ?? innerData.UsedMargin,
              freeMargin: innerData.MarginFree ?? innerData.FreeMargin
            }));
          } else if (message.eventType === 'OpenPosition') {
            setData(prev => ({ ...prev, openTrades: innerData }));
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
  }, []);

  return { data, status };
}
