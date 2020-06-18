#!/usr/bin/env node
declare const inquirer: any;
declare const shell: any;
declare const chalk: any;
declare const figlet: any;
declare const fs: any;
declare var path: any;
declare const VARIABLES: {
    NAME: string;
    APP_NAME: string;
};
declare const COLOURS: Readonly<{
    TIVIX: string;
    PRIMARY: string;
    WARNING: string;
    SUCCESS: string;
}>;
declare const welcomeMessage: string;
declare const goodByeMessage = "\nCongratulations! Your new module is ready to extend. Happy coding!\n\n";
declare const generatorTypeMessage = "\nChoose template type:\n";
declare const noInputMessage = "\nError! No name specified. Exiting. \n\n";
declare const separator = "\n<|:============================================ -:- ============================================:|>\n";
declare const separatorWithNewline = "\n<|:============================================ -:- ============================================:|> \n\n";
declare const generatorQuestion: {
    type: string;
    name: string;
    message: string;
    choices: {
        name: string;
        value: string;
        short: string;
    }[];
}[];
