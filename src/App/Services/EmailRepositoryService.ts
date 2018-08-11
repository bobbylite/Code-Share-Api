import { IEmailRepository } from "../../Infrastructure/Types/IEmailRepository";
import { Email } from "../../Models/Email";
import { injectable, inject } from "inversify";
import TYPES from "../../Infrastructure/DependencyInjection/Identifiers";

@injectable()
export class EmailRepositoryService{

    constructor(@inject(TYPES.IEmailRepository) private repository?: IEmailRepository){}

    public set(repo: IEmailRepository): void {
        this.repository = repo;
    }

    public get(): Email[] {
        return this.repository.get();
    }

    public getById(id: number): Email {
       return this.repository.getById(id);
    }

    public add(email: Email): number {
        return this.repository.add(email);
    }

    public remove(id: number): Email {
      return this.repository.remove(id);
    }
}