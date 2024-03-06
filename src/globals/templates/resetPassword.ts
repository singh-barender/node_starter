import fs from 'fs';
import ejs from 'ejs';

function resetPasswordTemplate(resetPasswordURL: string): string {
  const templateContent: string = fs.readFileSync(__dirname + '/reset-password.ejs', 'utf8');
  const renderedTemplate: string = ejs.render(templateContent, { resetPasswordURL });
  return renderedTemplate;
}

export { resetPasswordTemplate };
