# strokeText.js
Simple, pixel-perfect text stroking for the web. StrokeText.js adds strokes or "outlines" to live text. Doing this with CSS is scantly and poorly supported, so javascript to the rescue!

- Strokes do not overlap your text like they do with `-webkit-text-stroke`
- Supports nearly all browsers except IE8 and below
- Selectable text
- Dependency-free

## [Live demo](https://inorganik.github.io/strokeText.js/)

strokeText.js uses the canvas API to draw stroked text in a container with your text element positioned absolutely on top of it, allowing your text element to remain intact and selectable. 

### Usage

Install via npm with the package name `stroketext.js` or simply include `strokeText.min.js` in your project.

For each text element that you desire to stroke, create an instance, which accepts an ID string or reference to your text element:
```js
var strokeText = new StrokeText('targetId');
```
Then call `stroke()`, which takes 2 args:
- stroke width
- stroke color

```js
strokeText.stroke(3, 'white'); 
```
You can also call `reset()` to remove the stroke.
```js
strokeText.reset();
```
Calling `stroke()` calls `reset()` before it does anything, so you can use `stroke()` to update the stroke at any time after initialization.

#### Options
You can optionally pass options (totally optional) to the initializer:
```js
// defaults shown
var options = {
	lineCap: 'round', // ['round', 'butt', 'square']
	lineJoin: 'round', // ['bevel', 'round', 'miter']
	miterLimit: 10, // control spikeyness
	lineDashArray: [0, 0], // for dashed lines: [line, gap]
	debug: false // examine measurements and properties used
}
var strokeText = new StrokeText('targetId', options);
```
#### Making strokeText.js responsive
Respond to viewport change events:
```js
var resizeTimeout;
function handleViewportChange() {
	// timeout to debounce
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(function() {
		// reset and re-init so strokeText.js can re-evaluate container size
		strokeText.reset(); 
		strokeText = new StrokeText('targetId');
		strokeText.stroke(3, 'white'); 
	}, 100);
}
window.onresize = handleViewportChange;
window.onorientationchange = handleViewportChange;
```

### Known issues

- Does not support `text-decoration`, e.g. strike-through or underline.
- Very thick strokes on certain fonts can leave cutouts on circle shapes like periods or dotted characters.
- Emojis don't get stroked 😬 due to the limitations of canvas.

### Contributing

- Do your work on `strokeText.js`, please follow existing formatting conventions
- In terminal, `cd` to the `strokeText.js` directory
- Run `npm install` 
- Run `gulp` to create the minified strokeText module in the dist folder

Fiddle: https://jsfiddle.net/p8vyyskd/