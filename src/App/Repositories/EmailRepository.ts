import { IEmailRepository } from "../../Infrastructure/Types/IEmailRepository";
import { Email } from "../../Models/Email";
import { injectable } from "inversify";

@injectable()
export class EmailRepository implements IEmailRepository {
    
    private EmailList: any = new Array();

    public get(): Array<Email> {
        return this.EmailList;
    }

    public getById(id: number): Email {
        return this.EmailList.find(email=>email.id===id);
    }

    public add(email: Email): number {
        return this.EmailList.push(email);
    }

    public remove(id: number): Email {
        let removeEmailByIndex = this.EmailList.findIndex((email => email.id === id));
        if (removeEmailByIndex < -1) return null;
        return this.EmailList.splice(removeEmailByIndex, 1)[0];
    }
}