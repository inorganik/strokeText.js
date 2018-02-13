/*

strokeText.js
by @inorganik

*/

var StrokeText = function(elem, options) {

	var self = this;
	self.version = '0.12.0';
	self.elem = (typeof elem === 'string') ? document.getElementById(elem) : elem;

	// default options
	self.options = {
		lineCap: 'round',
		lineJoin: 'round',
		miterLimit: 10,
		lineDashArray: [0, 0],
		debug: false,
		disableForFirefox: false
	}
	// extend default options with passed options object
	if (options && typeof options === 'object') {
		for (var key in self.options) {
			if (options.hasOwnProperty(key) && options[key] !== null) {
				self.options[key] = options[key];
			}
		}
	}

	// helper functions
	function insertAfterNode(node, refNode) {
		if (node && refNode && refNode.parentNode) {
			refNode.parentNode.insertBefore(node, refNode.nextSibling);
		}
	}
	function removeNode(node) {
		if (node && node.parentNode) {
			node.parentNode.removeChild(node);
		}
	}
	function logProp(prop) {
		if (self[prop]) {
			console.info('┃ '+prop+':', self[prop]);
		}
	}
	function getLineHeight(elem) {
		var testText = elem.cloneNode(true);
		testText.textContent = 'fXg';
		insertAfterNode(testText, elem);
		var lineHeight = testText.offsetHeight;
		removeNode(testText);
		return lineHeight;
	}

	// canvas doesn't wrap text
	function wrapText(context, text, x, y, maxWidth, lineHeight) {
		var words = text.split(' '),
			line = '',
			lastSegment = '';
		function measureAndProcess(segment, i) {
			var testLine = line;
			if (i > 0 && lastSegment.substr(-1) !== '-') {
				testLine += ' '+ segment;
			}
			else {
				testLine += segment;
			}
			var metrics = context.measureText(testLine);
			if (metrics.width > maxWidth && i > 0) {
				context.strokeText(line, x, y);
				line = segment;
				y += lineHeight;
			}
			else {
				line = testLine;
			}
			lastSegment = segment
		}
		words.forEach(function(word, i) {
			if (word.indexOf('-') > -1) {
				var nextWord = word;
				while (nextWord.indexOf('-') > -1) {
					var hyphen = nextWord.indexOf('-') + 1,
						segment = nextWord.substring(0, hyphen);
					nextWord = nextWord.substring(hyphen);
					measureAndProcess(segment, i);
				}
				measureAndProcess(nextWord, i);
			}
			else {
				measureAndProcess(word, i);
			}
		});
		context.strokeText(line, x, y);
	}

	// removes stroke effect
	self.reset = function() {
		var container = document.getElementById(self.containId);
		if (container) {
			removeNode(self.elem);
			removeNode(self.canvasId);
			insertAfterNode(self.elem, container);
			self.elem.style = self.elemStyle;
			for (var style in self.inlineStyles) {
				self.elem.style[style] = self.inlineStyles[style];
			}
			removeNode(container);
		}
	}

	// main functionality
	self.stroke = function(strokeWidth, strokeColor) {

		if (self.options.disableForFirefox && (/firefox/i).test(navigator.userAgent)) {
			return;
		}
		self.reset();

		// ensure valid params
		strokeWidth = Math.abs(strokeWidth);
		strokeColor = (typeof strokeColor === 'string') ? strokeColor : 'red';

		// extract elem styles
		self.elemStyle = window.getComputedStyle(self.elem);
		self.inlineStyles = {};
		for (var i = 0, len = self.elem.style.length; i < len; i++) {
			var styleKey = self.elem.style[i];
			self.inlineStyles[styleKey] = self.elemStyle[styleKey];
		}

		self.txt = self.elem.textContent.trim();		
		if (!self.txt) { return; }

		// adjust elem styles before measurements
		var fontSize = self.elemStyle.getPropertyValue('font-size'),
			fontSizeFloat = parseFloat(fontSize);
		self.elem.style.width = '100%';
		self.elem.style.boxSizing = 'border-box';
		self.elem.style.padding = '0 '+ strokeWidth + 'px';
			
		// measurements
		var width = self.elem.offsetWidth,
			height = self.elem.offsetHeight,
			txtDisplay = self.elemStyle.getPropertyValue('display'),
			fontFamily = self.elemStyle.getPropertyValue('font-family'),
			fontWeight = self.elemStyle.getPropertyValue('font-weight'),
			fontStyle = self.elemStyle.getPropertyValue('font-style'),
			txtLineHeight = parseFloat(self.elemStyle.getPropertyValue('line-height')),
			txtAlign = self.elemStyle.getPropertyValue('text-align'),
			txtMarginTop = parseFloat(self.elemStyle.getPropertyValue('margin-top')),
			txtMarginBottom = parseFloat(self.elemStyle.getPropertyValue('margin-bottom')),
			edgePos = strokeWidth;
		if (isNaN(txtLineHeight)) {
			txtLineHeight = self.getLineHeight(self.elem);
		}
		self.txtLineHeight = txtLineHeight;
		self.canvasFont = fontStyle + ' ' + fontWeight + ' ' + fontSize + '/' + txtLineHeight + 'px ' + fontFamily;
		self.containId = 'strokeText-' + Math.random().toString().substring(2),
		self.canvasId = self.containId+'-canvas';
		
		// container elem
		var container = document.createElement('div');
		container.setAttribute('id', self.containId);
		container.style.width = width +'px';
		container.style.height = (height + txtMarginTop + txtMarginBottom + (strokeWidth * 2)) +'px';
		container.style.display = txtDisplay;
		container.style.position = 'relative';
		
		// canvas elem
		var canvas = document.createElement('canvas');
		canvas.setAttribute('id', self.canvasId);
		canvas.setAttribute('width', width);
		canvas.setAttribute('height', height + (strokeWidth * 4));
		canvas.style.marginTop = txtMarginTop+'px';
		canvas.style.userSelect = 'none';
		if (self.options.debug) canvas.style.border = '1px red solid';
		
		// insert container and contents
		insertAfterNode(container, self.elem);
		removeNode(self.elem);
		self.elem.style.position = 'absolute';
		var elemTopPos = strokeWidth + 'px';
		self.elem.style.top = elemTopPos;
		if (self.options.debug) self.elem.style.border = '1px yellow solid';
		container.appendChild(self.elem);
		container.appendChild(canvas);
		
		// rendering stroked text
		var ctx = canvas.getContext('2d'),
			canvasEdgePos = 0,
			canvasMaxWidth = width - (edgePos * 2);
		self.canvasTopPos = (txtLineHeight / 2) + strokeWidth;

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
			ctx.font = self.canvasFont;
			ctx.textBaseline = 'middle';
			ctx.textAlign = txtAlign;
			ctx.strokeStyle = strokeColor;
			ctx.lineJoin = self.options.lineJoin;
			ctx.lineCap = self.options.lineCap;
			ctx.setLineDash(self.options.lineDashArray);
			ctx.miterLimit = self.options.miterLimit;
			ctx.lineWidth = strokeWidth * 2;
			
			if (self.options.debug) {
				console.info('┎--- ', self.containId);
				console.info('┃ "'+self.txt+'"');
				logProp('canvasFont');
				logProp('canvasTopPos');
				logProp('txtLineHeight');
				console.info('┖---');
			}

			wrapText(ctx, self.txt, canvasEdgePos, self.canvasTopPos, canvasMaxWidth, txtLineHeight);
		}
	};
}