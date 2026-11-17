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
      try {
        const parsed: unknown = JSON.parse(event.data);
        if (
          typeof parsed === 'object' && parsed !== null &&
          'timestamp' in parsed && 'value' in parsed &&
          typeof parsed.timestamp === 'number' && Number.isFinite(parsed.timestamp) &&
          typeof parsed.value === 'number' && Number.isFinite(parsed.value)
        ) {
          useWebSocketStore.getState().addData({
            timestamp: parsed.timestamp,
            value: parsed.value,
          });
        }
      } catch {
        // Ignore malformed frames; keep the connection alive for subsequent data.
      }
    };

    return () => ws.close();
  }, [url]);

  return { isConnected };
};
