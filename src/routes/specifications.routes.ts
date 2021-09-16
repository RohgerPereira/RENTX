import {
  Router
} from "express";
import {
  Request,
  Response
} from "express-serve-static-core";
import {
  ensureAuthenticated
} from "../middlewares/ensureAuthenticated";
import {
  CreateSpecificationController
}
from "../modules/cars/useCases/createSpecification/CreateSpecificationController";


const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationController.handle);

export {
  specificationsRoutes
}