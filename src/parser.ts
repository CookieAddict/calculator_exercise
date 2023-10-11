export function parseCommand(command: string, currentValue: number ): [number, number] {
    if (command === '=') {
        return [currentValue, 0];
    } else if (command === '!') {
        return [currentValue * -1, 0];
    } else if (command === 'c') {
        return [0, 0];
    }

    let commandValues: string[] = [];
    const operands: RegExp = /[+\-*/]/;
    let number = '';
    for (const c of command) {
        if (operands.test(c)) {
            if (number.length > 0) {
                commandValues.push(number);
            }

            commandValues.push(c);
            number = '';
        } else {
            number = number + c;
        }
    }

    // adding last number
    let displayValue = 0;
    if (number.length > 0) {
        // handling special case where equal is provided at the end of the command
        if (number[number.length - 1] === '=') {
            number = number.substring(0, number.length - 1);
        } else {
            displayValue = Number(number);
        }

        commandValues.push(number);
    }

    // if first command value is a number, we will not hit the below if statement
    // we are ignoring current value and basically resetting state
    if (operands.test(commandValues[0])) {
        commandValues.unshift(String(currentValue));
    }

    const higherPriorityOperands: RegExp = /[*/]/;
    for (let i = 0; i < commandValues.length - 2; i += 2) {
        const left = commandValues[i];
        const operand = commandValues[i + 1];
        const right = commandValues[i + 2];
        if (higherPriorityOperands.test(operand)) {
            const result = executeOperation(Number(left), Number(right), operand);
            commandValues[i] = String(result);
            commandValues.splice(i + 1, 2);
            i -= 2;
        }
    }

    for (let i = 0; i < commandValues.length - 2; i += 2) {
        const left = commandValues[i];
        const operand = commandValues[i + 1];
        const right = commandValues[i + 2];
        const result = executeOperation(Number(left), Number(right), operand);

        commandValues[i + 2] = String(result);
    }

    return [Number(commandValues[commandValues.length - 1]), displayValue];
}

function executeOperation(x: number, y: number, operand: string) {
    switch (operand) {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '*':
            return x * y;
        case '/':
            return x / y;
        default:
            return 0;
    }
}