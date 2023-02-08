import { UserSchema } from '../models/types';

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

  public isActivated: boolean;

  public activationLink: string;

  constructor(model: UserSchema) {
    this.id = model.userId;
    this.email = model.email;
    this.password = model.password;
    this.name = model.name;
    this.alias = model.alias;
    this.country = model.country;
    this.birthDate = model.birthDate;
    this.hidden = model.hidden;
    this.createdAt = model.createdAt;
    this.postsIds = model.postsIds || [];
    this.friendsIds = model.friendsIds || [];
    this.activationLink = model.activationLink;
    this.isActivated = model.isActivated;
  }
}

export { UserDto };
