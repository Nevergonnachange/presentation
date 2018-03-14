import * as sanitize from 'sanitize-filename';
import { Argv } from 'yargs';
import { IChapterArgs } from './chapter-interface';
import { join, resolve, sep } from 'path';
import { printSuccess, printError } from '../helpers/print';
import { slideDir, rootDir } from '../constants';
import { exists, mkdir, writeMetadata, readdir } from '../helpers/node-wrappers';
import { concatMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

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
            concatMap(() => readChapters(talkDir)),
            tap(f => console.log(f)),
            concatMap(() => mkdir(join(talkDir, chapterFolder))),
            concatMap(() => writeChapterMetadata(chapterDir, chapterName))
        )
        .subscribe(printSuccess, printError);

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

function readChapters(dir: string): Observable<string[]> {
    return readdir(dir);
}
