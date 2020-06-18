export const DEFAULTS = {
  NAME: 'Name',
  APP_NAME: 'Hygen CLI utils wrapper',
  FIGLET: {
    FONT: 'doom',
    HORIZONTAL: 'default',
    VERTICAL: 'default'
  }
};

export const COLOURS = {
  PRIMARY: '#da1c5b',
  WARNING: '#bf223c',
  SUCCESS: '#4bf28e',
};

export const MESSAGES = {
  welcomeMessage: {
    message: `
      Hi! Welcome to ${DEFAULTS.APP_NAME}! \n
      This Code Generator will help you generate code using common templates used in your company. \n
      Before you start, please make sure that you have installed npm and hygen.io globally.
      `,
    kind: COLOURS.PRIMARY
  },
  printError: {
    message: `Error while trying to print to console.`,
    kind: COLOURS.WARNING
  },
  stringHexError: {
    message: `"kind" argument must be a hex string in #ABC or #AABBCC format`,
    kind: COLOURS.WARNING
  },
  goodByeMessage: {
    message: `Congratulations! Your new module is ready to extend. Happy coding!\n`,
    kind: COLOURS.SUCCESS
  },
  generatorTypeMessage: {
    message: `Choose template type:`,
    kind: COLOURS.PRIMARY
  },
  noInputMessage: {
    message: `Error! No name specified. Exiting. \n`,
    kind: COLOURS.PRIMARY
  },
  separator: {
    message: `<|:============================================ -:- ============================================:|>`,
    kind: COLOURS.PRIMARY
  },
  separatorWithNewline: {
    message: `<|:============================================ -:- ============================================:|> \n`,
    kind: COLOURS.PRIMARY
  },
  doneFiglet: {
    message: `DONE`,
    kind: COLOURS.PRIMARY,
    figlet: true
  },
  generatorQuestion: [
    {
      type: 'list',
      name: 'kind',
      message: 'Choose template type:',
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
  ],
};
