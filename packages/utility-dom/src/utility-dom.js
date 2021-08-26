
document.$_ = globalThis.Element.prototype.$_ = function(selector) {
    let el = this.nodeType ? this : document;

    return (typeof selector == 'string' ? el.querySelector(selector) : selector);
};

// wrapper for array of elements selector
document.$$_ = globalThis.Element.prototype.$$_ = function(selector) {
    let el = this.nodeType ? this : document;
    let elemList = (typeof selector == 'string' ? el.querySelectorAll(selector) : [selector]);

    return [...elemList];
};

// get sibling element of selector
globalThis.Element.prototype.siblingOf = function(selector) {
    if (! this.nodeType ) {
        return false;
    }

    let sibling = this.parentNode.$_(selector);

    return sibling;
};

// return parent of this element matching selector if present
globalThis.Element.prototype.parentOf = function(selector) {
    let found = false;
    let parent = this.parentNode;

    while(parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') {
        if ( parent.matches(selector) ) {
            found = true;
            break;
        }

        parent = parent.parentNode;
    }

    return (found ? parent : null);
};

// test if this element is a child of target
globalThis.Element.prototype.childOf = function(target) {
    let isChildOf = false;
    let parent = this.parentNode;

    while(parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') {
        if ( parent == target ) {
            isChildOf = true;
            break;
        }

        parent = parent.parentNode;
    }
    return isChildOf;
};

globalThis.Element.prototype.isOrChildOf = function(selector) {
    let isGood = false;

    if ( this.parentOf(selector) || this == document.$_(selector) ) {
        isGood = true;
    }

    return isGood;
};

// added to allow method chaining
globalThis.Element.prototype.setAttr = function(attr, value) {
    this.setAttribute(attr, value);

    return this;
};
globalThis.Element.prototype.setAttrs = function(attrs) {
    Object.keys(attrs).forEach(a => {
        this.setAttr(a, attrs[a]);
    });

    return this;
};
globalThis.Element.prototype.removeAttr = function(attr) {
    this.removeAttribute(attr);

    return this;
};

globalThis.Element.prototype.addClass = function(...selectors) {
    selectors.forEach(s => this.classList.add(s));

    return this;
};
globalThis.Element.prototype.removeClass = function(...selectors) {
    selectors.forEach(s => this.classList.remove(s));

    return this;
};
globalThis.Element.prototype.toggleClass = function(...selectors) {
    selectors.forEach(s => this.classList.toggle(s));

    return this;
};
globalThis.Element.prototype.swapClass = function(aClass, rClass) {
    this.addClass(aClass).removeClass(rClass);

    return this;
};
globalThis.Element.prototype.hasClass = function(...selectors) {
    let found = false;

    selectors.forEach(s => {
        if (! found && this.classList.contains(s) ) {
            found = true;
        }
    });

    return found;
};

// remove all event listeners from element, while optionally maintaining child events
globalThis.Element.prototype.removeListeners = function(preserveChildren) {
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
};
