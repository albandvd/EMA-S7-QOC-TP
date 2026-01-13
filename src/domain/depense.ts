export class Depense {
  depenseId?: string;
  description: string;
  montant: string;
  userId: string;
  magasin: string;
  date: Date;

  constructor(
    description: string,
    montant: string,
    userId: string,
    magasin: string,
    date: Date,
    depenseId?: string
  ) {
    this.depenseId = depenseId;
    this.description = description;
    this.montant = montant;
    this.userId = userId;
    this.magasin = magasin;
    this.date = date;
  }

    getDepenseDetails(): string {
    return `${this.userId} - ${this.montant} - ${this.magasin} - ${this.date.toDateString()}`;
  }
}