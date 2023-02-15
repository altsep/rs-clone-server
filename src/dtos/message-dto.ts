import { MessageSchema } from '../models/types';

class MessageDto {
  public id: string;

  public userId: number;

  public description: string;

  public createdAt: string;

  constructor(document: MessageSchema) {
    this.id = document.id;
    this.userId = document.userId;
    this.description = document.description;
    this.createdAt = document.createdAt;
  }
}

export { MessageDto };
