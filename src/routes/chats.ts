import { body } from 'express-validator';
import { app } from '../app';
import { handleAddChat } from '../controllers/chats/addChat';

app.post('/api/chats', body('userIds').isArray({ min: 2 }), handleAddChat);
