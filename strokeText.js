/*

	strokeText.js
	by @inorganik
	demo: https://jsfiddle.net/fpnx33z2/

*/

var strokeText = function(elem, strokeColor, strokeWidth) {

	elem = (typeof elem === 'string') ? document.getElementById(elem) : elem

	// helper functions
	function insertAfter(node, refNode) {
		refNode.parentNode.insertBefore(node, refNode.nextSibling);
	}
	function remove(node) {
		node.parentNode.removeChild(node);
	}
	function wrapText(context, text, x, y, maxWidth, lineHeight) {
		var words = text.split(' ');
		var line = '';

		for (var n = 0, len = words.length; n < len; n++) {
			var testLine = line;
			if (n > 0) {
				testLine += ' '+ words[n];
			} else {
				testLine += words[n];
			}
			var metrics = context.measureText(testLine);
			if (metrics.width > maxWidth && n > 0) {
				context.strokeText(line, x, y);
				line = words[n];
				y += lineHeight;
			} else {
				line = testLine;
			}
		}
		context.strokeText(line, x, y);
	}

	// get precise line height
	var testText = elem.cloneNode(true);
	testText.textContent = 'X';
	insertAfter(testText, elem);
	var txtLineHeight = testText.offsetHeight;
	remove(testText);

	// extract text properties
	var style = window.getComputedStyle(elem),
		width = elem.offsetWidth,
		height = elem.offsetHeight,
		txt = elem.textContent.trim(),
		txtDisplay = style.getPropertyValue('display'),
		fontFamily = style.getPropertyValue('font-family'),
		fontSize = style.getPropertyValue('font-size'),
		fontWeight = style.getPropertyValue('font-weight'),
		canvasFont = fontWeight +' '+ fontSize +' '+ fontFamily,
		txtAlign = style.getPropertyValue('text-align'),
		txtMarginTop = parseFloat(style.getPropertyValue('margin-top')),
		txtMarginBottom = parseFloat(style.getPropertyValue('margin-bottom')),
		containId = 'outline-text-' + Math.random().toString().substring(2),
		canvasId = containId+'-canvas',
		edgePos = strokeWidth;
	
	// container elem
	var txtContain = document.createElement('div');
	txtContain.setAttribute('id', containId);
	txtContain.style.width = width +'px';
	txtContain.style.height = (height + txtMarginTop + txtMarginBottom) +'px';
	txtContain.style.display = txtDisplay;
	txtContain.style.position = 'relative';
	
	// canvas elem
	var txtCanvas = document.createElement('canvas');
	txtCanvas.setAttribute('id', canvasId);
	txtCanvas.setAttribute('width', width);
	txtCanvas.setAttribute('height', height + strokeWidth);
	txtCanvas.style.marginTop = txtMarginTop+'px';
	txtCanvas.style.userSelect = 'none';
	
	// insert container and contents
	insertAfter(txtContain, elem);
	remove(elem);
	elem.style.position = 'absolute';
	elem.style.top = 0;
	elem.style.width = '100%';
	txtContain.appendChild(elem);
	txtContain.appendChild(txtCanvas);
	
	// canvas text
	var can = document.getElementById(canvasId),
		ctx = can.getContext('2d'),
		canvasEdgePos = 0,
		canvasTopPos = 0; 
	switch (txtAlign) {
		case 'center':
			canvasEdgePos = width / 2;
			elem.style.left = 0;
			break;
		case 'right': 
			canvasEdgePos = width - edgePos;
	 		elem.style.right = edgePos;
			break;
		default:
			canvasEdgePos += edgePos;
			elem.style.left = edgePos;
	}
	if (ctx) {
		ctx.font = canvasFont;
		ctx.textBaseline = 'top';
		ctx.textAlign = txtAlign;
		ctx.strokeStyle = strokeColor;
		ctx.lineWidth = strokeWidth * 2;
		wrapText(ctx, txt, canvasEdgePos, canvasTopPos, width, txtLineHeight);
	} 
}