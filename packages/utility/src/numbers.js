
export default {
    // added to prevent errors on VAR.toNumber where VAR is already a number
    toNumber: {
        set: function(){},
        get: function() {
            return function() {
                return this;
            }.bind(this)
        }
    },
    
    // formats number as US currency
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