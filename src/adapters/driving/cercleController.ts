import { Express } from 'express';
import { Cercle } from "../../domain/cercle";
import { CerclePort } from "../../ports/driving/cerclePort";
import {Request, Response} from "express";

export class CercleController {
  private service: CerclePort;

  constructor(private readonly CercleService: CerclePort) {
    this.service = CercleService;
  }

  registerRoutes(app: Express) {
    app.get('/cercle', this.getAllCercles.bind(this));
    app.post('/cercle', this.createCercle.bind(this));
    app.get('/cercle/:cercleId', this.getCercle.bind(this));
    app.put('/cercle/:cercleId', this.modifyCercle.bind(this));
    app.delete('/cercle/:cercleId', this.deleteCercle.bind(this));
    app.post('/cercle/:cercleId/user', this.createCercle.bind(this));
    app.delete('/cercle/:cercleId/user/:userId', this.createCercle.bind(this));
  }

  async getAllCercles(req: Request, res: Response) {
    const list = await this.service.listCercles();
    res.json(list);
  }

  async createCercle(req: Request, res: Response) {
    const { nom, prenom } = req.body;
    if (!nom || !prenom ) {
      return res.status(400).json({ message: 'nom and prenom required' });
    }
    const created = await this.service.createCercle(new Cercle(nom, prenom));
    res.status(201).json(created);
  }

  async getCercle(req: Request, res: Response) {
    const cercleId = req.params.cercleId;
    const found = await this.service.getCercle(cercleId);
    if (!found) return res.status(404).json({ message: 'Not found' });
    res.json(found);
  }

  async modifyCercle(req: Request, res: Response) {
    const cercleId = req.params.cercleId;
    const { nom, prenom } = req.body;
    const toUpdate = new Cercle(nom, prenom);
    toUpdate.cercleId = cercleId;
    const updated = await this.service.updateCercle(toUpdate);
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  }

  async deleteCercle(req: Request, res: Response) {
    const cercleId = req.params.cercleId;
    const deleted = await this.service.deleteCercle(cercleId);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  }
}