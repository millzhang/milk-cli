const inquirer = require('inquirer');
const path = require('path');
const chalk = require('chalk');
const download = require('download-git-repo');
// node命令环境的loading效果
const ora = require('ora');

let currentDirName = process
  .cwd()
  .substr(__dirname.lastIndexOf('\\') + 1, __dirname.length);
let tplList = require(`${__dirname}/../templates`).tpl;
let templateChoices = [];
Object.keys(tplList).map(item => {
  templateChoices.push({
    name: tplList[item].desc,
    value: item
  });
});
const question = [
  {
    type: 'list',
    name: 'template',
    message: 'Template name:',
    choices: templateChoices
  },
  {
    type: 'input',
    name: 'project',
    message: 'Project name:',
    default: currentDirName,
    validate(projectName) {
      if (projectName !== '') {
        return true;
      }
      return 'Project name is required!';
    }
  },
  {
    type: 'input',
    name: 'place',
    message: 'Project path:',
    default: './'
  }
];

module.exports = () => {
  inquirer.prompt(question).then(({ template, project, place }) => {
    const gitUrl = tplList[template]['url'];
    const spinner = ora('Downloading template...');
    spinner.start();

    download(`${gitUrl}`, `${place}/${project}`, err => {
      if (err) {
        console.log(chalk.red(err));
        process.exit();
      }
      spinner.stop();
      console.log(
        chalk.green('√ New project has been initialized successfully!')
      );
      console.log(`\n cd ${project} && npm install \n`);
    });
  });
};
