import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

const wsUrl = process.env.REACT_APP_WS_URL || '';
export const socket = io(wsUrl);
export const WebSocketContext = createContext<Socket>(socket);
export const WebSocketProvider = WebSocketContext.Provider;
