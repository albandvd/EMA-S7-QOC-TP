export class User {
  userId?: string;
  nom: string;
  prenom: string;

  constructor(nom: string, prenom: string, userId?: string) {
    this.userId = userId;
    this.nom = nom;
    this.prenom = prenom;
  }

  getFullName(): string {
    return `${this.nom} ${this.prenom}`;
  }
}

export class createUserDTO {
  nom: string;
  prenom: string;

  constructor(nom: string, prenom: string) {
    this.nom = nom;
    this.prenom = prenom;
  }
}