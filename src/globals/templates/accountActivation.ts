import fs from 'fs';
import ejs from 'ejs';

function accountActivationTemplate(confirmEmailURL: string): string {
  const templateContent: string = fs.readFileSync(__dirname + '/account-activation.ejs', 'utf8');
  const renderedTemplate: string = ejs.render(templateContent, { confirmEmailURL });
  return renderedTemplate;
}

export { accountActivationTemplate };
