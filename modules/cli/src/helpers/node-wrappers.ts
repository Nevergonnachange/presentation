import * as fs from 'fs';
import { Observable } from 'rxjs/Observable';
import { bindCallback } from 'rxjs/observable/bindCallback';
import { of } from 'rxjs/observable/of';
import { zip } from 'rxjs/observable/zip';
import { _throw } from 'rxjs/observable/throw';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { concatMap, tap, map } from 'rxjs/operators';
import { join } from 'path';
import { bindNodeCallback } from 'rxjs/observable/bindNodeCallback';
import { stat } from 'fs';

export function mkdir(d: string): Observable<string> {
    return bindCallback(fs.mkdir)(d).pipe(
        concatMap(err => err ? _throw(err) : of(d))
    );
}

export function writeFile(d: string, c: string): Observable<string> {
    return (<Function>bindCallback)(fs.writeFile)(d, c).pipe(
        concatMap(err => err ? _throw(err) : of(d))
    );
}

export function exists(d: string): Observable<string> {
    return bindCallback(fs.exists)(d).pipe(
        concatMap(res => res ? of(d) : _throw(`Folder ${d} does not exists.`))
    );
}

export function readdir(d: string): Observable<any> {
    return bindNodeCallback(fs.readdir)(d).pipe(
        concatMap(
            dirs => zip(...dirs.map(dir => combineLatest(of(dir), isDirectory(join(d, dir)))))
        ),
        map(dirs => dirs.filter(dir => dir[1]).map(dir => dir[0]))

    );
}

export function isDirectory(d: string): Observable<boolean> {
    return bindNodeCallback(stat)(d).pipe(
        map(s => s.isDirectory())
    );
}

export function writeMetadata(folder: string, content: string): Observable<string> {
    return writeFile(join(folder, '/.metadata.json'), content);
}
