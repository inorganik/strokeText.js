/*
	demo.js

	Only used for the demo, not a dependency
*/

var target, strokeText, textSource,
	tagline = 'Simple text stroking for the web.';

window.onload = function() {

	target = document.getElementById('myTargetElement');
	strokeText = new StrokeText(target);
	textSource = document.getElementById('textSource');
	textSource.value = tagline;
	document.getElementById('tagline').innerHTML = tagline;

	document.getElementById('version').innerHTML = 'v '+strokeText.version;

	createStrokeText();
}

function assignText() {
	strokeText.reset();
	var txt = textSource.value;
	target.innerHTML = txt;
}
function getWidthNum() {
	return parseFloat(document.getElementById('strokeWidth').value);
}
function getColor() {
	return document.getElementById('strokeColor').value;
}
function createStrokeText() {
	assignText();
	var strokeWidth = parseFloat(document.getElementById('strokeWidth').value);
	var strokeColor = document.getElementById('strokeColor').value;

	strokeText.stroke(strokeWidth, strokeColor);

	var code = 'var strokeText = new StrokeText(\'myTargetElement\');<br>';
	code += 'strokeText.stroke('+strokeWidth+', \''+strokeColor+'\');';
	updateCodeVisualizer(code);
}
function resetStrokeText() {
	strokeText.reset();
	var code = 'strokeText.reset();';
	updateCodeVisualizer(code);
}
function updateCodeVisualizer(code) {
	var visualizer = document.getElementById('codeVisualizer');
	visualizer.innerHTML = code;	
}
function resetDemo() {
	strokeText.reset();
	strokeText = new StrokeText(target);
}
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
function changeDecoration() {
	resetDemo();
	var decoration = document.getElementById('textDecoration').value;
	target.style.textDecoration = decoration;
	createStrokeText();
}
