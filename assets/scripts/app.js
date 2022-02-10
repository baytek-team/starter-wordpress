/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./source/public/scripts/app.js":
/*!**************************************!*\
  !*** ./source/public/scripts/app.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}; // Polyfills - add as needed
// require('./polyfills/foreach.js');
// Script Modules
// Include as needed on your project. All scripts will be bundled together.
// Some sample files are included for ideas to get you started.
// require('./animations.js');
// require('./hoverintent.js');


__webpack_require__(/*! ./menu.js */ "./source/public/scripts/menu.js");

__webpack_require__(/*! ./modals.js */ "./source/public/scripts/modals.js"); // require('./sliders.js');
// require('./smooth-scroll.js');
// require('./tabs.js');
// require('./toggle.js');
// require('./archive.js');


__webpack_require__(/*! ./copyrights.js */ "./source/public/scripts/copyrights.js");

/***/ }),

/***/ "./source/public/scripts/copyrights.js":
/*!*********************************************!*\
  !*** ./source/public/scripts/copyrights.js ***!
  \*********************************************/
/***/ (() => {

//Scripting for image copyright toggling
(function ($) {
  $('figure.wp-block-image figcaption').click(function (e) {
    $(this).toggleClass('open');
  });
})(jQuery);

/***/ }),

/***/ "./source/public/scripts/menu.js":
/*!***************************************!*\
  !*** ./source/public/scripts/menu.js ***!
  \***************************************/
/***/ (() => {

// A place to keep your menu scripting (ex. toggling a mobile menu)
(function ($) {
  // Handle menu interactions
  $(".main-menu-toggle").click(function () {
    mainNav();
  });

  function mainNav() {
    $(".main-menu-toggle").toggleClass("cross");
    $("body").toggleClass("no-scroll");
    $("#site-navigation").parent().toggleClass("open");
    $("header").toggleClass("menu-open");
  } // Mega Menu when needed
  // $('a.expand').click(function() {
  // 	$(this).toggleClass('open');
  // 	$(this).parents('li').find('.mega-menu').slideToggle();
  // });
  // $('li.has-mega-menu').hoverIntent({
  // 	over() {
  // 		$(this).addClass('has-mega-menu-open');
  // 		$('#menu-main').addClass('mega-menu-open');
  // 		$('#menu-main-fr').addClass('mega-menu-open');
  // 	},
  // 	out() {
  // 		$(this).removeClass('has-mega-menu-open');
  // 		$('#menu-main').removeClass('mega-menu-open');
  // 		$('#menu-main-fr').removeClass('mega-menu-open');
  // 	},
  // 	sensitivity: 5,
  // 	timeout: 200
  // });
  // (just an example below change it to suit your needs)
  //Listen for menu clicks with anchors, to close the menu 


  $(document).on('click', '.menus.open li.current-menu-item a:not(.expand)', function () {
    mainNav();
  });
})(jQuery);

/***/ }),

/***/ "./source/public/scripts/modals.js":
/*!*****************************************!*\
  !*** ./source/public/scripts/modals.js ***!
  \*****************************************/
/***/ (() => {

// Scripting of modals and interactions

/**
 * Modal jquery code
 */
(function ($) {
  "use strict";

  var initElements = function initElements() {
    // if we have already inited this type of element
    $('.baytek-block-popup').each(function () {
      // for the identified modal we add an instance of the class BodModal 
      // to the data element  
      $(this).data('baytek-block-popup', new BodModal(this));
    });
  }; // class used to manipulate the modal, there will be a seperate instance of the 
  // class for each modal on the page
  // container - DOM object for modal 


  var BodModal = function BodModal(container) {
    // convert passed in DOM modal container to jquery object so we can apply jquery methods
    this.$container = $(container);
    this.$trigger = this.$container.find('.baytek-block-popup-trigger'); // Markup the aria labels

    window.bodModalCount++; // get modal number to append to get unique id

    this.$container.find('.baytek-block-popup-wrap').attr('aria-labelledby', 'bodModalAriaTitle' + window.bodModalCount);
    this.$container.find('.baytek-modal-title').attr('id', 'bodModalAriaTitle' + window.bodModalCount);
    this.$container.find('.baytek-block-popup-wrap').attr('aria-describedby', 'bodModalAriaContent' + window.bodModalCount);
    this.$container.find('.baytek-modal-content').attr('id', 'bodModalAriaContent' + window.bodModalCount); // bind our functions to this so we use current rather than event version of this

    this.show = this.show.bind(this);
    this.afterShow = this.afterShow.bind(this);
    this.hide = this.hide.bind(this);
    this.keyPress = this.keyPress.bind(this); // we need a timer for fading in and out the modal and for show on page load

    this.timer = null; // assign trigger event depending upon trigger type which is 
    // stored has a class

    if (this.$trigger.hasClass('type_selector')) {
      var triggerSelector = this.$trigger.attr('data-selector');

      if (triggerSelector) {
        $('.' + triggerSelector).css('cursor', 'pointer').on('click', this.show); // attach click event
      }
    } else if (this.$trigger.hasClass('type_load')) {
      // we have show on page load
      // we need to extract the delay amd set a timeout using it
      var loadDelay = this.$trigger.attr('data-delay');
      isNaN(parseInt(loadDelay)) ? loadDelay = 1000 : loadDelay = parseInt(loadDelay);
      this.timer = setTimeout(this.show, loadDelay);
    } else {
      // must be button, text, or image trigger
      this.$trigger.on('click', this.show); // attach click event
    } // setup the overlay and content wrap, put them into a jquery object and 
    // attach the hide event for the click


    this.$overlay = this.$container.find('.baytek-block-popup-overlay').on('click', this.hide);
    this.$modalWrap = this.$container.find('.baytek-block-popup-wrap');
    this.$modalcloser = this.$container.find('.baytek-block-popup-closer').on('click', this.hide);
    this.$btncloser = this.$container.find('.baytek-block-close-btn .baytek-btn').on('click', this.hide);
    this.$escCloser = $(document).on('keydown', this.keyPress);
  };

  BodModal.prototype = {
    show: function show() {
      // start to clearing any timeouts
      clearTimeout(this.timer); // when we show the modal we move it to the body DOM so that
      // nothing else impacts it

      this.$overlay.appendTo(document.body).show();
      this.$modalWrap.appendTo(document.body).show(); // even though we have hit it with a show the opacticy still makes it
      // invisible. We wait to ensure the modal is ready then then add
      // an active class with triggers the opacity transition

      this.timer = setTimeout(this.afterShow, 25);
    },
    afterShow: function afterShow() {
      clearTimeout(this.timer);
      this.$overlay.addClass('active');
      this.$modalWrap.addClass('active');
      this.$modalWrap.attr('aria-modal', 'true');
    },
    hide: function hide() {
      this.$overlay.removeClass('active');
      this.$modalWrap.removeClass('active'); // add the overlay and modal wrap back to the container and hide it

      this.$overlay.appendTo(this.$container).hide();
      this.$modalWrap.appendTo(this.$container).hide();
      this.$modalWrap.attr('aria-modal', 'false');
    },
    keyPress: function keyPress(e) {
      if (e.keyCode === 27) {
        // ESC
        this.hide();
      }
    }
  };
  window.bodModalCount = 0; // global count of modals

  initElements();
})(jQuery);

/***/ }),

/***/ "./source/public/styles/bundle.scss":
/*!******************************************!*\
  !*** ./source/public/styles/bundle.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./source/admin/styles/bundle-editor.scss":
/*!************************************************!*\
  !*** ./source/admin/styles/bundle-editor.scss ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/assets/scripts/app": 0,
/******/ 			"assets/styles/bundle-editor": 0,
/******/ 			"assets/styles/bundle": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkstarter_theme"] = self["webpackChunkstarter_theme"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["assets/styles/bundle-editor","assets/styles/bundle"], () => (__webpack_require__("./source/public/scripts/app.js")))
/******/ 	__webpack_require__.O(undefined, ["assets/styles/bundle-editor","assets/styles/bundle"], () => (__webpack_require__("./source/public/styles/bundle.scss")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["assets/styles/bundle-editor","assets/styles/bundle"], () => (__webpack_require__("./source/admin/styles/bundle-editor.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.js.map