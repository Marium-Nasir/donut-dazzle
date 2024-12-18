import nodemailer from "nodemailer";

export async function sendEmail({ params }) {
  try {
    const { smtp_email, smtp_password } = process.env;
    const transport = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtp_email,
        pass: smtp_password,
      },
    });
    const testTransport = await transport.verify();
    console.log(testTransport);

    const sendMail = await nodemailer.sendEmail({
      from: smtp_email,
      to: params.to,
      subject: params.subject,
      html: params.body,
    });
    console.log(sendMail);

    return true;
  } catch (err) {
    console.log(`error in sending email`);
    return false;
  }
}
