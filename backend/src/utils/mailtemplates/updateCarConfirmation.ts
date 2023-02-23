import nodemailer from "nodemailer";
import mailer from "../mailer";

export default async function emailConfirmation(
    email: string,
    name: string,
    id: string
) {
    const transporter = await mailer();
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <info@findmycar.com>',
        to: email,
        subject: "Car Update Confirmation",
        text: "Hello world?",
        html: `<b>Hello,</b>
        <p>Your car [${name}] is updated. Please click on the link below to verify your car.</p>
        <a href="http://localhost:3000/cars/${id}">Verify Car</a>`,
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
