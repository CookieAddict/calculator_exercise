import inquirer from "inquirer";
import {parseCommand} from "./parser.js";
import {validateInput} from "./validation.js";

console.log("Calculator ready!")
let prompt;
let currentValue = 0;
let displayValue = 0;

while (!prompt || prompt.command !== 'exit') {
    prompt = await inquirer.prompt([
        {
            type: 'input',
            name: 'command',
            message: ''
        }
    ]);

    let command = prompt.command;
    if (!validateInput(command)) {
        console.log('Invalid command, please retry. To quit, type "exit"');
        continue;
    }

    const parseResult:[number, number] = parseCommand(command, currentValue);
    currentValue = parseResult[0];
    displayValue = parseResult[1];

    const lastCharacter = command[command.length - 1];
    if (lastCharacter === '=' || lastCharacter === '!') {
        console.log(currentValue);
    } else {
        // if no equal provided then just printing out the last number in the command to satisfy problem statement
        console.log(displayValue);
    }
};
