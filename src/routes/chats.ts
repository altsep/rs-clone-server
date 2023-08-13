import { body, query } from 'express-validator';
import { chatController } from '../controllers/chat-controller';
import { router } from '../router';

router.post('/chats', body('userIds').isArray({ min: 2 }), chatController.addChat);

router.get('/chats', query('userId').exists(), chatController.getAllUserChats);

router.delete('/chats/:id', chatController.removeChat);
