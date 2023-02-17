import { handleAddChat as addChat } from './addChat';
import { handleGetUserChats as getUserChats } from './getChats';
import { handleRemoveChat as removeChat } from './removeChat';

export const chatsController = { addChat, getUserChats, removeChat };
