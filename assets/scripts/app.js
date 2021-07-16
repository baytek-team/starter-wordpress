/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./source/admin/styles/bundle-editor.scss":
/*!************************************************!*\
  !*** ./source/admin/styles/bundle-editor.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./source/public/scripts/app.js":
/*!**************************************!*\
  !*** ./source/public/scripts/app.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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


__webpack_require__(/*! ./menu.js */ "./source/public/scripts/menu.js");

__webpack_require__(/*! ./modals.js */ "./source/public/scripts/modals.js");

__webpack_require__(/*! ./sliders.js */ "./source/public/scripts/sliders.js"); // require('./smooth-scroll.js');
// require('./tabs.js');
// require('./toggle.js');
// require('./archive.js');


__webpack_require__(/*! ./copyrights.js */ "./source/public/scripts/copyrights.js");

/***/ }),

/***/ "./source/public/scripts/copyrights.js":
/*!*********************************************!*\
  !*** ./source/public/scripts/copyrights.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports) {

// A place to keep your menu scripting (ex. toggling a mobile menu)
(function ($) {
  // Handle menu interactions
  $(".main-menu-toggle").click(function () {
    mainNav();
  });

  function mainNav() {
    $(".main-menu-toggle").toggleClass("cross");
    $("body").toggleClass("modal-open");
    $("#site-navigation").toggleClass("open");
  } // (just an example below change it to suit your needs)
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
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ "./source/public/scripts/sliders.js":
/*!******************************************!*\
  !*** ./source/public/scripts/sliders.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Scripting for sliders or carousels (Baytek gutenblocks plugin includes a slider block that uses slick slider)
(function ($) {
  // Simple Slider Block using Slick.js
  $('.carousel-slider').slick({
    arrows: true,
    dots: true,
    slidesToScroll: 1,
    slidesToShow: 4,
    infinite: true,
    // variableWidth: true,
    draggable: true,
    prevArrow: '<button type="button" class="slick-prev slick-arrow"><i class="fal fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next slick-arrow"><i class="fal fa-chevron-right"></i></button>',
    responsive: [{
      breakpoint: 1600,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 500,
      settings: {
        slidesToShow: 1
      }
    }]
  }); // If you need multiple Slider Blocks on one page use this instead of above:
  ///// 1. Create a Group Block with the class: carousel-wrapper
  ///// 2. Add the Slider Block in this new Group
  ///// 3. Below the Slider and in the same Group add the Buttons Block for the custom Arrows
  ///// 4. Add 2 buttons:  1st will have '.left' class. 2nd will have '.right' class.
  // $('.carousel-wrapper .wp-block-group__inner-container .carousel-slider').each(function(){
  // 	var slickIndividual = $(this);
  // 	slickIndividual.slick({
  // 		slidesToShow: 3,
  // 		slidesToScroll: 1,
  // 		arrows: true,
  // 		dots: false,
  // 		nextArrow: slickIndividual.next().find('.right'),
  // 		prevArrow: slickIndividual.next().find('.left'),
  // 		draggable: true,
  // 		infinite: true,
  // 	  	responsive: [
  // 	  		{
  // 				breakpoint: 720,
  // 				settings: {
  // 					slidesToShow: 2
  // 				}
  // 			}
  // 		]
  // 	});
  // });
})(jQuery);

/***/ }),

/***/ "./source/public/styles/bundle.scss":
/*!******************************************!*\
  !*** ./source/public/styles/bundle.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!************************************************************************************************************************!*\
  !*** multi ./source/public/scripts/app.js ./source/public/styles/bundle.scss ./source/admin/styles/bundle-editor.scss ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/chris/Web/starter-2020/wp-content/themes/starter21/source/public/scripts/app.js */"./source/public/scripts/app.js");
__webpack_require__(/*! /Users/chris/Web/starter-2020/wp-content/themes/starter21/source/public/styles/bundle.scss */"./source/public/styles/bundle.scss");
module.exports = __webpack_require__(/*! /Users/chris/Web/starter-2020/wp-content/themes/starter21/source/admin/styles/bundle-editor.scss */"./source/admin/styles/bundle-editor.scss");


/***/ })

/******/ });
//# sourceMappingURL=app.js.map