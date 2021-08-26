
export default {
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

    toNumber: {
        set: function(){},
        get: function() {
            return function() {
                let vv = this.replace(/[^0-9+\-Ee.]/g, '');
                return +vv || 0;
            }.bind(this)
        }
    },

    numbersOnly: {
        set: function(){},
        get: function() {
            return function() {
                return this.replace(/\D/g, '');
            }.bind(this)
        }
    },

    lcFirst: {
        set: function(){},
        get: function() {
            return function() {
                return this.replace(/\b([A-Z])/, s => s.toLowerCase());
            }.bind(this)
        }
    },

    ucFirst: {
        set: function(){},
        get: function() {
            return function() {
                return this.replace(/\b([a-z])/, s => s.toUpperCase());
            }.bind(this)
        }
    }
};
