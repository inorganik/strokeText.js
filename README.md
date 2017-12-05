# strokeText.js
Simple text stroking for the web

- Strokes do not overlap your text like they do with `-webkit-text-stroke`
- Supports nearly all browsers except IE8 and below
- Selectable text
- No dependencies

## [Try the demo](http://inorganik.github.io/strokeText.js)

strokeText.js uses the canvas API to draw stroked text in a container with your text element positioned absolutely on top of it, allowing text to remain intact and selectable. 

### Usage

Simply create an instance, which accepts a reference to your text element,
```js
var strokeText = new StrokeText('myTargetElement');
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

### Known issues

- Does not support `text-decoration`, e.g. line-through or underline.
- Very thick strokes on very light weighted fonts can leave cutouts on circle shapes like periods.
- Un-mitered corners can occur on certain fonts (Arial).