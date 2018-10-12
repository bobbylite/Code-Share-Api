import { IEmail } from "../../Infrastructure/Types/IEmail";
import * as nodemailer from "nodemailer";
import TYPES from "../../Infrastructure/DependencyInjection/Identifiers";
import { inject, injectable } from "../../../node_modules/inversify";
import { INodeMailerService } from "../../Infrastructure/Types/nodemailer/INodeMailerService";
import { IEvent } from "../../Infrastructure/Types/Events/IEvent";
import { IEmailRepository } from "../../Infrastructure/Types/IEmailRepository";

@injectable()
export class NodeMailerService implements INodeMailerService { 

    /**
     * @member _email Email reference
     */
    private _email: IEmail;
    
    /**
     * Register event listener.
     * @constructor Inject listener
     */
    public constructor(
        @inject(TYPES.IEmail) public EmailListener: IEvent<IEmail>,
        @inject(TYPES.IEmailRepository) private EmailRepo?: IEmailRepository
        ) {
        try {
            EmailListener.on((email: IEmail)=>{
                this._email = email;
                NodeMailerService.SendEmail(email);
            });
            if(!EmailRepo && !this._email) return;
            EmailRepo.add(this._email);
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