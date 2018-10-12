import { IEmail } from "../../Infrastructure/Types/IEmail";
import * as nodemailer from "nodemailer";
import TYPES from "../../Infrastructure/DependencyInjection/Identifiers";
import { inject, injectable } from "../../../node_modules/inversify";
import { INodeMailerService } from "../../Infrastructure/Types/nodemailer/INodeMailerService";
import { IEvent } from "../../Infrastructure/Types/Events/IEvent";

@injectable()
export class NodeMailerService implements INodeMailerService { 
    
    /**
     * Register event listener.
     * @constructor Inject listener
     */
    public constructor(@inject(TYPES.IEmail) public EmailListener: IEvent<IEmail>) {
        try {
            EmailListener.on((email: IEmail)=>NodeMailerService.SendEmail(email));
        } catch(err) {
            console.log("Error: %s", err.Message);
        }
    }

    public static SendEmail(email: IEmail) {
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
            html: email.body.toString()
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });

    }
}