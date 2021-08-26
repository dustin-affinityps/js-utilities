
export default {
    // shorthand wrapper for element selector
    $_: {
        set: function(){},
        get: function() {
            return function(selector) {
                let el = this.nodeType ? this : document;

                return (typeof selector == 'string' ? el.querySelector(ApObject.twSafe(selector)) : selector);
            }.bind(this)
        }
    },

    // shorthand wrapper for array of elements selector
    $$_: {
        set: function(){},
        get: function() {
            return function(selector) {
                let el = this.nodeType ? this : document;
                let elemList = (typeof selector == 'string' ? el.querySelectorAll(ApObject.twSafe(selector)) : [selector]);

                return [...elemList];
            }.bind(this)
        }
    },

    siblingOf: {
        set: function(){},
        get: function() {
            return function(selector) {
                return (! this.nodeType || ! this.parentNode) ? false : this.parentNode.$_(selector);
            }.bind(this)
        }
    },

    // return parent of this element matching selector if present
    parentOf: {
        set: function(){},
        get: function() {
            return function(selector) {
                let parent = this.parentNode;

                while(parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') {
                    if ( parent.matches(selector) ) {
                        return parent;
                    }

                    parent = parent.parentNode;
                }

                return  null;
            }.bind(this)
        }
    },

    // test if this element is a child of target
    childOf: {
        set: function(){},
        get: function() {
            return function(target) {
                let parent = this.parentNode;

                while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') {
                    if ( parent == target ) {
                        return true;
                    }

                    parent = parent.parentNode;
                }

                return false;
            }.bind(this)
        }
    },

    isOrChildOf: {
        set: function(){},
        get: function() {
            return function(selector) {
                return this.parentOf(selector) || (this == document.$_(selector));
            }.bind(this)
        }
    },

    addClass: {
        set: function(){},
        get: function() { 
            return function(...selectors) {
                selectors.forEach(s => this.classList.add(s));

                return this;
            }.bind(this)
        }
    },

    removeClass: {
        set: function(){},
        get: function() {
            return function(...selectors) {
                selectors.forEach(s => this.classList.remove(s));

                return this;
            }.bind(this)
        }
    },

    toggleClass: {
        set: function(){},
        get: function() {
            return function(...selectors) {
                selectors.forEach(s => this.classList.toggle(s));

                return this;
            }.bind(this)
        }
    },

    swapClass: {
        set: function(){},
        get: function() {
            return function(aClass, rClass, force = false) {
                if ( force || this.hasClass(rClass) ) {
                    this.addClass(aClass).removeClass(rClass);
                }

                return this;
            }.bind(this)
        }
    },

    hasClass: {
        set: function(){},
        get: function() {
            return function(...selectors) {
                return selectors.filter(s => this.classList.contains(s)).length == selectors.length;
            }.bind(this)
        }
    },

    setAttr: {
        set: function(){},
        get: function() {
            return function(attribute, value = null) {
                this.setAttribute(attribute, value);

                return this;
            }.bind(this)
        }
    },

    setAttrs: {
        set: function(){},
        get: function() {
            return function(attribute, value = null) {
                if (! ApObject.isObject(attribute) ) {
                    this.setAttribute(attribute, value);
                } else {
                    Object.entries(attribute).forEach(([attr, val]) => {
                        this.setAttribute(attr, val);
                    });
                }

                return this;
            }.bind(this)
        }
    },

    removeAttr: {
        set: function(){},
        get: function() {
            return function(attribute) {
                this.removeAttribute(attribute);

                return this;
            }.bind(this)
        }
    },

    removeAttrs: {
        set: function(){},
        get: function() {
            return function(...attributes) {
                attributes.flat().forEach(attribute => this.removeAttribute(attribute));

                return this;
            }.bind(this)
        }
    },

    // remove all event listeners from element, while optionally maintaining child events
    removeListeners: {
        set: function(){},
        get: function() {
            return function(preserveChildren) {
                if ( preserveChildren ) {
                    this.parentNode.replaceChild(this.cloneNode(true), this);
                } else {
                    let elem = this.cloneNode(false);

                    while(this.hasChildNodes()) {
                        elem.appendChild(this.firstChild);
                    }

                    this.parentNode.replaceChild(elem, this);
                }

                return this;
            }.bind(this)
        }
    },

    addEvent: {
        set: function(){},
        get: function() {
            return function(eventlist, callback, options) {
                let events = (Array.isArray(eventlist) ? eventlist : eventlist.split(','));

                events.forEach(event => {
                    this.addEventListener(event.trim(), callback, options);
                });

                return this;
            }.bind(this)
        }
    }
};
