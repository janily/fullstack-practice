var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/my-command.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/my-command.js":
/*!***************************!*\
  !*** ./src/my-command.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
Array.fromNSArray = function (nsArray) {
  var array = [];

  for (var i = 0; i < nsArray.count(); i++) {
    array.push(nsArray[i]);
  }

  return array;
};

function loadLocalImage(_ref) {
  var scriptPath = _ref.scriptPath,
      filePath = _ref.filePath;
  var basePath = scriptPath.stringByDeletingLastPathComponent().stringByDeletingLastPathComponent().stringByDeletingLastPathComponent();
  return NSImage.alloc().initWithContentsOfFile(basePath + "/" + filePath);
}

function getSelectionAndOptions_forAngleInstances(_ref2) {
  var scriptPath = _ref2.scriptPath;
  var alert = NSAlert.alloc().init();
  alert.setMessageText("Apply Mockup");
  alert.setInformativeText("Choose an Artboard to apply into the selected shape.");
  alert.addButtonWithTitle("Apply");
  alert.addButtonWithTitle("Cancel");
  alert.icon = loadLocalImage({
    scriptPath: scriptPath,
    filePath: "Contents/Resources/logo.png"
  });
  return alert.runModal();
}

/* harmony default export */ __webpack_exports__["default"] = (function (_ref3) {
  var api = _ref3.api,
      command = _ref3.command,
      document = _ref3.document,
      plugin = _ref3.plugin,
      scriptPath = _ref3.scriptPath,
      scriptURL = _ref3.scriptURL,
      selection = _ref3.selection;
  document.showMessage("It's alive 🙌");
  var selectedLayers = Array.fromNSArray(selection);
  print("🔷");
  print(selectedLayers.length);
  var artboardsNSArray = document.artboards();
  var artboardsOnSelectPage = Array.fromNSArray(artboardsNSArray);
  print("🖼");
  print(artboardsOnSelectPage.length);
  var artboardsOnOtherPages = Array.fromNSArray(document.pages()).filter(function (a) {
    return a != document.currentPage();
  }).map(function (a) {
    return a.artboards();
  }).map(function (a) {
    return Array.fromNSArray(a);
  }).reduce(function (p, a) {
    return p.concat(a);
  }, new Array());
  print("Other 🖼");
  print(artboardsOnOtherPages.length);
  getSelectionAndOptions_forAngleInstances({
    scriptPath: scriptPath
  });
  return;
});

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=my-command.js.map