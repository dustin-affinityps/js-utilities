
import ApObject from './ap-objects'
import windows from './windows'
import elements from './elements'
import strings from './strings'
import numbers from './numbers'

globalThis.ApObject = ApObject

Object.defineProperties(Window.prototype, windows)
Object.defineProperties(HTMLDocument.prototype, elements)
Object.defineProperties(Element.prototype, elements)
Object.defineProperties(String.prototype, strings)
Object.defineProperties(Number.prototype, numbers)
