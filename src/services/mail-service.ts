import { SentMessageInfo, createTransport } from 'nodemailer';

const transportOpts = {
  host: process.env.SMTP_HOST || '',
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 9999,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASSWORD || '',
  },
};

class MailService {
  private transporter = createTransport(transportOpts);

  public sendActivationMail = async (to: string, link: string): Promise<SentMessageInfo> => {
    const sentMessageInfo = await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Account activation for RS Clone Social Network',
      text: '',
      html: `
              <div
                style="
                width: 600px;
                max-width: 100%;
                border-radius: 10px;
                background-color: #eeeeee;
                padding: 20px 30px 20px 30px;
                font-family: Arial, Verdana, Helvetica, sans-serif;
              "
              >
                <div style="margin-bottom: 10px">
                  <table style="width: 100%">
                    <tr>
                      <td style="width: 50%; text-align: start">
                        <img
                          src="https://i.ibb.co/N70jrdB/RSSpace-logo.png"
                          style="width: 40px; height: 40px"
                        />
                      </td>
                      <td style="width: 50%; text-align: end">
                        <a
                          href=${link}
                          style="font-size: 12px; color: #78909c; text-decoration: none"
                        >
                          <span>Confirm Email</span>
                          <span>→</span>
                        </a>
                      </td>
                    </tr>
                  </table>
                </div>
                <hr />
                <div style="text-align: center; margin-bottom: 40px; color: #37474f">
                  <h2>Hello!</h2>
                  <p style="margin-bottom: 20px; font-size: 14px">
                    This email is to confirm that we have received your registration
                    information and to verify the email adress you have provided
                  </p>
                  <p style="margin-bottom: 40px; color: #546e7a; font-size: 13px">
                    To complete your registration, please click the link below
                  </p>
                  <a
                    href=${link}
                    style="
                      padding: 10px;
                      background-color: #ff9800;
                      color: white;
                      text-decoration: none;
                      border-radius: 5px;
                      display: inline-block;
                      margin-bottom: 30px;
                    "
                    >Confirm Your Email</a
                  >
                  <p style="color: #546e7a; font-size: 13px">
                    If you didn't initiate this request, please ignore it and no further
                    action will be taken
                  </p>
                  <h3 style="text-transform: uppercase">best regards, RSSpace team</h3>
                </div>
                <hr />
                <p
                  style="
                    font-size: 10px;
                    color: #78909c;
                    text-align: center;
                    padding-top: 10px;
                  "
                >
                  RSSpace © 2023
                </p>
              </div>
          `,
    });
    return sentMessageInfo;
  };
}

export const mailService = new MailService();
