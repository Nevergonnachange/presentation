import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { DataSource } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IOverview } from './overview.model';

@Component({
  selector: 'ngxup-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

    public dataSource                           = null;
    public displayedColumns: string[]           = null;

    @ViewChild('filter') filter: ElementRef     = null;

    constructor() { }

  ngOnInit() {
      this.displayedColumns = ['name', 'created', 'author'];
      this.dataSource = new PresentationDataSource(
          Observable.fromEvent(this.filter.nativeElement, 'keyup')
              .map(val => this.filter.nativeElement.value)
              .debounceTime(150)
              .distinctUntilChanged(),
          this.displayedColumns
      );
  }

}

class PresentationDataSource extends DataSource<IOverview> {
    private _data: IOverview[] = null;

    constructor(private _filter$, private _cols: string[]) {
        super();
        this._readPresentations();
    }

    public connect(): Observable<IOverview[]> {
        return Observable.merge(
            Observable.of(this._data),
            this._filter$.map(val => {
                return this._data.filter(row => {
                    const searchString: string = this._cols
                        .map(col => row[col])
                        .join('')
                        .toLowerCase();
                    return searchString.indexOf(val.toLowerCase()) !== -1;
                });
            })
        );
    }

    public disconnect(): void {}

    private _readPresentations() {
        this._data = (require as any).context('../../../modules/slides', true, /\.json/)
            .keys()
            .map(val => ({
                ...require(`../../../modules/slides${val.substring(1)}`),
                path: `${val.substring(1).replace('/metadata.json', '')}`
            }));
    }
}
