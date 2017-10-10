import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngxup-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

    public presentations: any[] = null;

    constructor() {
        this.presentations = (require as any).context('../../presentations', true, /\.json/)
            .keys()
            .map(val => ({
                ...require(`../../presentations${val.substring(1)}`),
                path: `${val.substring(1).replace('/metadata.json', '')}`
            }));
        console.log(this.presentations);

    }

  ngOnInit() {
  }

}
