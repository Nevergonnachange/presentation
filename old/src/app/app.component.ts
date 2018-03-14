import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public showToolbar: boolean = true;

    constructor(private _renderer: Renderer2) {
        this._renderer.listen('document', 'keypress', (event: KeyboardEvent) => {
            if (event.keyCode === 17 && event.ctrlKey) {
                this.showToolbar = !this.showToolbar;
            }
        })
    }
}
