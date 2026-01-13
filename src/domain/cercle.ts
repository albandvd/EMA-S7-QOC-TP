export class Cercle {
  cercleId?: string;
  name: string;
  userList: string[];

  constructor(name: string, userList: string[], cercleId?: string) {
    this.cercleId = cercleId;
    this.name = name;
    this.userList = userList;
  }

  getCercleName(): string {
    return this.name;
  }
}

export class createCercleDTO {
  name: string;
  userList: string[];

  constructor(name: string, userList: string[]) {
    this.name = name;
    this.userList = userList;
  }
}