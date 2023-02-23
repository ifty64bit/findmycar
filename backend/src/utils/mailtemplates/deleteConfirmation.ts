import nodemailer from "nodemailer";
import mailer from "../mailer";

export default async function emailConfirmation(
    email: string,
    name: string,
) {
    const transporter = await mailer();
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <info@findmycar.com>',
        to: email,
        subject: "Car Creation Confirmation",
        text: "Hello world?",
        html: `<b>Hello,</b>
        <p>Your car [${name}] is Deleted Successfully.</p>`,
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
