export function printSuccess(msg: string): void {
    console.log('\x1b[32m%s\x1b[0m', msg);
}

export function printError(err: any): void {
    console.log('\x1b[31m%s\x1b[0m', err);
}
