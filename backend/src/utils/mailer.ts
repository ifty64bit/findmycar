import nodemailer from "nodemailer";

async function mailer() {
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: account.user,
            pass: account.pass,
        },
    });

    return transporter;
}

export default mailer;
