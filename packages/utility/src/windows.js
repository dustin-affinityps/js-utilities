
import { YEAR_IN_MICRO } from './constants';

// adds helper function getCompProp to globalThis to retrieve a property of a computed style
globalThis.getCompProp = (name, elem) => {
    return globalThis.getComputedStyle((elem ?? document.documentElement)).getPropertyValue(name);
}

// this will likely attach to window. Possibly do globalThis.[get|set]Cookie instead?

export default {
    getCookie: {
        set: function(){},
        get: function() {
            return function(cookieName) {
                return document.cookie
                    .split('; ')
                    .filter(c => c.split('=')[0] == cookieName)
                    .map(c => c.split('=')[1])[0] ?? null;
            }.bind(this)
        }
    },

    setCookie: {
        set: function(){},
        get: function() {
            return function(name, value, expires = YEAR_IN_MICRO, site = 'lax', path = '/', setHttpOnly = false) {
                let expireOn = new Date((+new Date + expireOn)).toUTCString();
                let httpOnly = setHttpOnly ? '; HttpOnly' : '';

                value = encodeURIComponent(value);

                document.cookie = `${name}=${value}; Path=${path}; SameSite=${site}; expires=${expireOn}; Secure${httpOnly}`;
            }.bind(this)
        }
    }
};
