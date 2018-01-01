/**
 * Author:  NeverGonnaChange
 * Project: presentation
 * File:    presentation-cli.ts
 * Created: 31.12.2017 12:59
 */

const yargs                 = require('yargs/yargs')(process.argv.slice(2));

interface ICmdArguments { apps: string[]; commands: string[]; basedir: string }

const argv: ICmdArguments       = readCmdArguments();

function readCmdArguments(): ICmdArguments {
    return yargs
        .option('generate', {
            alias: 'g',
            describe: 'Command to be run.',
            demand: true,
        })
        .option('commands', {
            alias: 'c',
            describe: 'chose commands to be run',
            type: 'array',
            demand: true
        })
        .option('basedir', {
            alias: 'b',
            describe: 'base directory',
            type: 'string',
            default: './'
        })
        .argv;
}
