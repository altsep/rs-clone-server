import { app } from '../app';
import { messagesController } from '../controllers/messages';

app.delete('/api/messages/:id', messagesController.removeAllChatMessages);
