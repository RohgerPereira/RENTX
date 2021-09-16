import { AppError } from './../../../../errors/AppError';
import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExist = 
    await this.specificationsRepository.findByName(name);

    if(specificationAlreadyExist) {
      throw new AppError("Specification already exist!")
    }

    await this.specificationsRepository.create({
      name,
      description
    });
  }
}

export { CreateSpecificationUseCase }