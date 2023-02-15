import { ChatSchema } from '../models/types';
import { Message } from '../types';

class ChatDto {
  public id: string;

  public userIds: number[];

  public createdAt: string;

  public messages: Message[];

  constructor(document: ChatSchema) {
    this.id = document.id;
    this.userIds = document.userIds;
    this.createdAt = document.createdAt;
    this.messages = document.messages || [];
  }
}

export { ChatDto };
