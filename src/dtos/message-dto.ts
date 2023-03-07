import { MessageSchema } from '../models/types';

class MessageDto {
  public id: string | undefined;

  public userId: number;

  public description: string;

  public createdAt: string;

  constructor(document: MessageSchema) {
    // eslint-disable-next-line no-underscore-dangle
    this.id = document?._id.toString();
    this.userId = document.userId;
    this.description = document.description;
    this.createdAt = document.createdAt;
  }
}

export { MessageDto };
