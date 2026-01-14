import express from 'express';
import path from 'path';
import * as fs from "node:fs";
import * as YAML from 'yaml';
import swaggerUi from 'swagger-ui-express';

import { InMemoryAddressRepo } from "./adapters/driven/inMemoryAddressRepo";
import { AddressService } from "./services/addressService";
import { AddressController } from './adapters/driving/addressController';

import { InMemoryCercleRepo } from './adapters/driven/inMemoryCercleRepo';
import { CercleService } from './services/cercleService';
import { CercleController } from './adapters/driving/cercleController';

import { InMemoryUserRepo } from './adapters/driven/inMemoryUserRepo';
import { UserService } from './services/userService';
import { UserController } from './adapters/driving/userController';

import { InMemoryDepenseRepo } from './adapters/driven/inMemoryDepenseRepo';
import { DepenseService } from './services/depenseService';
import { DepenseController } from './adapters/driving/depenseController';

const app = express();
app.use(express.json());

const file  = fs.readFileSync('./openapi.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const addressRepo = new InMemoryAddressRepo();
const cercleRepo = new InMemoryCercleRepo();
const userRepo = new InMemoryUserRepo();
const depenseRepo = new InMemoryDepenseRepo();

const addressService = new AddressService(addressRepo);
const cercleService = new CercleService(cercleRepo);
const userService = new UserService(userRepo);
const depenseService = new DepenseService(depenseRepo);

const addressController = new AddressController(addressService);
const cercleController = new CercleController(cercleService);
const userController = new UserController(userService);
const depenseController = new DepenseController(depenseService);

addressController.registerRoutes(app);
cercleController.registerRoutes(app);
userController.registerRoutes(app);
depenseController.registerRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/docs`);
});