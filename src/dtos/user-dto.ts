import { UserSchema } from '../models/types';

class UserDto {
  public id: number;

  public email: string;

  public password: string;

  public name: string;

  public alias: string;

  public country: string;

  public birthDate: string;

  public hidden: boolean;

  public createdAt: string;

  public postsIds: number[];

  public friendsIds: number[];

  public pendingFriendsIds: number[];

  public isActivated: boolean;

  public activationLink: string;

  public isOnline: boolean;

  constructor(document: UserSchema) {
    this.id = document.userId;
    this.email = document.email;
    this.password = document.password;
    this.name = document.name;
    this.alias = document.alias || '';
    this.country = document.country;
    this.birthDate = document.birthDate;
    this.hidden = document.hidden;
    this.createdAt = document.createdAt;
    this.postsIds = document.postsIds || [];
    this.friendsIds = document.friendsIds || [];
    this.pendingFriendsIds = document.pendingFriendsIds || [];
    this.activationLink = document.activationLink;
    this.isActivated = document.isActivated;
    this.isOnline = document.isOnline || false;
  }
}

export { UserDto };
