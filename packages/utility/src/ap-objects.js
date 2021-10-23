
export default {
    // tests if target is an object
    isObject(target) {
        return Object.prototype.toString.call(target) === '[object Object]';
    },

    // tests if object is empty
    isEmpty(target = null) {
        return target == null || ! this.isObject(target) || Object.entries(target).length == 0;
    },

    // wraps value in array if not already an array
    wrap(target) {
        return (Array.isArray(target) ? target : [target]);
    },

    // splits object into array of keys and values
    divide(target = {}) {
        return this.isObject(target) ? [ Object.keys(target), Object.values(target) ] : target;
    },

    // access object values based on dot notation
    dot(target, prepend = '') {
        return Object.entries(target).reduce((results, [key, value]) => {
            return (this.isObject(value) && ! this.isEmpty(value)) 
                ? Object.assign(results, this.dot(value, `${prepend}${key}.`))
                : Object.assign(results, {[`${prepend}${key}`]: value});
        }, {});
    },

    // dot notation helper function
    getDot(target, path) {
        return path.split('.').reduce((c, seg) => (c[seg] ?? null), target);
    },

    // Object.assign that recursively assigns attributes if object
    deepAssign(target = {}, source = null) {
        if (! this.isObject(source) ) return source;

        Object.entries(source).forEach(([key, value]) => {
            if ( this.isObject(value) ) {
                source[key] = Object.assign((target[key] ?? {}), this.deepAssign(target[key], value));
            }
        });

        return Object.assign(target, source);
    },

    // tailwind safe selector names
    twSafe(selector) {
        return selector.replace(/([:\/])/g, "\\\$1");
    }
}
