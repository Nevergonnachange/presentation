import { join, resolve, sep } from 'path';
import { Observable } from 'rxjs/Observable';
import { concatMap, map } from 'rxjs/operators';
import * as sanitize from 'sanitize-filename';
import { Argv } from 'yargs';

import { rootDir } from '../constants';
import { exists, mkdir, readdir, writeMetadata } from '../helpers/node-wrappers';
import { printError, printSuccess } from '../helpers/print';
import { IChapterArgs } from './chapter-interface';

export function chapterBuilder(args: Argv): Argv {
    return args;
}

export function chapterHandler(args: IChapterArgs): void {
    const chapterDir: string    = resolve(rootDir, args.name);
    const splitPath: string[]   = chapterDir.split(sep);
    const chapterName: string   = splitPath.pop();
    const chapterFolder: string = sanitize(chapterName);
    const talkDir: string       = splitPath.join(sep);

    exists(talkDir)
        .pipe(
            concatMap(() => readdir(talkDir)),
            map(dirs => getNextIndex(dirs, args.index)),
            concatMap(index => insertAtIndex(talkDir, chapterFolder, index)),

            concatMap(() => mkdir(join(talkDir, chapterFolder))),

            concatMap(() => writeChapterMetadata(chapterDir, chapterName))
        )
        .subscribe(printSuccess, printError);
}

function(talkDir: string, chapterFolder: string, index: number) {

}

function writeChapterMetadata(folder, name: string): Observable<string> {
    return writeMetadata(folder,
`
{
    "name": "${name}"
}
`
    );
}

function getNextIndex(dirs: string[], index: number | undefined): number {
    return index ? index : dirs.length;
}
