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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./source/admin/scripts/admin.js":
/*!***************************************!*\
  !*** ./source/admin/scripts/admin.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./block-filters.js */ "./source/admin/scripts/block-filters.js");

__webpack_require__(/*! ./block-styles.js */ "./source/admin/scripts/block-styles.js");

/***/ }),

/***/ "./source/admin/scripts/block-filters.js":
/*!***********************************************!*\
  !*** ./source/admin/scripts/block-filters.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var supportsNarrow = ['core/group'];
var narrowSvg = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path stroke="null" id="svg_1" d="m8.1875,9l0,6l6.875,0l0,-6l-6.875,0zm5.40179,-4.8l-3.92857,0l0,1.5l3.92857,0l0,-1.5zm-3.92857,15.6l3.92857,0l0,-1.5l-3.92857,0l0,1.5z"/></svg>';
var shouldChangeIcon = false;

function changeAlignmentSettings(settings, name) {
  if (supportsNarrow.indexOf(name) == -1) {
    return settings;
  }

  if (settings.supports && settings.supports.align && settings.supports.align.length) {
    settings.supports.align.push('narrow');
  }

  return settings;
}

wp.hooks.addFilter('blocks.registerBlockType', 'baytek/theme/alignment', changeAlignmentSettings);
var changeEditorControls = wp.compose.createHigherOrderComponent(function (BlockEdit) {
  return function (props) {
    if (props.isSelected) {
      if (props.attributes && props.attributes.align && props.attributes.align == 'narrow') {
        shouldChangeIcon = true;
      } else {
        shouldChangeIcon = false;
      }

      window.setTimeout(function () {
        jQuery(document).trigger('maybeChangeIcon');
      }, 30);
    }

    return wp.element.createElement(wp.element.Fragment, {}, wp.element.createElement(BlockEdit, props));
  };
}, 'changeEditorControls');
wp.hooks.addFilter('editor.BlockEdit', 'baytek/theme/editor-controls', changeEditorControls); //Begin the hacks

(function ($) {
  //Javascript to change the react components and fill out empty alignment options, since Wordpress is extraordinarily difficult about this
  $(document).on('click', 'button[aria-label="Change alignment"]', function (e) {
    window.setTimeout(function () {
      $('.components-dropdown-menu__menu[aria-label="Change alignment"] button:not(.has-icon)').html(narrowSvg + 'Narrow width').addClass('has-icon has-text');
    }, 30);
  });
  $(document).on('maybeChangeIcon', fixIcon);

  function fixIcon(e) {
    if (shouldChangeIcon) {
      $('button[aria-label="Change alignment"] svg').replaceWith(narrowSvg);
    }
  }
})(jQuery);

/***/ }),

/***/ "./source/admin/scripts/block-styles.js":
/*!**********************************************!*\
  !*** ./source/admin/scripts/block-styles.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Add eyebrow style to heading block
 */
wp.blocks.registerBlockStyle('core/heading', {
  name: 'eyebrow',
  label: 'Eyebrow'
});

/***/ }),

/***/ 1:
/*!*********************************************!*\
  !*** multi ./source/admin/scripts/admin.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /www/glutening/public_html/wp-content/themes/starter/source/admin/scripts/admin.js */"./source/admin/scripts/admin.js");


/***/ })

/******/ });
//# sourceMappingURL=admin.js.map