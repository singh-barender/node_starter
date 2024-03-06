import Logger from 'bunyan';
import nodemailer from 'nodemailer';
import sendGridMail, { MailDataRequired } from '@sendgrid/mail';
import { IMailOptions } from '@root/types/email.types';
import { config, createLogger } from '@root/config/env/config';
import { BadRequestError } from '@root/config/errors/error-handler';

const log: Logger = createLogger('mailOptions');
sendGridMail.setApiKey(config.SENDGRID_API_KEY!);

async function sendEmail(receiverEmail: string, subject: string, body: string): Promise<void> {
  try {
    const mailOptions: IMailOptions = generateMailOptions(receiverEmail, subject, body);
    if (config.NODE_ENV === 'development') {
      await sendWithNodemailer(mailOptions);
    } else {
      await sendWithSendGrid(mailOptions);
    }
  } catch (error) {
    log.error('Error sending email', error);
    throw new BadRequestError('Error sending email');
  }
}

function generateMailOptions(receiverEmail: string, subject: string, body: string): IMailOptions {
  return {
    from: `Node_BP <${config.SENDER_EMAIL!}>`,
    to: receiverEmail,
    subject,
    html: body
  };
}

async function sendWithNodemailer(mailOptions: IMailOptions): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: config.SENDER_EMAIL!,
      pass: config.SENDER_EMAIL_PASSWORD!
    }
  });

  await transporter.sendMail(mailOptions);
  log.info('Development: email sent successfully.');
}

async function sendWithSendGrid(mailOptions: MailDataRequired): Promise<void> {
  await sendGridMail.send(mailOptions);
  log.info('Production: email sent successfully.');
}

export { sendEmail };
