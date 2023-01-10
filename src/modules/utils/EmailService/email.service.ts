import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Mail from "nodemailer/lib/mailer";
import { createTransport } from "nodemailer";

@Injectable()
export default class EmailService {
  private nodemailerTransport: Mail;
  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: "aman.goswami@brainvire.com",
        pass: "AMAN@2022",
      },
    });
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}
