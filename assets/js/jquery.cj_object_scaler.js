/*globals jQuery */
/*!
 * jQuery imagesLoaded plugin v1.0.4
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */
(function ($) {
	"use strict";
	// $('#my-container').imagesLoaded(myFunction)
	// or
	// $('img').imagesLoaded(myFunction)
	// execute a callback when all images have loaded.
	// needed because .load() doesn't work on cached images
	// callback function gets image collection as argument
	//  `this` is the container
	$.fn.imagesLoaded = function (callback) {
		var $this = this,
			$images = $this.find('img').add($this.filter('img')),
			len = $images.length,
			blank = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
		function triggerCallback() {
			callback.call($this, $images);
		}
		function imgLoaded(event) {
			if (--len <= 0 && event.target.src !== blank) {
				setTimeout(triggerCallback);
				$images.unbind('load error', imgLoaded);
			}
		}
		if (!len) {
			triggerCallback();
		}
		$images.bind('load error', imgLoaded).each(function () {
			// cached images don't fire load sometimes, so we reset src.
			if (this.complete || this.complete === undefined) {
				var src = this.src;
				// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
				// data uri bypasses webkit log warning (thx doug jones)
				this.src = blank;
				this.src = src;
			}
		});
		return $this;
	};
}(jQuery));


/*
 * CJ Object Scaler jQuery Plugin
 *
 * Copyright (c) 2011 Creative Juices Bo. Co.
 * Written by: Doug Jones (www.cjboco.com)
 * Licensed under the MIT.
 *
 * A JQuery Plug-In to Scale Objects to Fit or Fill Within Another Object
 *
 * Version History
 * --------------------------------------------------------------------------------
 * 3.0 - 11/04/11
 *		Rewrote plugin structure.
 *		Updated the imagesLoaded plug-in. Previous
 *		version was causing a page request by
 *		using this.src = "#". (Plus other updates)
 *		Added class name scaling
 * 2.1.2 - 06/10/10
 *		It was recommended to add a callback function,
 *		which is called once the scaling is complete
 *		*Credit goes to Chris Bellew <Chris.Bellew@luxus.fi>
 *		for this. Thanks Chris!
 * 2.1.1 - 05/14/10
 *		The border width check was failing in IE
 *		Big thanks to Funger for discovering this bug.
 * 2.1 - 05/13/10
 *		Added a new image onLoad check.
 * 2.0.1 - 10/14/09
 *		Fixed a bug where the scaling function
 *		wasn't being triggered, do to the
 *		image already being loaded.
 *		(Discovered by Ben Visser)
 * 2.0	- 09/22/09
 *		Coverted it to a jQuery plug-in
 * 1.0	09/10/08
 *		Initial Release
 *
 */
(function ($) {
	"use strict";

	$.cjObjectScaler = function ($obj, settings) {

		var o = {
				// user defined options
				method: 'fit',
				fade: 0,
				width: null,
				height: null,
				destElem: null,
				callback: null
			};

		// initializes our slideshow
		function _scale() {

			var destW, destH, ratioX, ratioY, scale, newWidth, newHeight, cssW, cssH;

			if ((o.destElem && o.destElem.length > 0) || (o.width && o.height)) {

				destW = o.width || o.destElem.width();
				destH = o.width || o.destElem.height();

				// calculate the CSS styling info, so our offest matches
				cssW = parseInt($obj.css('borderLeftWidth'), 10) + parseInt($obj.css('borderRightWidth'), 10) +
					parseInt($obj.css('marginLeft'), 10) + parseInt($obj.css('marginRight'), 10) +
					parseInt($obj.css('paddingLeft'), 10) + parseInt($obj.css('paddingRight'), 10);
				cssH = parseInt($obj.css('borderTopWidth'), 10) + parseInt($obj.css('borderBottomWidth'), 10) +
					parseInt($obj.css('marginTop'), 10) + parseInt($obj.css('marginBottom'), 10) +
					parseInt($obj.css('paddingTop'), 10) + parseInt($obj.css('paddingBottom'), 10);

				// check for valid border values. (IE7- takes in account border size, etc. @todo - possible browser check to fix?)
				cssW = isNaN(cssW) ? 0 : cssW;
				cssH = isNaN(cssH) ? 0 : cssH;

				// calculate scale ratios
				ratioX = destW / $obj.width();
				ratioY = destH / $obj.height();

				// Determine which algorithm to use
				if (o.method === 'fit') {
					scale = ratioX < ratioY ? ratioX : ratioY;
				} else if (o.method === 'fill') {
					scale = ratioX > ratioY ? ratioX : ratioY;
				} else {
					scale = 1;
				}

				// calculate our new image dimensions
				newWidth = Math.ceil($obj.width() * scale, 10) - cssW;
				newHeight = Math.ceil($obj.height() * scale, 10) - cssH;

				// Set new dimensions & offset
				$obj.css({
					'width': newWidth + 'px',
					'height': newHeight + 'px',
					'position': 'absolute',
					'top': (parseInt((destH - newHeight) / 2, 10) - parseInt(cssH / 2, 10)) + 'px',
					'left': (parseInt((destW - newWidth) / 2, 10) - parseInt(cssW / 2, 10)) + 'px'
				}).attr({
					'width': newWidth,
					'height': newHeight
				});

				// do our fancy fade in, if user supplied a fade amount
				if (o.fade > 0) {
					$obj.fadeIn(o.fade);
				}

				// did the user supply a callback?
				if ($.isFunction(o.callback)) {
					o.callback.call($obj);
				}

				return true;

			} else {

				return false;

			}
		}

		function init() {

			var errmsg = 'Problems initializing cjObjectScaler plug-in.';

			if ($obj[0].nodeName === 'IMG') {

				// wait until the image is loaded before scaling
				$obj.hide().imagesLoaded(function () {
					if (!_scale()) {
						$.error(errmsg);
					}
				});

			} else {

				// scale immediately
				if (!_scale()) {
					$.error(errmsg);
				}
			}
		}


		if (settings && typeof settings === 'object') {

			// extend our options and store locally
			o = $.extend(o, settings);
			if (!o.destElem) {
				o.destElem = $obj.parent();
			}
			if ($obj.hasClass('cj_image_scale_fill')) {
				o.method = 'fill';
			} else if ($obj.hasClass('cj_image_scale_fit')) {
				o.method = 'fit';
			}
			$obj.data('options', o);

			// init
			init();

		} else if (settings && typeof settings === 'string') {

			// unknown call to our plugin
			$.error('Method ' + settings + ' does not exist on (cjObjectScaler)');
		}

	};

	$.fn.extend({

		cjObjectScaler: function (settings) {

			// call to the plug-in
			return this.each(function () {

				$.cjObjectScaler($(this), settings);

			});

		}
	});

}(jQuery));

