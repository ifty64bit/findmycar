import nodemailer from "nodemailer";
import mailer from "../mailer";

export default async function emailConfirmation(
    email: string,
    name: string,
    token: string
) {
    const transporter = await mailer();
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <info@findmycar.com>',
        to: email,
        subject: "Email Confirmation",
        text: "Hello world?",
        html: `<b>Hello ${name},</b>
        <p>Thank you for registering with us. Please click on the link below to verify your email address.</p>
        <a href="http://localhost:3000/verify/${token}/${email}">Verify Email</a>`,
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
