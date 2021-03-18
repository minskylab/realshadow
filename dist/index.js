module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 588:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultStringColor = exports.defaultStringToHour = exports.defaultStringFromHour = exports.defaultStringPhi = exports.dataColorName = exports.dataDistanceName = exports.dataToHourName = exports.dataFromHourName = exports.dataPhiName = void 0;
exports.dataPhiName = "data-phi";
exports.dataFromHourName = "data-from-hour";
exports.dataToHourName = "data-to-hour";
exports.dataDistanceName = "data-distance";
exports.dataColorName = "black";
exports.defaultStringPhi = "5";
exports.defaultStringFromHour = "6";
exports.defaultStringToHour = "18";
exports.defaultStringColor = "black";


/***/ }),

/***/ 177:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var datanames_1 = __nccwpck_require__(588);
__nccwpck_require__(687);
var REAL_SHADOW_CLASS_NAME = "real-shadow";
var constraintHour = function (hn, x0, x1) {
    if (hn < x0) {
        return x0;
    }
    if (hn > x1) {
        return x1;
    }
    return hn / (x1 - x0);
};
var applyShadow = function (date, el, props) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var hn = (hours + minutes / 60) / 24;
    hn = constraintHour(hn, props.fromHour / 24, props.toHour / 24);
    var dx = -props.distance * Math.cos(Math.PI * hn);
    var dy = -props.distance * Math.sin(Math.PI * hn);
    el.style.setProperty("--shadow-dx", Math.floor(dx).toString() + "px");
    el.style.setProperty("--shadow-dy", Math.floor(dy).toString() + "px");
    el.style.setProperty("--shadow-blur", "0");
    el.style.setProperty("--shadow-color", props.color);
    console.log(dx, dy);
    // el.style.boxShadow = "";
};
var calculateShadows = function (date) {
    var elements = document.getElementsByClassName(REAL_SHADOW_CLASS_NAME);
    // 0 - 00:00, 1 - 23:59
    for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        var phi = Number(el.getAttribute(datanames_1.dataPhiName) || datanames_1.defaultStringPhi);
        var fromHour = Number(el.getAttribute(datanames_1.dataFromHourName) || datanames_1.defaultStringFromHour);
        var toHour = Number(el.getAttribute(datanames_1.dataToHourName) || datanames_1.defaultStringToHour);
        var distance = Number(el.getAttribute(datanames_1.dataDistanceName) || datanames_1.defaultStringToHour);
        var color = el.getAttribute(datanames_1.dataColorName) || datanames_1.defaultStringColor;
        var props = { phi: phi, fromHour: fromHour, toHour: toHour, distance: distance, color: color };
        applyShadow(date, el, props);
        // const k = el.dataset.key;
    }
};
var dayTicker = function (intervalSeconds) {
    setTimeout(function () {
        calculateShadows(new Date());
        dayTicker(intervalSeconds);
    }, intervalSeconds);
};


/***/ }),

/***/ 687:
/***/ ((module) => {

module.exports = eval("require")("./realshadow.css");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__nccwpck_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __nccwpck_require__(177);
/******/ })()
;