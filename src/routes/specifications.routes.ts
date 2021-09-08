import {  Router } from "express";
import { Request, Response } from "express-serve-static-core";
import { CreateSpecificationController} 
from "../modules/cars/useCases/createSpecification/CreateSpecificationController";


const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes }