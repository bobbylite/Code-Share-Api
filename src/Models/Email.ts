import { IEmail } from "../Infrastructure/Types/IEmail";
export class Email implements IEmail{

    constructor(public id: number, public subject: string, public body: string, public to: string, public from: string){}
}