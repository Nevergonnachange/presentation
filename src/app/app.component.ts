import { Component, Renderer2 } from '@angular/core';

import { appendStyleSheet } from '../helpers/append-style-sheet';
import { insertUrlParam } from '../helpers/insert-url-param';
import { removeUrlParam } from '../helpers/remove-url-param';

@Component({
  selector: 'ngxup-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public static DARK_THEME: string = require('reveal.js/css/theme/black.css');
    public static LIGHT_THEME: string = require('reveal.js/css/theme/white.css');
    public static PRINT_THEME: string = require('reveal.js/css/print/pdf.css');
    public static PRINT_PARAM = 'print-pdf';

    public showToolbar = true;
    public darkTheme = true;
    public printView: boolean = window.location.search.match(/print-pdf/gi) !== null;

    constructor(private _renderer: Renderer2) {
        this._renderer.listen('document', 'keypress', (event: KeyboardEvent) => {
            console.log(event.keyCode);
            if (event.keyCode === 17 && event.ctrlKey) {
                this.showToolbar = !this.showToolbar;
            }
        });
        this.toggleTheme(this.darkTheme);
        this.togglePrintView(this.printView, false);
    }

    public toggleTheme(checked: boolean): void {
        document.body.classList.toggle('dark-theme');
        appendStyleSheet('reveal-theme', checked ? AppComponent.DARK_THEME : AppComponent.LIGHT_THEME);
    }

    public togglePrintView(checked: boolean, changeUrl: boolean = true): void {
        if (changeUrl) {
            checked ? insertUrlParam(AppComponent.PRINT_PARAM, '') : removeUrlParam(AppComponent.PRINT_PARAM);
            location.reload();
        } else {
            appendStyleSheet('reveal-print-view', checked ? AppComponent.PRINT_THEME : '');
        }
    }
}
