import { SentMessageInfo } from 'nodemailer';
import { transporter } from './transporter';

const sendActivationMail = async (to: string, link: string): Promise<SentMessageInfo> => {
  const sentMessageInfo = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: 'Account activation for RS Clone Social Network',
    text: '',
    html: `
          <div>
            <h1>To activate the account navigate to the link</h1>
            <a href="${link}">${link}</a>
          </div>
        `,
  });
  return sentMessageInfo;
};

export { sendActivationMail };
