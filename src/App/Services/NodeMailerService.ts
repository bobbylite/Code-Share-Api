import { IEmail } from "../../Infrastructure/Types/IEmail";
import * as nodemailer from "nodemailer";
import { IEvent } from "../../Infrastructure/Types/Events/IEvent";
import { IEmailRepository } from "../../Infrastructure/Types/IEmailRepository";
import TYPES from "../../Infrastructure/DependencyInjection/Identifiers";
import builder from "../../Infrastructure/DependencyInjection/Container";
import { inject, injectable } from "../../../node_modules/inversify";

@injectable()
export class NodeMailerService { 
    /**
     * Register event listener.
     */
    constructor(@inject(TYPES.INodeMailerService) private inversify?: any) {
    }

    public static SendEmail(email: IEmail) {
        console.log("Hi!");
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "CodeShareDevelopment@gmail.com",
                pass: "codeshareisfun"
            }
        });

        let mailOptions = {
            from: email.from.toString(),
            to: email.to.toString(),
            subject: email.subject.toString(),
            html: email.body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });

    }
}