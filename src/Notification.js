import nodemailer from 'nodemailer';

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'api', key: API_KEY });
class Notification {
  constructor() {}

  async sendMail(emailContent) {
    const { to, subject, text } = emailContent;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      auth: {
        user: "postmaster@sandbox0030cea2ea9e4001a5a0c71b0a64ab88.mailgun.org", // Replace with your SMTP username
        pass: "2e5c9fc76774ad74698d42ae2cee9f54-262b213e-99fd8be9", // Replace with your SMTP password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "Housing Management System", // Replace with your desired "from" name
      to: to,
      subject: subject,
      text: text,
    });

    client.messages
      .create(DOMAIN, message)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
    });

    console.log("Message sent: %s", info.messageId);
  }
}

export default Notification;


