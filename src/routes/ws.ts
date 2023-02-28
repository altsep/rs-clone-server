import { app } from '../app';
import { handleMessages } from '../controllers/messages';

app.ws('/', handleMessages);
