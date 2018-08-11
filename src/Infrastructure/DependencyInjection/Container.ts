import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "./Identifiers";
import { IEmailRepository } from "../Types/IEmailRepository";
import { EmailRepository } from "../../App/Repositories/EmailRepository";
import { IEmailService } from "../Types/IEmailService";
import { EmailRepositoryService } from "../../App/Services/EmailRepositoryService";
import { IEvent } from "../Types/Events/IEvent";
import { EventHandler } from "../../App/Handlers/EventHandler";
import { IEmail } from "../Types/IEmail";
import { INodeMailerService } from "../Types/nodemailer/INodeMailerService";
import { NodeMailerService } from "../../../dist/App/Services/NodeMailerService";


let builder: Container = new Container();

/**
 * Dependency Injection
 */
builder.bind<IEmailRepository>(TYPES.IEmailRepository).toConstantValue(new EmailRepository);
builder.bind<IEmailService>(TYPES.IEmailService).toConstantValue(new EmailRepositoryService);
builder.bind<IEvent<IEmailRepository>>(TYPES.IEmailEventHandler).toConstantValue(new EventHandler);
builder.bind<IEvent<IEmail>>(TYPES.IEmail).toConstantValue(new EventHandler);
builder.bind<INodeMailerService>(TYPES.INodeMailerService).toConstantValue(new NodeMailerService);

export default builder;