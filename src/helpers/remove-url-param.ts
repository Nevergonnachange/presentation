export function removeUrlParam(key: string) {
    let url = '';
    const urlparts: string[] = document.location.href.split('?');
    console.log(urlparts);
    if (urlparts.length >= 2) {

        const prefix = `${encodeURIComponent(key)}=`;
        const pars: string[] = urlparts[1].split(/[&;]/g);

        for (let i = pars.length; i-- > 0;) {
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }


        url = urlparts[0] + (url.indexOf('?') !== -1 ? '?' + pars.join('&') : '');
    }

    console.log('remove param', url);
    window.history.pushState({path: url}, '', url);
}
