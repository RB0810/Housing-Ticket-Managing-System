const API_KEY = '7726fdc285aaa0f802800905c0f6a8f5-6d8d428c-6e658693';
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
      from: 'Excited User <me@samples.mailgun.org>',
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
