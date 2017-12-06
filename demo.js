/*
	demo.js

	Only used for the demo, not a dependency
*/

var target, strokeText, textSource, resizeTimeout,
	tagline = 'Simple, pixel-perfect text stroking for the web.',
	code = '',
	demoOptions = {},
	fontSize = 2.3,
	fontSizeIncrement = 0.5;

window.onload = function() {

	target = document.getElementById('targetId');
	setFontSizeLabel();
	textSource = document.getElementById('textSource');
	textSource.value = tagline;
	document.getElementById('tagline').innerHTML = tagline;

	initStrokeText();
	executeStroke();
}
function objectSize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


function updateCodeVisualizer(code) {
	var visualizer = document.getElementById('codeVisualizer');
	visualizer.innerHTML = code;	
}
function initStrokeText() {
	strokeText = new StrokeText(target, demoOptions);
	document.getElementById('version').innerHTML = 'v '+strokeText.version;
	if (objectSize(demoOptions) > 0) {
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
function assignText() {
	strokeText.reset();
	var txt = textSource.value;
	target.innerHTML = txt;
}
function executeStroke() {
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
function initAndExecuteStrokeText() {
	// need delay to allow browser to render text style changes
	setTimeout(function() {
		initStrokeText();
		executeStroke();
	}, 100);
}
// responsive!
function handleViewportChange() {
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(function() {
		resetStrokeText();
		initAndExecuteStrokeText();
	}, 100);
}

window.onresize = handleViewportChange;
window.onorientationchange = handleViewportChange;
/*
	OPTIONS
*/
function changeLineJoin() {
	var lineJoin = document.getElementById('lineJoin').value;
	demoOptions.lineJoin = lineJoin;
	initAndExecuteStrokeText();
}
function changeLineCap() {
	var lineCap = document.getElementById('lineCap').value;
	demoOptions.lineCap = lineCap;
	initAndExecuteStrokeText();
}
function changeLineDashArray() {
	resetStrokeText();
	var line = document.getElementById('lineDashArrayLine').value;
	var gap = document.getElementById('lineDashArrayGap').value;
	demoOptions.lineDashArray = [line, gap];
	console.log('line dash array', demoOptions.lineDashArray);
	initAndExecuteStrokeText();
}
function changeMiterLimit() {
	var miterLimit = document.getElementById('miterLimit').value;
	demoOptions.miterLimit = parseFloat(miterLimit);
	initAndExecuteStrokeText();
}
/*
	TEXT STYLES
*/
function changeAlignment() {
	resetStrokeText();
	var align = document.getElementById('alignment').value;
	target.style.textAlign = align;
	executeStroke();
}
function changeFontStyle() {
	resetStrokeText();
	var fontStyle = document.getElementById('fontStyle').value;
	target.style.fontStyle = fontStyle;
	initAndExecuteStrokeText();
}
function changeFontWeight() {
	resetStrokeText();
	var weight = document.getElementById('fontWeight').value;
	target.style.fontWeight = parseInt(weight);
	initAndExecuteStrokeText();
}
function changeFont() {
	resetStrokeText();
	var font = document.getElementById('fontFamily').value;
	if (font === 'SF') {
		font = '-apple-system, BlinkMacSystemFont';
	}
	target.style.fontFamily = font;
	initAndExecuteStrokeText();
}
function setFontSizeLabel() {
	console.trace();
	var fontSizeString = fontSize + 'em';
	document.getElementById('fontSize').innerHTML = fontSizeString;
	return fontSizeString;
}
function setFontSize() {
	fontSize = Math.round(fontSize * 100) / 100;
	var fontSizeString = setFontSizeLabel();
	target.style.fontSize = fontSizeString;
	initAndExecuteStrokeText();
}
function increaseFontSize() {
	if (fontSize > 5) {
		return;
	}
	resetStrokeText();
	fontSize += fontSizeIncrement;
	setFontSize();
}
function decreaseFontSize() {
	var newSize = fontSize -= fontSizeIncrement;
	if (newSize > 0) {
		fontSize = newSize
	}
	resetStrokeText();
	setFontSize();
}
// TODO: support text decoration
function changeDecoration() {
	var decoration = document.getElementById('textDecoration').value;
	target.style.textDecoration = decoration;
}



