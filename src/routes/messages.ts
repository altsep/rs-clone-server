import { messageController } from '../controllers/message-controller';
import { router } from '../router';

router.delete('/messages/:id', messageController.removeAllChatMessages);
