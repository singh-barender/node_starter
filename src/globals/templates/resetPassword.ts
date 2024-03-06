import fs from 'fs';
import ejs from 'ejs';

function resetPasswordTemplate(resetPasswordURL: string): string {
  const templateContent: string = fs.readFileSync(__dirname + '/reset-password.ejs', 'utf8');
  const renderedTemplate: string = ejs.render(templateContent, {
    resetPasswordURL,
    image_url: 'https://w7.pngwing.com/pngs/120/102/png-transparent-padlock-logo-computer-icons-padlock-technic-logo-password-lock.png'
  });
  return renderedTemplate;
}

export { resetPasswordTemplate };
