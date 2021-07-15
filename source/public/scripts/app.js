'use strict';

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

// Polyfills - add as needed
// require('./polyfills/foreach.js');


// Script Modules
// Include as needed on your project. All scripts will be bundled together.
// Some sample files are included for ideas to get you started.

// require('./animations.js');
require('./menu.js');
require('./modals.js');
require('./sliders.js');
// require('./smooth-scroll.js');
// require('./tabs.js');
// require('./toggle.js');
// require('./archive.js');
require('./copyrights.js');
