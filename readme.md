# inViewport

Get a callback when an element enters the viewport (body) or a custom viewport.

If your element was close to the viewport for more than 12ms then we decide it's visible
in the viewport.

It means, if you scroll very fast on webpages and registered for some inViewport callbacks,
you only get the relevant ones.

Use cases:
* lazyloader (images, iframes)
* infinite scroll
* loading widgets only when needed
* your ideas

## Simple usage

```js
var elem = document.getElementById('myfancyDiv')

inViewport(elem, visible);

function visible() {
  alert('myfancyDiv is visible !');
}
```

`visible` will only get called when the element is visible in the viewport.

We are watching the `scroll` event on `document.body` to know when your element is visible.

## Advanced usage

The default reference container (`document.body`) can be changed to match your needs.
If you have a div with a scrollbar, you can ask for `inViewport` on his children.

```js
var nested = document.getElementById('myNestedDiv');
var options = {
  container: document.getElementById('container'),
  offset: 100
}

inViewport(nested, options, visible);

function visible() {
  alert('myNestedDiv is visible !');
}
```

`offset` is a length in pixels.

If the element is near `offset` pixels of the viewport then you get
your callback.

## Testing

Tested on IE8/9 and modern browsers, using [mocha](https://github.com/visionmedia/mocha).

Open `test/test.html` or use a headless browser:

```bash
npm install -g mocha-phantomjs phantomjs
npm test
```

## Hacking

You need package.json dependencies and grunt.

```bash
npm install
npm install -g grunt-cli
grunt watch
```

Start an http-server in root dir:

```bash
npm install http-server -g
http-server
```

Open `test/test.html`, code, test, GOTO code.

## Building

```bash
CLOSURE_PATH="~/path/to/compiler.jar" grunt
```

You get a `build/in-viewport.min.js` file.

`compiler.jar` is [google closure compiler](https://code.google.com/p/closure-compiler/downloads/list) .jar location.

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