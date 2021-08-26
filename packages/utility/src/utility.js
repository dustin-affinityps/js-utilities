
Number.prototype.toCurrency = String.prototype.toCurrency = function() {
    let v = `${this}`.replace(/[^0-9+\-Ee.]/g, '');
    v = Math.trunc(+v).toLocaleString();

    return v;
};

String.prototype.toNumber = function() {
    let vv = `${this}`.replace(/[^0-9+\-Ee.]/g, '');

	return +vv || 0;
};

Number.prototype.toNumber = function() {
	return this;
};

String.prototype.numbersOnly = function() {
    return this.replace(/\D/g, '');
};

String.prototype.lcFirst = function() {
    return this.replace(/\b([A-Z])/, s => s.toLowerCase());
};

String.prototype.ucFirst = function() {
    return this.replace(/\b([a-z])/, s => s.toUpperCase());
};

globalThis.getCompProp = (name, elem) => {
    return globalThis.getComputedStyle((elem ?? document.documentElement)).getPropertyValue(name);
}

globalThis.getXsrfToken = () => {
    let token = globalThis.getCookie('XSRF-TOKEN');
    return token;
};

globalThis.getCookie = cName => {
    let cookie = null;
    let cookies = document.cookie.split('; ');

    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].split('=');

        if ( c[0] == cName ) {
            cookie = decodeURIComponent(c[1]);
        }
    }

    return cookie;
};

globalThis.setCookie = (cName, cValue, expires = null, cSite = 'None') => {
    let e = new Date;
    e.setSeconds(e.getSeconds() + (expires ?? (60*60*24*365)));

    let c = `${cName}=${encodeURIComponent(cValue)}; Path=/; SameSite=${cSite}; expires=${e.toUTCString()}; Secure`;

    document.cookie = c;
};
