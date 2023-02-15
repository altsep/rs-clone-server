import { body, query } from 'express-validator';
import { app } from '../app';
import { chatsController } from '../controllers/chats';

app.post('/api/chats', body('userIds').isArray({ min: 2 }), chatsController.addChat);

app.get('/api/chats', query('userId').exists(), chatsController.getUserChats);
