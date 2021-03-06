import { AppError } from '../../../../errors/AppError';
import {
  inject,
  injectable
} from "tsyringe";
import {
  IUsersRepository
} from "../../repositories/IUsersRepository";
import {
  compare
} from "bcrypt";
import {
  sign
} from "jsonwebtoken"


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository") private userRepository: IUsersRepository
  ) {}

  async execute({
    email,
    password
  }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, "50fd55484b90f1d7e9fd64277ed8c3c9", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn
  }
}

export {
  AuthenticateUserUseCase
}