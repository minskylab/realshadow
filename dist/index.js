(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (__dirname){(function (){
module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 446:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.REAL_SHADOW_CLASS_NAME = void 0;
exports.REAL_SHADOW_CLASS_NAME = "real-shadow";


/***/ }),

/***/ 588:
/***/ ((__unused_webpack_module, exports) => {


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


Object.defineProperty(exports, "__esModule", ({ value: true }));
var shadows_1 = __nccwpck_require__(861);
// document.onload = (e: Event) => {
shadows_1.dayTicker(1000);
// };


/***/ }),

/***/ 861:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dayTicker = void 0;
var consts_1 = __nccwpck_require__(446);
var datanames_1 = __nccwpck_require__(588);
var constraintHour = function (hn, x0, x1) {
    if (hn < x0) {
        return [x0, true];
    }
    if (hn > x1) {
        return [x1, true];
    }
    return [hn / (x1 - x0), false];
};
var applyShadow = function (date, el, props) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var _a = constraintHour((hours + minutes / 60) / 24, props.fromHour / 24, props.toHour / 24), hn = _a[0], outOfConstraint = _a[1];
    var dx = -props.distance * Math.sin(Math.PI * hn);
    var dy = -props.distance * Math.cos(Math.PI * hn);
    // el.style.setProperty("--shadow-dx", Math.floor(dx).toString() + "px");
    // el.style.setProperty("--shadow-dy", Math.floor(dy).toString() + "px");
    // el.style.setProperty("--shadow-blur", "0");
    // el.style.setProperty("--shadow-color", props.color);
    console.log(hn, dx, dy);
    if (outOfConstraint) {
        el.style.boxShadow = "";
    }
    else {
        el.style.boxShadow = Math.floor(dx) + "px " + Math.floor(dy) + "px " + "0" + " " + props.color;
    }
    // : var(--shadow-dx) var(--shadow-dy) var(--shadow-blur) var(--shadow-color);
    // el.style.boxShadow = "";
};
var calculateShadows = function (date) {
    var elements = document.getElementsByClassName(consts_1.REAL_SHADOW_CLASS_NAME);
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
var hour = 0;
var dayTicker = function (intervalSeconds) {
    setTimeout(function () {
        // const now = new Date();
        var now = new Date("2021-03-17T" + (hour < 10 ? "0" + hour.toString() : hour.toString()) + ":00:00-05:00");
        console.log(now);
        calculateShadows(now);
        exports.dayTicker(intervalSeconds);
        hour++;
        if (hour === 24) {
            hour = 0;
        }
    }, intervalSeconds);
};
exports.dayTicker = dayTicker;


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
}).call(this)}).call(this,"/dist")
},{}]},{},[1]);
