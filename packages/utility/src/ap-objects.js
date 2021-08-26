
export default {
    isObject(target) {
        return Object.prototype.toString.call(target) === '[object Object]';
    },

    isEmpty(target = null) {
        return target == null || ! this.isObject(target) || Object.entries(target).length == 0;
    },

    wrap(target) {
        return (Array.isArray(target) ? target : [target]);
    },

    divide(target = {}) {
        return this.isObject(target) ? [ Object.keys(target), Object.values(target) ] : target;
    },

    dot(target, prepend = '') {
        return Object.entries(target).reduce((results, [key, value]) => {
            return (this.isObject(value) && ! this.isEmpty(value)) ?
                Object.assign(results, this.dot(value, `${prepend}${key}.`)) :
                Object.assign(results, {[`${prepend}${key}`]: value});
        }, {});
    },

    getDot(target, path) {
        return path.split('.').reduce((c, seg) => (c[seg] ?? null), target);
    },

    deepAssign(target = {}, source = null) {
        if (! this.isObject(source) ) return source;

        Object.entries(source).forEach(([key, value]) => {
            if ( this.isObject(value) ) {
                source[key] = Object.assign((target[key] ?? {}), this.deepAssign(target[key], value));
            }
        });

        return Object.assign(target, source);
    },

    twSafe(selector) {
        return selector.replace(/([:\/])/g, "\\\$1");
    }
}
