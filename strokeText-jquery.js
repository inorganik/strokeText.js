(function($) {
 
    $.fn.strokeText = function(strokeWidth, strokeColor) {

        if (typeof StrokeText !== 'function') {
        	console.error('strokeText.js is a required dependency of strokeText-jquery.js.');
        	return;
        }

        this.each(function(i, elem) {
        	var strokeText = new StrokeText(elem);
        	strokeText.stroke(strokeWidth, strokeColor);
        });

        return this;
 
    };
 
}(jQuery));