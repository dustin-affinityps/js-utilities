
export default {
    toNumber: {
        set: function(){},
        get: function() {
            return function() {
                return this;
            }.bind(this)
        }
    },
    
    toCurrency: {
        set: function(){},
        get: function() {
            return function() {
                let v = `${this}`.replace(/[^0-9+\-Ee.]/g, '');
                v = Math.trunc(+v).toLocaleString();
                return v;
            }.bind(this)
        }
    }
};