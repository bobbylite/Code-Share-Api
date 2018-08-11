import { IEmailRepository } from "./IEmailRepository";
import { Email } from "../../Models/Email";

export interface IEmailService {
    set(repo: IEmailRepository): void;

    get(): Email[];

    getById(id: number): Email;

    add(email: Email): number;

    remove(id: number): Email;
}