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

## Tests

Tested on IE8/9 and modern browsers.

Open test/test.html or use a headless browser:

```js
cd in-viewport
npm install -g mocha-phantomjs phantomjs
mocha-phantomjs test/test.html
```

## Minifying

Can be minified using google closure compiler advanced mode.