export function validateInput(command: string): boolean {
    const multiCharCommandPattern: RegExp = /[^+\-*\/=0-9]/;
    const singleCharCommandPattern: RegExp = /[^c=!]/;

    // only allows: c, =, !
    if (command.length == 1 && singleCharCommandPattern.test(command)) {
        return false;
    // only allows math operands and numbers
    } else if (command.length > 1 && multiCharCommandPattern.test(command)) {
        return false;
    }

    return true;
}