import Mail from "nodemailer/lib/mailer";
import * as nodemailer from "nodemailer";
import { SendMailOptions, SentMessageInfo } from "nodemailer";
import { IServerInfo } from "./ServerInfo";


export class Worker {
    private static serverInfo: IServerInfo;
    constructor(inServerInfo: IServerInfo) {
    Worker.serverInfo = inServerInfo;
    }

    public sendMessage(inOptions: SendMailOptions): Promise<string | void> {

        console.log("SMTP.Worker.sendMessage()", inOptions);
    
        return new Promise((inResolve, inReject) => {
          const transport: Mail = nodemailer.createTransport(Worker.serverInfo.smtp);
          transport.sendMail(
            inOptions,
            (inError: Error | null, inInfo: SentMessageInfo) => {
              if (inError) {
                console.log("SMTP.Worker.sendMessage(): Error", inError);
                inReject(inError);
              } else {
                console.log("SMTP.Worker.sendMessage(): Ok", inInfo);
                inResolve();
              }
            }
          );
        });
    
      } /* End sendMessage(). */
    
}