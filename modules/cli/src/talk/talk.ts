import * as sanitize from 'sanitize-filename';
import { Argv } from 'yargs';
import { ITalkArgs } from './talk-interface';
import { printSuccess, printError } from '../helpers/print';
import { join } from 'path';
import { slideDir } from '../constants';
import { mkdir, writeMetadata } from '../helpers/node-wrappers';
import { concatMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

export function talkBuilder(args: Argv): Argv {
    return args;
}

export function talkHandler(args: ITalkArgs): void {
    const talkFolder: string    = sanitize(args.name);
    const talkDir: string       = join(slideDir, talkFolder);

    printSuccess(`Starting Generation of new Presentation: ${args.name}...\n`);

    mkdir(talkDir).pipe(
        concatMap(() =>  writeTalkMetadata(talkDir, args)),
        map(() => `\nPresenation ${args.name} successfully created!`)
    ).subscribe(printSuccess, printError);
}

function writeTalkMetadata(folder: string, args: ITalkArgs): Observable<string> {
    return writeMetadata(folder,
`
{
    "name": "${args.name}",
    "created": "${new Date().toISOString()}",
    "author": "${args.author}"
    }
`
    );
}
