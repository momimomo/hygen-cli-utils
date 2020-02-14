#!/usr/bin/env node

const inquirer = require('inquirer');
const shell = require('shelljs');
const chalk = require('chalk');
const figlet = require('figlet');
const fs = require('fs');
const npmCheck = require('npm-check');
var path = require('path');


const VARIABLES = {
    NAME: 'Name',
    APP_NAME: 'Hygen CLI utils wrapper',
};

const COLOURS = Object.freeze({
    TIVIX: '#60b36c',
    PRIMARY: '#da1c5b',
    WARNING: '#bf223c',
    SUCCESS: '#4bf28e',
});

const welcomeMessage = `
Hi! Welcome to ${VARIABLES.APP_NAME}! \n
This Code Generator will help you generate code using common templates used in Tivix. \n
Before you start, please make sure that you have installed npm and hygen.io globally.
`;

const goodByeMessage = `
Congratulations! Your new module is ready to extend. Happy coding!\n
`;

const generatorTypeMessage = `
Choose template type:
`;

const noInputMessage = `
Error! No name specified. Exiting. \n
`;

const separator = `
<|:============================================ -:- ============================================:|>
`;

const separatorWithNewline = `
<|:============================================ -:- ============================================:|> \n
`;

const generatorQuestion = [
    {
        type: 'list',
        name: 'kind',
        message: generatorTypeMessage,
        choices: [
            {
                name: 'UI Component (Container, View, Styles, messages, Test)',
                value: 'component',
                short: 'UI Component',
            },
            {
              name: 'Something else (Mock UI Component)',
              value: 'component_two',
              short: 'UI Component',
          },
        ],
    },
];

(async () => {

    const originalPath = `${path.dirname(fs.realpathSync(__filename))}`;
    const workingPath = `${process.cwd()}`
    console.log(
      chalk.hex(COLOURS.SUCCESS)(separator)
    );
    console.log(
        chalk.hex(COLOURS.PRIMARY)(welcomeMessage)
    );
    console.log(
      chalk.hex(COLOURS.SUCCESS)(separator)
    );
    const closeShell = (async () => {
        console.log(
            chalk.hex(COLOURS.PRIMARY)(goodByeMessage)
        );

        console.log(
            chalk.hex(COLOURS.PRIMARY)(figlet.textSync('DONE'))
        );
        shell.exit(0);
    });

    const noInputError = (async () => {
      console.log(
          chalk.hex(COLOURS.WARNING)(noInputMessage)
      );
      shell.exit(0);
  });

  const copyHygenCfg = async () => new Promise((resolve, reject) => {
    const hygenCfg = `${originalPath}/templates/hygen.ejs`;
    const filePath = `${process.env['HOME']}/.hygen.js`;
    fs.copyFile(hygenCfg, filePath, (err) => {
      if (err) {
        console.log(err)
        reject()
        throw err
      };
    });
  })

  const copyTemplates = async () => new Promise((resolve, reject) => {
    const templates = require('./templates/templates')
    for (let templateConfig of templates.variants) {
      shell.exec(`mkdir -p ${templateConfig.path}`);

      for(let fname of templateConfig.files) {
        let filePath;
        if (fname === "index.ejs") {
          filePath = `${templateConfig.path}/index.js`;
        } else filePath = `${templateConfig.path}/${fname}`;

        fs.copyFile(`${originalPath}/templates/${templateConfig.path}/${fname}`, `${process.env['HOME']}/_templates/${filePath}`, (err) => {
          if (err) {
            console.log(err)
            reject()
            throw err
          };
        });
      }
      resolve()
    }
  })

    const init = (async () => {
      shell.cd(`${process.env['HOME']}`);

      if(shell.cd(`${process.env['HOME']}/_templates`).code === 1) {
        console.log(chalk.hex(COLOURS.SUCCESS)(`Initialising _templates directory in ${process.env['HOME']}`));

        shell.exec(`hygen init self`);
        shell.cd(`_templates`);
        shell.exec(`npm install inflection`);

        if(shell.exec(`ls -al | grep '.hygen.js'`).code === 1) {
          console.log(chalk.hex(COLOURS.SUCCESS)(`Copying .hygen.js to ${process.env['HOME']}`));
          copyHygenCfg()
        } else {
          console.log(chalk.hex(COLOURS.SUCCESS)(`.hygen.js found in ${process.env['HOME']}`));
        }


        copyTemplates().then(() => {
          console.log(chalk.hex(COLOURS.SUCCESS)(`Copied successfuly all templates to ${process.env['HOME']}/_templates`));
          runTemplate();
        })

      } else {
        console.log(chalk.hex(COLOURS.SUCCESS)(`All configs are OK!`));
        runTemplate();
      }
    })

    const runTemplate = (async () => {
        const genType = await inquirer.prompt(generatorQuestion);
        const nameQuestion = {
          type: 'input',
          name: 'name',
          message: `What is your ${genType.kind} name? (Best to use CamelCase or under_score!)`,
        };
        const name = await inquirer.prompt(nameQuestion);
        if (!name.name || !genType.kind) {
          await noInputError()
        } else {
          shell.cd(workingPath)
          shell.exec(`hygen ${genType.kind} new --name ${name.name}`);
          await closeShell();
        }
    });

    init().catch(err => console.log(err));

})();
