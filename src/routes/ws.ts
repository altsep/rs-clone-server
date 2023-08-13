import { app } from '../app';
import { messageController } from '../controllers/message-controller';

app.ws('/messages', messageController.handleMessages);
