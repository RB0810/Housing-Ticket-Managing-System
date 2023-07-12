const API_KEY = 'key-1c565527fdb57baaf8e207f0f0f88132';
const DOMAIN = 'sandbox0030cea2ea9e4001a5a0c71b0a64ab88.mailgun.org';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'api', key: API_KEY });
class Notification {
  constructor() {}

  sendMail(emailContent) {
    const { to, subject, text } = emailContent;
    const message = {
      from: 'Housing Management System',
      to: to,
      subject: subject,
      text: text,
    };

    client.messages
      .create(DOMAIN, message)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export default Notification;
