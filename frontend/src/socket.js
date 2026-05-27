import { io } from 'socket.io-client';

export const socket = io('https://projetoredes-production.up.railway.app', {
  transports: ['websocket'],
  autoConnect: true
});