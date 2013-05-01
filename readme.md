# hasScrolled

Know when an element has scrolled into view.

Use cases:
* lazyloader
* infinite scroll
* loading widgets only when needed
* deferring iframes
* your ideas

## Simple usage

```js
var elem = document.getElementById('myfancyDiv')

hasScrolled(elem, scrolled);

function scrolled(result) {
  if (result) {
    alert('It has scrolled !');
  } else {
    alert('No, not yet !');
  }
}
```

`scrolled` will get called immediately with the result (true/false).
If it was hidden, it will be called again as soon as your element will scroll into view.

We are watching the `scroll` event on document.body to know when your element is visible.

## Advanced usage

The default reference container (document.body) can be changed to match your needs.
If you have a div with a scrollbar, you can ask for hasScrolled on his children.

```js
var nested = document.getElementById('myNestedDiv');
var options = {
  container: document.getElementById('container'),
  offset: 100
}

hasScrolled(nested, options, scrolled);

function scrolled(result) {
  if (result) {
    alert('It has scrolled !');
  } else {
    alert('No, not yet !');
  }
}
```

## Tests

Tested on IE8/9 and modern browsers.

Open test/test.html or use a headless browser:

```js
cd has-scrolled
npm install -g mocha-phantomjs phantomjs
mocha-phantomjs test/test.html
```

## Minifying

Can be minified using google closure compiler advanced mode.