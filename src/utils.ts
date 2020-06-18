import { COLOURS, MESSAGES, DEFAULTS } from "./constants";
import { IPrintConfig } from "./interfaces";

const chalk = require('chalk');
const fig = require('figlet');
const logUpdate = require('log-update');

export const isStringValidHexColor = (hex: string): boolean => /^#([0-9A-F]{3}){1,2}$/i.test(hex);

export const print = ({message, figlet, kind = COLOURS.PRIMARY}: IPrintConfig) : void => {
  if (!isStringValidHexColor(kind)) {
    print(MESSAGES.printError);
    print(MESSAGES.stringHexError);
    return;
  }
  if (figlet) {
    logUpdate(
      chalk.hex(kind)(fig.textSync(
        `${message}\r`,
          {
            font: DEFAULTS.FIGLET.FONT,
            horizontalLayout: DEFAULTS.FIGLET.HORIZONTAL,
            verticalLayout: DEFAULTS.FIGLET.VERTICAL
          }
      ))
    )
  } else {
    logUpdate(
      chalk.hex(kind)(message)
    );
  }
  // logUpdate.clear()
}
