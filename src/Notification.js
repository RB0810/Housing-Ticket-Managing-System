const { API_KEY, DOMAIN } = require('./secrets');
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


