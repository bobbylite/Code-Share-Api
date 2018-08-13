import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import builder from "../Infrastructure/DependencyInjection/Container";
import { IEmailRepository } from "../Infrastructure/Types/IEmailRepository";
import TYPES from "../Infrastructure/DependencyInjection/Identifiers";
import { EmailRepositoryService } from "../App/Services/EmailRepositoryService";
import { IEmailService } from "../Infrastructure/Types/IEmailService";
import { EventHandler } from "../App/Handlers/EventHandler";
import { IEvent } from "../Infrastructure/Types/Events/IEvent";
import { IEmail } from "../Infrastructure/Types/IEmail";
import * as cors from "cors";
import { NodeMailerService } from "../App/Services/NodeMailerService";


/**
 * / route
 *
 * @class IndexRoute
 */
export class IndexRoute extends BaseRoute {

  private length: string = "Email Repository Count: ";

  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public create(router: Router) {

    router.get("/", cors(), (req: Request, res: Response, next: NextFunction) => {
      IndexRoute.indexGet(req, res, next);
    });

    router.post("/", cors(), (req: Request, res: Response, next: NextFunction) => {
      IndexRoute.indexPost(req, res, next);
    });

    router.options("/", cors(), (req: Request, res: Response, next: NextFunction) => {
      //new IndexRoute().index(req, res, next);
    });
  }

  /**
   * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    super();

    // Resolve an instance of EventHandler with type IEmailRepository
    builder.get<IEvent<IEmailRepository>>(TYPES.IEmailEventHandler).on((repo: IEmailRepository)=>console.log(repo));
    builder.get<IEvent<IEmail>>(TYPES.IEmail)
    .on((email: IEmail)=>NodeMailerService.SendEmail(email));
  }

  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public static indexPost(req: Request, res: Response, next: NextFunction) {
    /**
     * IOC Testing
     */
    // Ask for the email repository
    let emailRepo = builder.get<IEmailRepository>(TYPES.IEmailRepository);

    // Ask for the email service
    let emailService = builder.get<IEmailService>(TYPES.IEmailService);

    let email = this.getEmail(req);

    // set the service's repository to the email repository.
    emailService.set(emailRepo);
    emailService.add(email);

    builder.get<IEvent<IEmail>>(TYPES.IEmail).emit(email);

    // debug log
    builder.get<IEvent<IEmailRepository>>(TYPES.IEmailEventHandler).emit(emailRepo);

    //set message
    let options: Object = {
      //"message": this.length.concat(emailService.get().length.toString())
    };

    //render template
    this.render(req, res, "index", options);
  }

    /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public static indexGet(req: Request, res: Response, next: NextFunction) {
    /**
     * IOC Testing
     */
    // Ask for the email repository
    let emailRepo = builder.get<IEmailRepository>(TYPES.IEmailRepository);

    // Ask for the email service
    let emailService = builder.get<IEmailService>(TYPES.IEmailService);

    // set the service's repository to the email repository.
    emailService.set(emailRepo);

    // debug log
    builder.get<IEvent<IEmailRepository>>(TYPES.IEmailEventHandler).emit(emailRepo);

    //set message
    let options: Object = {
      "message": "Email Repository: ".concat(emailService.get().length.toString()).concat(" emails")
    };

    //render template
    this.render(req, res, "index", options);
  }

  private static getEmail(req: Request): IEmail {
    return {
      id: 1, 
      subject: "Hack N' Mail - Development", 
      body: req.body.code, 
      to: req.body.toEmail.toString(),
      from: 'CodeShare <CodeShare@HackNMail.com>'
    }
  }
}
