# inViewport

Know when an element is in the window viewport or a custom viewport.

[![Dependency Status](http://img.shields.io/david/vvo/in-viewport.svg?style=flat-square)](https://david-dm.org/vvo/in-viewport)
[![devDependency Status](http://img.shields.io/david/dev/vvo/in-viewport.svg?style=flat-square)](https://david-dm.org/vvo/in-viewport#info=devDependencies)

[![Selenium Test Status](https://saucelabs.com/browser-matrix/in-viewportvvo.svg)](https://saucelabs.com/u/in-viewportvvo)

## API

### Immediate result

```js
var elem = document.getElementById('myFancyDiv');

var isInViewport = inViewport(elem); // returns `true` or `false`

alert('myFancyDiv is ' + isInViewport ? 'visible' : 'not visible' + ' in the window');
```

### Using a callback

We watch for your element to enters the viewport and call your callback when it does.

```js
var elem = document.getElementById('myFancyDiv');

inViewport(elem, visible);

function visible(elt) {
  // elt === elem
  alert(elt.id + ' is visible in the window !');
}
```
The first callback argument is always the `element` that entered the viewport.

### A custom container

By default, we use the current window as the reference viewport.
But you can also specify another element as a reference viewport.

```js
var customContainer = document.getElementById('myFancyContainer');
var elem = document.getElementById('myFancyDiv');

inViewport(elem, { container: customContainer }, visible);

function visible() {
  alert('myfancyDiv is visible in the `customContainer` !');
}
```

### Specifying an offset

By default, when your element **precisely** enters the viewport,
you get a callback.

But maybe you want to know when your element is **soon-to-be-shown** in the viewport?

Use the `offset` param for that!

```js
var elem = document.getElementById('myFancyDiv');

inViewport(elem, { offset: 300 }, visible);

function visible() {
  alert('myfancyDiv is visible in the `customContainer` !');
}
```

When your element is near `300px` of the viewport, you get your callback / true result.

### Dynamic element creation (document.createElement)

If you are creating elements dynamically, be sure to call `inViewport` when the
element is in the DOM.

Otherwise it may fail on old browsers.

We check for newly visible elements on `scroll` or `resize`.

We use [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to listen for newly added DOM nodes that were previously
registered with in-viewport.

MutationObserver is not compatible with old browsers.

That is why, if you need old browsers full compatibility, you should call
in-viewport after inserting elements in the DOM.

## Use cases

* Images, iframes, widgets [lazyloader](/vvo/lazyload)
* infinite scroll
* loading widgets only when needed

## Quirksmode

Be sure to be in [standards-compliant mode](http://en.wikipedia.org/wiki/HTML5#Markup].

[Quirks mode](http://en.wikipedia.org/wiki/Quirks_mode) is not supported since most browsers
will report invalid values for window viewport.

## Testing

Launch the test server:

```shell
npm install -g zuul
zuul --local 8080 -- test/*.js
```

Browse to [http://localhost:8080/__zuul](http://localhost:8080/__zuul).

[Tests](test/) are written with [mocha](https://github.com/visionmedia/mocha).

## Building

[Install](http://code.google.com/p/closure-compiler/downloads/list) closure-compiler.

```bash
CLOSURE_PATH=~/path/to/closure-compiler/ grunt
```

You get the [build/in-viewport.min.js](build/in-viewport.min.js) file.

## License

Copyright (c) 2013 Vincent Voyer

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.