import { ChatSchema } from '../models/types';
import { Message } from '../types';
import { MessageDto } from './message-dto';

class ChatDto {
  public id: string;

  public userIds: number[];

  public createdAt: string;

  public messages: Message[];

  constructor(document: ChatSchema) {
    this.id = document.id;
    this.userIds = document.userIds;
    this.createdAt = document.createdAt;
    this.messages = document.messages ? document.messages.map((m) => new MessageDto(m)) : [];
  }
}

export { ChatDto };
