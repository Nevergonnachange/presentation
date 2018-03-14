import 'reveal.js/lib/js/head.min.js';

import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as hljs from 'highlight.js';
import * as Reveal from 'reveal.js';

import { PresentationNode } from './presentation.model';

@Component({
    selector: 'ngxup-presentation',
    templateUrl: './presentation.component.html',
    styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

    public presentation: PresentationNode[] = [];

    constructor(private _route: ActivatedRoute,
                private _renderer: Renderer2,
                private _el: ElementRef) {
    }

    public ngOnInit(): void {
        this._buildPresentation();
        console.log(this.presentation);
        this._appendNodesToDOM(this.presentation, this._el.nativeElement.querySelector('.slides'));
        this._initializeReveal();
    }

    private _appendNodesToDOM(nodes: PresentationNode[], parent: Element) {
        nodes.forEach(node => {
            const sectionNode: Element = this._renderer.createElement('section');
            sectionNode.innerHTML = node.html || '';
            this._renderer.appendChild(parent, sectionNode);
            if (node.children) {
                this._appendNodesToDOM(node.children, sectionNode);
            }
        });
    }

    private _initializeReveal() {
        if (Reveal.isReady()) { location.reload(true); }
        Reveal.initialize({
            history: true,
            progress: true,
            dependencies: [
                { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },

            ]
        });
    }

    private _buildPresentation() {
        (require as any).context(`../../../modules/slides`, true, /\.html/)
            .keys()
            .filter(val => val.startsWith(`.${this._route.snapshot.params.path}`))
            .map(val => val.replace(`.${this._route.snapshot.params.path}/`, ''))
            .forEach(path => {
                let nodeList: PresentationNode[] = this.presentation;
                path.split('/').forEach(subPath => {
                    const node: PresentationNode = new PresentationNode(subPath, this._route.snapshot.params.path);
                    if (subPath.endsWith('.html')) {
                        node.html = path;
                        nodeList.push(node);
                    } else {
                        const foundNode: PresentationNode = nodeList
                            .find(val => val.name === subPath);
                        if (foundNode) {
                            nodeList = foundNode.children;
                        } else {
                            nodeList.push(node);
                            nodeList = node.children;
                        }
                    }
                });
            });
    }
}
