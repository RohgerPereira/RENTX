import {
  container
} from 'tsyringe';
import {
  Response
} from 'express';
import {
  Request,
  response
} from 'express';
import {
  request
} from 'express';
import {
  CreateUserUseCase
} from './CreateUserUseCase';


class CreateUserController {
  async handle(request: Request, response: Response): Promise < Response > {
    const {
      name,
      email,
      password,
      driver_license
    } = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
      driver_license
    });

    return response.status(201).send()
  }
}

export {
  CreateUserController
}