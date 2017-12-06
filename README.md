# strokeText.js
Simple text stroking for the web

- Strokes do not overlap your text like they do with `-webkit-text-stroke`
- Supports nearly all browsers except IE8 and below
- Selectable text
- Dependency-free

## [Try the demo](https://inorganik.github.io/strokeText.js/)

strokeText.js uses the canvas API to draw stroked text in a container with your text element positioned absolutely on top of it, allowing your text element to remain intact and selectable. 

### Usage

Simply create an instance, which accepts an ID string or reference to your text element,
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
Calling `stroke()` calls `reset()` before it does anything, so you can use `stroke()` to update the stroke at anytime after initialization.

#### Options
You can optionally pass options to the initializer:
```js
// defaults shown
var options = {
	lineCap: 'round', // ['round', 'butt', 'square']
	lineJoin: 'round', // ['bevel', 'round', 'miter']
	miterLimit: 10, // control spikeyness
	lineDashArray: [0, 0] // for dashed lines: [line, gap]
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

- Does not support `text-decoration`, e.g. line-through or underline.
- Very thick strokes on very light weighted fonts can leave cutouts on circle shapes like periods.
- Emojis don't get stroked 😬 due to the limitations of canvas.

Fiddle: https://jsfiddle.net/4o6yd73n/