import { UserSchema } from '../models/types';
import { getImageBase64String } from '../utils';

class UserDto {
  public id: number;

  public email: string;

  public password: string;

  public name: string;

  public alias: string | undefined;

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

  public lastSeen: string | undefined;

  public avatar: string | undefined;

  public cover: string | undefined;

  constructor(document: UserSchema) {
    this.id = document.userId;
    this.email = document.email;
    this.password = document.password;
    this.name = document.name;
    this.alias = document.alias;
    this.country = document.country;
    this.birthDate = document.birthDate;
    this.hidden = document.hidden;
    this.createdAt = document.createdAt;
    this.postsIds = document.postsIds || [];
    this.friendsIds = document.friendsIds || [];
    this.pendingFriendsIds = document.pendingFriendsIds || [];
    this.activationLink = document.activationLink;
    this.isActivated = document.isActivated;
    this.isOnline = document.isOnline ?? false;
    this.lastSeen = document.lastSeen;
    this.avatar = document.images.avatar ? getImageBase64String(document.images.avatar) : undefined;
    this.cover = document.images.cover ? getImageBase64String(document.images.cover) : undefined;
  }
}

export { UserDto };
