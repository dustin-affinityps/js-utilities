
export default function(className) {
    return new Proxy(className.prototype.constructor, {
        instance: null,

        construct: (target, args) => {
            if (! this.instance ) {
                this.instance = new target(...args)
            }

            return this.instance
        }
    })
}
