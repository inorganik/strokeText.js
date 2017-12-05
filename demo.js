/*
	demo.js

	Only used for the demo, not a dependency
*/

var target, strokeText, textSource,
	tagline = 'Simple, pixel-perfect text stroking for the web.',
	code = '',
	demoOptions = {};

window.onload = function() {

	target = document.getElementById('targetId');
	strokeText = new StrokeText(target);
	textSource = document.getElementById('textSource');
	textSource.value = tagline;
	document.getElementById('tagline').innerHTML = tagline;

	document.getElementById('version').innerHTML = 'v '+strokeText.version;

	resetDemo();
	createStrokeText();
}
function objectSize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function assignText() {
	strokeText.reset();
	var txt = textSource.value;
	target.innerHTML = txt;
}
function createStrokeText() {
	assignText();
	var strokeWidth = parseFloat(document.getElementById('strokeWidth').value);
	var strokeColor = document.getElementById('strokeColor').value;

	strokeText.stroke(strokeWidth, strokeColor);

	code += 'strokeText.stroke('+strokeWidth+', \''+strokeColor+'\');<br>';
	updateCodeVisualizer(code);
}
function resetStrokeText() {
	strokeText.reset();
	code += 'strokeText.reset();<br>';
	updateCodeVisualizer(code);
}
function updateCodeVisualizer(code) {
	var visualizer = document.getElementById('codeVisualizer');
	visualizer.innerHTML = code;	
}
function resetDemo() {
	strokeText.reset();
	strokeText = new StrokeText(target, demoOptions);
	if (objectSize(demoOptions) > 0) {
		console.log(demoOptions);
		code = 'var options = {<br>';
		for (var key in demoOptions) {
			if (key === 'lineDashArray') {
				var lineDashArray = demoOptions[key];
				code += '&emsp;&emsp;'+key+': ['+lineDashArray[0]+', '+lineDashArray[1]+'],<br>'
			}
			else if (key === 'miterLimit') {
				code += '&emsp;&emsp;'+key+': '+demoOptions[key]+',<br>'
			}
			else {
				code += '&emsp;&emsp;'+key+': \''+demoOptions[key]+'\',<br>'
			}
		}
		code += '};<br>';
		code += 'var strokeText = new StrokeText(\'targetId\', options);<br>';
	} else {
		code = 'var strokeText = new StrokeText(\'targetId\');<br>';
	}
}
/*
	TEXT STYLES
*/
function changeFont() {
	resetDemo();
	var font = document.getElementById('fontFamily').value;
	if (font === 'SF') {
		font = '-apple-system, BlinkMacSystemFont';
	}
	target.style.fontFamily = font;
	createStrokeText();
}
function changeFontWeight() {
	resetDemo();
	var weight = document.getElementById('fontWeight').value;
	target.style.fontWeight = parseInt(weight);
	createStrokeText();
}
function changeFontStyle() {
	resetDemo();
	var fontStyle = document.getElementById('fontStyle').value;
	target.style.fontStyle = fontStyle;
	createStrokeText();
}
// TODO: support text decoration
function changeDecoration() {
	resetDemo();
	var decoration = document.getElementById('textDecoration').value;
	target.style.textDecoration = decoration;
	createStrokeText();
}
function changeAlignment() {
	resetDemo();
	var align = document.getElementById('alignment').value;
	target.style.textAlign = align;
	createStrokeText();
}
/*
	OPTIONS
*/
function changeLineJoin() {
	var lineJoin = document.getElementById('lineJoin').value;
	demoOptions.lineJoin = lineJoin;
	resetDemo();
	createStrokeText();
}
function changeLineCap() {
	var lineCap = document.getElementById('lineCap').value;
	demoOptions.lineCap = lineCap;
	resetDemo();
	createStrokeText();
}
function changeLineDashArray() {
	var line = document.getElementById('lineDashArrayLine').value;
	var gap = document.getElementById('lineDashArrayGap').value;
	demoOptions.lineDashArray = [line, gap];
	console.log('line dash array', demoOptions.lineDashArray);
	resetDemo();
	createStrokeText();
}
function changeMiterLimit() {
	var miterLimit = document.getElementById('miterLimit').value;
	demoOptions.miterLimit = parseFloat(miterLimit);
	resetDemo();
	createStrokeText();
}



