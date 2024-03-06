import fs from 'fs';
import ejs from 'ejs';

function accountActivationTemplate(confirmEmailURL: string): string {
  const templateContent: string = fs.readFileSync(__dirname + '/account-activation.ejs', 'utf8');
  const renderedTemplate: string = ejs.render(templateContent, {
    confirmEmailURL,
    image_url: 'https://w7.pngwing.com/pngs/120/102/png-transparent-padlock-logo-computer-icons-padlock-technic-logo-password-lock.png'
  });
  return renderedTemplate;
}

export { accountActivationTemplate };
