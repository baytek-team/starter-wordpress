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
(function ($) {// Code here
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