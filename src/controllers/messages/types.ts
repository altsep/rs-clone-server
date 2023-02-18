import { WebSocket } from 'ws';

export type WsHandler = (ws: WebSocket, payload?: unknown) => void | Promise<void>;
