import { handleAddChat as addChat } from './addChat';
import { handleGetUserChats as getUserChats } from './getChats';
import { handleRemoveAllChatMessages as removeAllChatMessages } from './removeAllChatMessages';

export const chatsController = { addChat, getUserChats, removeAllChatMessages };
