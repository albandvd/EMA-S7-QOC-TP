import { Express } from 'express';
import { createUserDTO, User } from "../../domain/user";
import { UserPort } from "../../ports/driving/userPort";
import {Request, Response} from "express";

export class UserController {
  private service: UserPort;

  constructor(private readonly UserService: UserPort) {
    this.service = UserService;
  }

  registerRoutes(app: Express) {
    app.get('/user', this.getAllUsers.bind(this));
    app.post('/user', this.createUser.bind(this));
    app.get('/user/:userId', this.getUser.bind(this));
    app.put('/user/:userId', this.modifyUser.bind(this));
    app.delete('/user/:userId', this.deleteUser.bind(this));
  }

  async getAllUsers(req: Request, res: Response) {
    const list = await this.service.listUsers();
    res.json(list);
  }

  async createUser(req: Request, res: Response) {
    const { nom, prenom } = req.body;
    if (!nom || !prenom ) {
      return res.status(400).json({ message: 'nom and prenom required' });
    }
    const created = await this.service.createUser(new createUserDTO(nom, prenom));
    res.status(201).json(created);
  }

  async getUser(req: Request, res: Response) {
    const userId = req.params.userId;
    const found = await this.service.getUser(userId);
    if (!found) return res.status(404).json({ message: 'Not found' });
    res.json(found);
  }

  async modifyUser(req: Request, res: Response) {
    const userId = req.params.userId;
    const { nom, prenom } = req.body;
    const toUpdate = new User(nom, prenom);
    toUpdate.userId = userId;
    const updated = await this.service.updateUser(toUpdate);
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  }

  async deleteUser(req: Request, res: Response) {
    const userId = req.params.userId;
    const deleted = await this.service.deleteUser(userId);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  }
}