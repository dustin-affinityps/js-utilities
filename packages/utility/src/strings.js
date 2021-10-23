
export default {
    // converts string to US currency format
    toCurrency: {
        set: function(){},
        get: function() {
            return function() {
                let v = this.replace(/[^0-9+\-Ee.]/g, '');
                v = Math.trunc(+v).toLocaleString();
                return v;
            }.bind(this)
        }
    },

    // attempts to force a string into a number
    toNumber: {
        set: function(){},
        get: function() {
            return function() {
                let vv = this.replace(/[^0-9+\-Ee.]/g, '');
                return +vv || 0;
            }.bind(this)
        }
    },

    // returns only the numbers of a string
    numbersOnly: {
        set: function(){},
        get: function() {
            return function() {
                return this.replace(/\D/g, '');
            }.bind(this)
        }
    },

    // lowercases first character in string
    lcFirst: {
        set: function(){},
        get: function() {
            return function() {
                return this.replace(/\b([A-Z])/, s => s.toLowerCase());
            }.bind(this)
        }
    },

    // uppercases first character in string
    ucFirst: {
        set: function(){},
        get: function() {
            return function() {
                return this.replace(/\b([a-z])/, s => s.toUpperCase());
            }.bind(this)
        }
    },

    // uppercases first character for each "word" in string
    ucWords: {
        set: function(){},
        get: function() {
            return function() {
                return this.replace(/\b([a-z])/g, s => s.toUpperCase());
            }.bind(this)
        }
    }
};
