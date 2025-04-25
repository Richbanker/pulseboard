import { useEffect, useState } from 'react';
import { useWebSocketStore } from '../store/useWebSocketStore';

export const useWebSocket = (url: string) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);
    ws.onerror = () => setIsConnected(false);

    ws.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      useWebSocketStore.getState().addData(parsed);
    };

    return () => ws.close();
  }, [url]);

  return { isConnected };
};
