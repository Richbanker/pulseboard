import { Server } from 'mock-socket';

const mockServer = new Server('ws://localhost:4000');

mockServer.on('connection', socket => {
  setInterval(() => {
    const value = Math.random() * 100;
    const payload = JSON.stringify({
      timestamp: Date.now(),
      value,
    });

    socket.send(payload);  
  }, 1000);
});

export default mockServer;