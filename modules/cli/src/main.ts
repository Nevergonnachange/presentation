#!/usr/bin/env node

import * as yargs from 'yargs';
import * as fs from 'fs';
import { Arguments, Argv } from 'yargs';
import { bindCallback } from 'rxjs/observable/bindCallback';
import { bindNodeCallback } from 'rxjs/observable/bindNodeCallback';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { concatMap, tap, map } from 'rxjs/operators';
import { resolve, join, parse, sep } from 'path';
import { Observable } from 'rxjs/Observable';
import { mkdir, exists, writeFile } from './helpers/node-wrappers';
import { printError, printSuccess } from './helpers/print';
import * as sanitize from 'sanitize-filename';
import { talkBuilder, talkHandler } from './talk/talk';
import { chapterBuilder, chapterHandler } from './chapter/chapter';
import { slideBuilder, slideHandler } from './slide/slide';


const argv: Arguments = yargs
    .usage('Usage: <command> [options]')
    .command(
        'p <name> <author>', 'Create a new presentation',
        talkBuilder, talkHandler
    )
    .command(
        'c <name> [index]', 'Create a chapter',
        chapterBuilder, chapterHandler
    )
    .command(
        's <name> [index]', 'Create a slide',
        slideBuilder, slideHandler
    )
    .help('h')
    .alias('h', 'help')
    .argv;


// function presenationBuilder(args: Argv): Argv { return args; }

// function presenationHandler(args: IPArgs): void {
//     const talkDir: string = join(currDir, args.name);
//     printSuccess(`Generating new Presentation: ${args.name}\n`);
//     mkdir(join(slideDir, args.name))
//         .pipe(
//             concatMap(() => __writeTalkMetadata(talkDir, args)),
//             map(() => `\nPresenation ${args.name} successfully created!`)
//         )
//         .subscribe(
//             printSuccess, printError
//         );
// }

// function chapterBuilder(args: Argv): Argv { return args; }

// function chapterHandler(args: ICArgs): void {
//     const chapterDir: string    = resolve(rootDir, args.name);
//     const splitPath: string[]   = chapterDir.split(sep);
//     const name: string          = sanitize(splitPath.pop());
//     const talkDir: string       = splitPath.join(sep);

//     console.log(talkDir);

//     exists(talkDir)
//         .pipe(
//             concatMap(() => mkdir(chapterDir)),
//             concatMap(() => __writeChapterMetadata(chapterDir, name))
//         )
//         .subscribe(printSuccess, printError);
// }

// function slideBuilder(args: Argv): Argv { return args; }

// function slideHandler(args: ISArgs): void {

// }

// function __writeChapterMetadata(folder, name: string): Observable<string> {
//     return __writeMetadata(folder,
// `
// {
//     "name": "${name}"
// }
// `
//     );
// }

// function __writeTalkMetadata(folder: string, args: IPArgs): Observable<string> {
//     return __writeMetadata(folder,
// `
// {
//     "name": "${args.name}",
//     "created": "${new Date().toISOString()}",
//     "author": "${args.author}"
//     }
// `
//     );
// }

// function __writeMetadata(folder: string, content: string): Observable<string> {
//     return writeFile(join(folder, '/.metadata.json'), content);
// }


