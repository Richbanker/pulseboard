import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { useWebSocketStore } from './store/useWebSocketStore';
import { useWebSocket } from './hooks/useWebSocket';

const App = () => {
  const data = useWebSocketStore((state) => state.data);
  const { isConnected } = useWebSocket('ws://localhost:4000');

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`h-3 w-3 rounded-full ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        <span className="text-sm font-medium">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      <h1 className="text-2xl font-bold mb-4">📈 Live PulseBoard</h1>

      <LineChart width={800} height={400} data={data}>
        <XAxis
          dataKey="timestamp"
          tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
        />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#38bdf8" dot={false} />
      </LineChart>
    </div>
  );
};

export default App;