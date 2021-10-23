
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

    // shorthand wrapper for array of elements selector returns array rather than NodeList
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

    // returns sibling elements
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

    // test if this element matches selector, or is a child of selector
    isOrChildOf: {
        set: function(){},
        get: function() {
            return function(selector) {
                return this.parentOf(selector) || (this == document.$_(selector));
            }.bind(this)
        }
    },

    // tests if Element has class allows array of classes returns matching classes
    hasClass: {
        set: function(){},
        get: function() {
            return function(...selectors) {
                return selectors.filter(s => this.classList.contains(s)).length == selectors.length;
            }.bind(this)
        }
    },

    // shorthand for Element.classList.add() allows array of classes
    addClass: {
        set: function(){},
        get: function() { 
            return function(...selectors) {
                selectors.forEach(s => this.classList.add(s));

                return this;
            }.bind(this)
        }
    },

    // shorthand for Element.classList.remove() allows array of classes
    removeClass: {
        set: function(){},
        get: function() {
            return function(...selectors) {
                selectors.forEach(s => this.classList.remove(s));

                return this;
            }.bind(this)
        }
    },

    // shorthand for Element.classList.toggle() allows array of classes
    toggleClass: {
        set: function(){},
        get: function() {
            return function(...selectors) {
                selectors.forEach(s => this.classList.toggle(s));

                return this;
            }.bind(this)
        }
    },

    // swaps classes if removed class exists, or forced
    swapClass: {
        set: function(){},
        get: function() {
            return function(classToAdd, classToRemove, force = false) {
                if ( force || this.hasClass(classToRemove) ) {
                    this.addClass(classToAdd).removeClass(classToRemove);
                }

                return this;
            }.bind(this)
        }
    },

    // shorthand for Element.setAttribute
    setAttr: {
        set: function(){},
        get: function() {
            return function(attribute, value = null) {
                this.setAttribute(attribute, value);

                return this;
            }.bind(this)
        }
    },

    // shorthand for Element.setAttribute, allowing list of attributes. Defaults to setAttr if args not an Object
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

    // shorthand for Element.removeAttribute
    removeAttr: {
        set: function(){},
        get: function() {
            return function(attribute) {
                this.removeAttribute(attribute);

                return this;
            }.bind(this)
        }
    },

    // shorthand for Element.removeAttribute, allowing list of attributes. Defaults to setAttr if args not an Object
    removeAttrs: {
        set: function(){},
        get: function() {
            return function(...attributes) {
                attributes.flat().forEach(attribute => this.removeAttribute(attribute));

                return this;
            }.bind(this)
        }
    },

    // remove all event listeners from element, while optionally preserving child events
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

    // shorthand for Element.addEventListener allows array of event handlers to be specified in single call.
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
