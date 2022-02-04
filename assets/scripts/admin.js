/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./source/admin/scripts/block-filters.js":
/*!***********************************************!*\
  !*** ./source/admin/scripts/block-filters.js ***!
  \***********************************************/
/***/ (() => {

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
/***/ (() => {

/**
 * Add eyebrow style to heading block
 */
wp.blocks.registerBlockStyle('core/heading', {
  name: 'eyebrow',
  label: 'Eyebrow'
});
/**
 * Remove unused button styles and add a custom View More variation
 */

wp.blocks.unregisterBlockStyle('core/button', ['default', 'squared', 'fill']);
wp.blocks.registerBlockVariation('core/buttons', [{
  name: 'more',
  title: 'View More Button',
  attributes: {
    className: 'view-more'
  }
}]);

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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***************************************!*\
  !*** ./source/admin/scripts/admin.js ***!
  \***************************************/


__webpack_require__(/*! ./block-filters.js */ "./source/admin/scripts/block-filters.js");

__webpack_require__(/*! ./block-styles.js */ "./source/admin/scripts/block-styles.js");
})();

/******/ })()
;
//# sourceMappingURL=admin.js.map