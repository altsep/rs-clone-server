import { UserModel } from '../types';

class UserDto {
  public email: string;

  public password: string;

  public name: string | undefined;

  public country: string | undefined;

  public birthDate: string | undefined;

  public id: string | undefined;

  public hidden: boolean;

  public createdAt: string;

  public postsIds: number[];

  public friendsIds: number[];

  public isActivated: boolean;

  public activationLink: string;

  constructor(model: UserModel) {
    this.id = model.id;
    this.email = model.email;
    this.password = model.password;
    this.name = model.name;
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
