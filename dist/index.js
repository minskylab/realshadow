(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (__dirname){(function (){
module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 110:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultStringShadowKind = exports.defaultStringBlurRadius = exports.defaultStringColor = exports.defaultStringToHour = exports.defaultStringFromHour = exports.defaultStringPhi = exports.REAL_SHADOW_CLASS_NAME = void 0;
exports.REAL_SHADOW_CLASS_NAME = "realshadow";
exports.defaultStringPhi = "5";
exports.defaultStringFromHour = "6";
exports.defaultStringToHour = "18";
exports.defaultStringColor = "#001523";
exports.defaultStringBlurRadius = "0";
exports.defaultStringShadowKind = "box";


/***/ }),

/***/ 588:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dataForcedHourName = exports.dataBlurRadiusName = exports.dataColorName = exports.dataDistanceName = exports.dataToHourName = exports.dataFromHourName = exports.dataPhiName = exports.dataShadowKind = void 0;
exports.dataShadowKind = "data-rs-kind";
exports.dataPhiName = "data-rs-phi";
exports.dataFromHourName = "data-rs-from-hour";
exports.dataToHourName = "data-rs-to-hour";
exports.dataDistanceName = "data-rs-distance";
exports.dataColorName = "data-rs-color";
exports.dataBlurRadiusName = "data-rs-blur-radius";
exports.dataForcedHourName = "data-rs-hour";


/***/ }),

/***/ 177:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var shadows_1 = __nccwpck_require__(861);
// document.onload = (e: Event) => {
shadows_1.startTicker(100);
// };


/***/ }),

/***/ 861:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startTicker = void 0;
var constants_1 = __nccwpck_require__(110);
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
var applyBaseStyle = function (el) {
    el.style.transition = "box-shadow 1s, text-shadow 1s";
};
var applyShadows = function (date, el, props) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    // 0 - 00:00, 1 - 23:59
    var h = (hours + minutes / 60) / 24;
    var _a = constraintHour(h, props.fromHour / 24, props.toHour / 24), hn = _a[0], outOfConstraint = _a[1];
    var dx = -props.distance * Math.sin(Math.PI * hn) * 0.5;
    var dy = -props.distance * Math.cos(Math.PI * hn);
    if (outOfConstraint) {
        el.style.boxShadow = "";
        el.style.textShadow = "";
        return;
    }
    switch (props.kind) {
        case "box":
            el.style.boxShadow = dx + "px " + dy + "px " + props.blurRadius + "px " + props.color;
            break;
        case "text":
            el.style.textShadow = dx + "px " + dy + "px " + props.blurRadius + "px " + props.color;
            break;
        case "both":
            el.style.boxShadow = dx + "px " + dy + "px " + props.blurRadius + "px " + props.color;
            el.style.textShadow = dx + "px " + dy + "px " + props.blurRadius + "px " + props.color;
            break;
        default:
            break;
    }
};
var calculateShadows = function (date) {
    // const elements = document.getElementsByClassName(REAL_SHADOW_CLASS_NAME);
    var elements = document.querySelectorAll("[data-rs-kind]");
    for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        var phi = Number(el.getAttribute(datanames_1.dataPhiName) || constants_1.defaultStringPhi);
        var fromHour = Number(el.getAttribute(datanames_1.dataFromHourName) || constants_1.defaultStringFromHour);
        var toHour = Number(el.getAttribute(datanames_1.dataToHourName) || constants_1.defaultStringToHour);
        var distance = Number(el.getAttribute(datanames_1.dataDistanceName) || constants_1.defaultStringToHour);
        var color = el.getAttribute(datanames_1.dataColorName) || constants_1.defaultStringColor;
        var blurRadius = Number(el.getAttribute(datanames_1.dataBlurRadiusName) || constants_1.defaultStringBlurRadius);
        // const forcedCurrentHour: number = Number(el.getAttribute(dataForcedHourName) || defaultStringBlurRadius);
        var kindString = el.getAttribute(datanames_1.dataShadowKind) || constants_1.defaultStringShadowKind;
        if (kindString !== "box" && kindString !== "text" && kindString != "both") {
            kindString = "defaultStringShadowKind";
        }
        var kind = kindString;
        var props = { phi: phi, fromHour: fromHour, toHour: toHour, distance: distance, color: color, blurRadius: blurRadius, kind: kind };
        var forcedHour = el.getAttribute(datanames_1.dataForcedHourName);
        var h = void 0, m = void 0;
        if (forcedHour && forcedHour !== "") {
            var parts = forcedHour.split(":");
            if (parts.length > 1) {
                h = Number(parts[0]);
                m = Number(parts[1]);
            }
            else {
                h = Number(parts[0]);
                m = 0;
            }
        }
        if (h >= 0 && h < 24 && m >= 0 && m < 60) {
            date.setHours(h, m);
        }
        applyBaseStyle(el);
        applyShadows(date, el, props);
        // const k = el.dataset.key;
    }
};
var updateTick = function () {
    var now = new Date();
    calculateShadows(now);
};
var startTicker = function (intervalSeconds) {
    setInterval(updateTick, intervalSeconds);
};
exports.startTicker = startTicker;


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
