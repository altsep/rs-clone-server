import { WebSocket } from 'ws';

export type WsHandler = (ws: WebSocket, payload: unknown) => Promise<void>;
