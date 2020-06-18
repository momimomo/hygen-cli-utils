#!/usr/bin/env node

import { MESSAGES} from './constants';
import { print } from './utils'
const inquirer = require('inquirer');
const rl = require('readline');
const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;


(async () => {

    const originalPath = `${path.dirname(fs.realpathSync(__filename))}`;
    const workingPath = `${process.cwd()}`

    const displayWelcomeMessage = (async () => {
      print(MESSAGES.separator)
      print(MESSAGES.welcomeMessage)
      print(MESSAGES.separator)
    });

    const closeShell = (async () => {
      print(MESSAGES.goodByeMessage)
      print(MESSAGES.doneFiglet)
      shell.exit(0);
    });

    const noInputError = (async () => {
      print(MESSAGES.noInputMessage);
      shell.exit(0);
  });



  const copyHygenCfg = async () => new Promise((resolve, reject) => {
    const hygenCfg = `${originalPath}/templates/.hygen.js`;
    const filePath = `${process.env['HOME']}/.hygen.js`;

    ncp(hygenCfg, filePath, (err: Error) => {
      if (err) {
        console.log(err)
        reject()
        throw err
      }
      print({message: 'Copied .hygn.js with success.'})
      resolve();
     });
  });

  const copyTemplates = async () => new Promise((resolve, reject) => {
    const source = `${originalPath}/templates`;
    const target = `${process.env['HOME']}/_templates`;

    ncp(source, target, (err: Error) => {
      if (err) {
        console.log(err)
        reject()
        throw err
      }
      print({message: 'Copied /templates with success.\r'})
      resolve();
     });
  })

    const init = (async () => {
      displayWelcomeMessage();
      shell.cd(`${process.env['HOME']}`);

      if(shell.cd(`${process.env['HOME']}/_templates`).code === 1) {
        print({message: `Initializing _templates directory in ${process.env['HOME']}\r`})
        shell.exec(`hygen init self`);
        shell.cd(`_templates`);
        shell.exec(`npm install inflection`);

        if (shell.exec(`ls -al | grep '.hygen.js'`).code === 1) {
          print({message: `Copying .hygen.js to ${process.env['HOME']}\r`});
          copyHygenCfg()
        } else {
          print({message: `.hygen.js found in ${process.env['HOME']}\r`});
        }

        copyTemplates().then(() => {
          print({message: `Copied successfuly all templates to ${process.env['HOME']}/_templates\r`});
          process.stdout.write('lel\r')

          runTemplate();
        })

      } else {
        print({message: `All configs are OK!\r`});
        runTemplate();
      }
    })

    const runTemplate = (async () => {


      const genType = await inquirer.prompt(MESSAGES.generatorQuestion);
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
