import { ChatSchema } from '../models/types';

class ChatDto {
  public id: string;

  public userIds: number[];

  public createdAt: string;

  constructor(document: ChatSchema) {
    this.id = document.id;
    this.userIds = document.userIds;
    this.createdAt = document.createdAt;
  }
}

export { ChatDto };
