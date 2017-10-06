import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngxup-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

    public presentations: any[] = null;

    constructor() {
        this.presentations = [{name: '1'}, {name: '2'}]
    }

  ngOnInit() {
  }

}
