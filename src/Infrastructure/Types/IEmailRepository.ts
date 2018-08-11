import { IEmail } from "./IEmail";
import { Email } from "../../Models/Email";

export interface IEmailRepository {
    get(): Email[];
    getById(id: number): Email;
    add(email: Email): number;
    remove(id: number): Email;
}