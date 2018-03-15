export function appendStyleSheet(id: string, styleSheet: string) {
    const style: HTMLElement = document.getElementById(id) || document.createElement('style');
    style.id = id;
    while (style.firstChild) { style.removeChild(style.firstChild); }
    style.appendChild(document.createTextNode(styleSheet));
    document.head.appendChild(style);
}
