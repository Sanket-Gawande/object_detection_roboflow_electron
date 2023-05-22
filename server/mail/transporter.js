import { createTransport } from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export async function send_mail(
  to,
  html,
  subject = "Verify email using OTP",
  from = process.env.EMAIL
) {
  try {
    const acknowledgement = await transport.sendMail({
      to,
      html,
      from,
      subject,
    });
    return acknowledgement;
  } catch (error) {
    console.log(error);
    throw new Error("Error while sending mail");
  }
}
