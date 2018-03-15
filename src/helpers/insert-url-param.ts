export function insertUrlParam(key: string, value: string) {
    key = encodeURIComponent(key); value = encodeURIComponent(value);

    let url: string = document.location.href;
    const kvp = `${key}=${value}`;

    const r: RegExp = new RegExp(`(&|\\?)${key}=[^\&]*`);

    url = url.replace(r, '$1' + kvp);
    if (!r.test(url)) { url += (url.indexOf('?') !== -1 ? '&' : '?') + kvp; }

    window.history.pushState({path: url}, '', url);
}

