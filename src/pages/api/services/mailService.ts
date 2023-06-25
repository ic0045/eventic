import { MailService } from "@sendgrid/mail";
import {Client} from "@sendgrid/client";

/*
* Serviço de e-mail send-grid
*/
const mailService = new MailService();
const clientMailService = new Client();
mailService.setApiKey(process.env.SENDGRID_API_KEY);
clientMailService.setApiKey(process.env.SENDGRID_API_KEY);
export {mailService, clientMailService};
