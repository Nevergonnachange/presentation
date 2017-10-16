export class PresentationNode {
    private _html: string;
    public _name: string;
    public label: string;
    public children: PresentationNode[];

    set html(s: string) {
        if (!s) { return; }
        this._html = require(`../../presentations${this._root}/${s}`);
    }
    get html(): string { return this._html; }

    set name(n: string) {
        this._name = n;

        this.label = n.replace('.html', '')
            .substring(n.indexOf('-') + 1);
    }
    get name():  string { return this._name; }

    constructor(n: string = null, private _root: string = '', h: string = '', c: PresentationNode[] = []) {
        this.name = n;
        this.children = c;
        this.html = h;
    }
}
