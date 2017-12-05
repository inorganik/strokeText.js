/*

	strokeText.js
	by @inorganik

*/

var StrokeText = function(elem) {

	var self = this;
	self.version = '1.0';
	self.elem = (typeof elem === 'string') ? document.getElementById(elem) : elem;

	// helper functions
	function insertAfter(node, refNode) {
		if (node && refNode && refNode.parentNode) {
			refNode.parentNode.insertBefore(node, refNode.nextSibling);
		}
	}
	function remove(node) {
		if (node && node.parentNode) {
			node.parentNode.removeChild(node);
		}
	}
	function wrapText(context, text, x, y, maxWidth, lineHeight) {
		var words = text.split(' '),
			line = '';

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

	// removes stroke effect
	self.reset = function() {
		var container = document.getElementById(self.containId);
		if (container) {
			remove(self.elem);
			remove(self.canvasId);
			insertAfter(self.elem, container);
			self.elem.style = self.elemStyle;
			for (var style in self.inlineStyles) {
				self.elem.style[style] = self.inlineStyles[style];
			}
			remove(container);
		}
	}


	self.stroke = function(strokeWidth, strokeColor) {

		self.reset();

		// get precise line height
		var testText = self.elem.cloneNode(true);
		testText.textContent = 'X';
		insertAfter(testText, self.elem);
		var txtLineHeight = testText.offsetHeight;
		remove(testText);

		// extract text properties
		self.elemStyle = window.getComputedStyle(self.elem);
		self.inlineStyles = {};
		for (var i = 0, len = self.elem.style.length; i < len; i++) {
			var styleKey = self.elem.style[i];
			self.inlineStyles[styleKey] = self.elemStyle[styleKey];
		}
		var width = self.elem.offsetWidth,
			height = self.elem.offsetHeight,
			txt = self.elem.textContent.trim(),
			txtDisplay = self.elemStyle.getPropertyValue('display'),
			fontFamily = self.elemStyle.getPropertyValue('font-family'),
			fontSize = self.elemStyle.getPropertyValue('font-size'),
			fontWeight = self.elemStyle.getPropertyValue('font-weight'),
			fontStyle = self.elemStyle.getPropertyValue('font-style'),
			canvasFont = fontStyle +' '+ fontWeight +' '+ fontSize +' '+ fontFamily,
			txtAlign = self.elemStyle.getPropertyValue('text-align'),
			txtMarginTop = parseFloat(self.elemStyle.getPropertyValue('margin-top')),
			txtMarginBottom = parseFloat(self.elemStyle.getPropertyValue('margin-bottom')),
			edgePos = strokeWidth;

		// error check
		if (!txt) { return; }

		self.containId = 'outline-text-' + Math.random().toString().substring(2),
		self.canvasId = self.containId+'-canvas';
		
		// container elem
		var txtContain = document.createElement('div');
		txtContain.setAttribute('id', self.containId);
		txtContain.style.width = width +'px';
		txtContain.style.height = (height + txtMarginTop + txtMarginBottom) +'px';
		txtContain.style.display = txtDisplay;
		txtContain.style.position = 'relative';
		
		// canvas elem
		var txtCanvas = document.createElement('canvas');
		txtCanvas.setAttribute('id', self.canvasId);
		txtCanvas.setAttribute('width', width);
		txtCanvas.setAttribute('height', height + strokeWidth);
		txtCanvas.style.marginTop = txtMarginTop+'px';
		txtCanvas.style.userSelect = 'none';
		
		// insert container and contents
		insertAfter(txtContain, self.elem);
		remove(self.elem);
		self.elem.style.position = 'absolute';
		self.elem.style.top = 0;
		self.elem.style.width = '100%';
  		self.elem.style.padding = '0 '+ edgePos +'px';
		txtContain.appendChild(self.elem);
		txtContain.appendChild(txtCanvas);
		
		// canvas text
		var can = document.getElementById(self.canvasId),
			ctx = can.getContext('2d'),
			canvasEdgePos = 0,
			canvasTopPos = 0; 
		switch (txtAlign) {
			case 'center':
				canvasEdgePos = width / 2;
				self.elem.style.left = 0;
				break;
			case 'right': 
				canvasEdgePos = width - edgePos;
		 		self.elem.style.right = edgePos;
				break;
			default:
				canvasEdgePos += edgePos;
				self.elem.style.left = edgePos;
		}
		if (ctx) {
			ctx.font = canvasFont;
			ctx.textBaseline = 'top';
			ctx.textAlign = txtAlign;
			ctx.strokeStyle = strokeColor;
			ctx.lineWidth = strokeWidth * 2;
			wrapText(ctx, txt, canvasEdgePos, canvasTopPos, width, txtLineHeight);
		}
	};
}