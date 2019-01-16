(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "makeIdEnding", {
  enumerable: true,
  get: function get() {
    return _commonTools.makeIdEnding;
  }
});
exports.AttrGetter = void 0;

var _style = require("./style.constant");

var _chordList = require("./chord-list.constant");

var _commonTools = require("./common-tools");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AttrGetter =
/*#__PURE__*/
function () {
  function AttrGetter(componentRef) {
    _classCallCheck(this, AttrGetter);

    this.componentRef = componentRef;
  }

  _createClass(AttrGetter, [{
    key: "getChords",
    value: function getChords() {
      return this.componentRef.getAttribute("chords");
    }
  }, {
    key: "getSizeAttr",
    value: function getSizeAttr() {
      return this.componentRef.getAttribute("size");
    }
  }, {
    key: "getThemeAttr",
    value: function getThemeAttr() {
      return this.componentRef.getAttribute("theme");
    }
  }, {
    key: "getReflectAttr",
    value: function getReflectAttr() {
      return this.componentRef.getAttribute("reflect");
    }
  }, {
    key: "resolveReflectAttr",
    value: function resolveReflectAttr() {
      var reflectModel = {
        horizontal: false,
        vertical: false
      };
      var reflectData = this.getReflectAttr() && this.getReflectAttr().length ? this.getReflectAttr().toLowerCase().split(/\s+|[,.]+/) : "";

      if (reflectData) {
        reflectData.map(function (el) {
          if (el == "horizontal" || el == "x") {
            reflectModel.horizontal = true;
          }

          if (el == "vertical" || el == "y") {
            reflectModel.vertical = true;
          }
        });
      }

      return reflectModel;
    }
  }, {
    key: "resolveTheme",
    value: function resolveTheme() {
      return this.getThemeAttr() && this.getThemeAttr().toLowerCase() == "dark" ? "dark" : "light";
    }
  }, {
    key: "resolveSize",
    value: function resolveSize() {
      var tempSize = this.getSizeAttr();
      var sizeParsed = parseFloat("" + tempSize);
      var size = _style.sizeList.medium;

      if (isNaN(sizeParsed)) {
        size = _style.sizeList[tempSize] ? _style.sizeList[tempSize] : _style.sizeList.medium;
      } else size = sizeParsed;

      return size;
    }
  }, {
    key: "resolveCurrentChord",
    value: function resolveCurrentChord() {
      var _this = this;

      return this.getChords() ? _chordList.chordList.find(function (el) {
        return el.name.toUpperCase() == _this.getChords().toUpperCase();
      }) : "";
    }
  }, {
    key: "resolveChordNamesArray",
    value: function resolveChordNamesArray() {
      var chordsData = this.getChords();
      var chordsDataArr = [];

      if (chordsData) {
        chordsData.split(/\s+|[,.]+/).map(function (element) {
          if (_chordList.chordList.find(function (el) {
            return el.name.toLowerCase() == element.toLowerCase();
          })) {
            chordsDataArr.push(element.toLowerCase());
          }
        });
      }

      return chordsDataArr;
    }
  }, {
    key: "resolveChordArray",
    value: function resolveChordArray() {
      var chordsArr = [];
      this.resolveChordNamesArray().map(function (el) {
        _chordList.chordList.map(function (element) {
          if (element.name.toLowerCase() == el) {
            chordsArr.push(_objectSpread({}, element, {
              componentCanvasId: "chord-".concat((0, _commonTools.makeIdEnding)())
            }));
          }
        });
      });
      return chordsArr;
    }
  }]);

  return AttrGetter;
}();

exports.AttrGetter = AttrGetter;
},{"./chord-list.constant":3,"./common-tools":5,"./style.constant":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasDrawTool = void 0;

var _style = require("./style.constant");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CanvasDrawTool =
/*#__PURE__*/
function () {
  function CanvasDrawTool(canvasRef, chordData, customAttributes) {
    _classCallCheck(this, CanvasDrawTool);

    this.chordData = chordData;
    this.canvas = {};
    var canvas = {
      defaults: {
        canvasWidth: 390,
        canvasHeight: 140,
        rowWidth: 30,
        stringHeight: 20
      },
      ref: canvasRef,
      canvasSettings: {},
      customAttributes: customAttributes
    };
    canvas.canvasSettings = {
      canvasHeight: canvas.defaults.canvasHeight * customAttributes.size,
      canvasWidth: canvas.defaults.canvasWidth * customAttributes.size,
      rowWidth: canvas.defaults.rowWidth * customAttributes.size,
      stringHeight: canvas.defaults.stringHeight * customAttributes.size
    };
    this.canvas = canvas;
    this.canvas.canvasSettings.canvasWidth = this.calculateCanvasSize(this.findBorders());
  }

  _createClass(CanvasDrawTool, [{
    key: "draw",
    value: function draw() {
      this.updateCanvasSize();
      this.drawChord();
      this.resolveChordReflection();
    }
  }, {
    key: "updateCanvasSize",
    value: function updateCanvasSize() {
      this.canvas.ref.canvas.setAttribute("height", this.canvas.canvasSettings.canvasHeight);
      this.canvas.ref.canvas.setAttribute("width", this.canvas.canvasSettings.canvasWidth);
    }
  }, {
    key: "drawBasis",
    value: function drawBasis() {
      this.drawRectangle(_style.styleConstants.colors.basisColor[this.canvas.customAttributes.theme], 0, 0, this.canvas.canvasSettings.canvasHeight, this.canvas.canvasSettings.canvasWidth);

      for (var i = 1; i <= 12; i++) {
        this.drawALine(_style.styleConstants.colors.rowDividerColor[this.canvas.customAttributes.theme], i * this.canvas.canvasSettings.rowWidth, 0, i * this.canvas.canvasSettings.rowWidth, this.canvas.canvasSettings.canvasHeight);
      }

      for (var _i = 0; _i <= 6; _i++) {
        this.drawALine(_style.styleConstants.colors.stringsColor[this.canvas.customAttributes.theme], 0, _i * this.canvas.canvasSettings.stringHeight, this.canvas.canvasSettings.canvasWidth, _i * this.canvas.canvasSettings.stringHeight);
      }
    }
  }, {
    key: "drawRectangle",
    value: function drawRectangle(color, positionY, positionX, width, height) {
      var ctx = this.canvas.ref.ctx;

      if (ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(positionX, positionY, height, width);
      }
    }
  }, {
    key: "drawChord",
    value: function drawChord() {
      var _this = this;

      var currentStringHigth = this.canvas.canvasSettings.stringHeight;
      var pressedStringRows = [];
      var circleColor = _style.styleConstants.colors.circleColor[this.canvas.customAttributes.theme];
      this.drawBasis();

      for (var stringG in this.chordData.structure.strings) {
        if (this.chordData.structure.strings.hasOwnProperty(stringG)) {
          this.chordData.structure.strings[stringG].forEach(function (element) {
            pressedStringRows.push(element);

            _this.drawCircle(5 * _this.canvas.customAttributes.size, circleColor, circleColor, _this.calculateElementHorizontalPosition(element), currentStringHigth);
          });
          currentStringHigth += this.canvas.canvasSettings.stringHeight;
        }
      }

      if (pressedStringRows.filter(function (el) {
        return el === _this.chordData.startString;
      }).length === 6) {
        this.drawBare();
      }
    }
  }, {
    key: "findBorders",
    value: function findBorders() {
      var strings = this.chordData.structure.strings;
      var max = 1;
      var min = 12;

      for (var st in strings) {
        if (strings.hasOwnProperty(st)) {
          max = Math.max.apply(null, strings[st]) > max ? Math.max.apply(null, strings[st]) : max;
          min = Math.min.apply(null, strings[st]) < min ? Math.min.apply(null, strings[st]) : min;
        }
      }

      return max - this.chordData.startString < 2 ? max + 1 : max;
    }
  }, {
    key: "calculateElementHorizontalPosition",
    value: function calculateElementHorizontalPosition(elementPosition) {
      var elementPos = elementPosition - this.chordData.startString;
      var rowWidth = this.canvas.canvasSettings.rowWidth;
      return this.canvas.canvasSettings.canvasWidth - elementPos * rowWidth - rowWidth * 0.5;
    }
  }, {
    key: "calculateCanvasSize",
    value: function calculateCanvasSize(maxRow) {
      var canvasWidth = (1 + maxRow - this.chordData.startString) * this.canvas.canvasSettings.rowWidth;
      return canvasWidth;
    }
  }, {
    key: "drawCircle",
    value: function drawCircle(size, color, fill, horizontal, vertical) {
      var ctx = this.canvas.ref.ctx;

      if (ctx) {
        ctx.strokeStyle = color;
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(horizontal, vertical, size, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
      }
    }
  }, {
    key: "drawALine",
    value: function drawALine(color, xStart, yStart, xEnd, yEnd) {
      var lineWidth = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
      var ctx = this.canvas.ref.ctx;

      if (ctx) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
        ctx.lineWidth = lineWidth ? lineWidth : 1;
        ctx.stroke();
      }
    }
  }, {
    key: "drawBare",
    value: function drawBare() {
      var calculatedPos = this.calculateElementHorizontalPosition(this.chordData.startString);
      this.drawALine(_style.styleConstants.colors.circleColor[this.canvas.customAttributes.theme], calculatedPos, 5 * this.canvas.customAttributes.size, calculatedPos, this.canvas.canvasSettings.canvasHeight - 5, 15 * this.canvas.customAttributes.size);
    }
  }, {
    key: "resolveChordReflection",
    value: function resolveChordReflection() {
      var transform = "; transform: scale(".concat(this.canvas.customAttributes.reflection.horizontal ? -1 : 1, ",").concat(this.canvas.customAttributes.reflection.vertical ? -1 : 1, ")");
      this.canvas.ref.canvas.style += transform;
    }
  }]);

  return CanvasDrawTool;
}();

exports.CanvasDrawTool = CanvasDrawTool;
},{"./style.constant":7}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chordList = void 0;
var chordList = [{
  id: "1",
  name: "F",
  startString: 1,
  structure: {
    strings: {
      sixthString: [1],
      fifthString: [1, 3],
      fourthString: [1, 3],
      thirdString: [1, 2],
      secondStrind: [1],
      firstString: [1]
    }
  }
}, {
  id: "2",
  name: "F7",
  startString: 1,
  structure: {
    strings: {
      sixthString: [1],
      fifthString: [1, 3],
      fourthString: [1],
      thirdString: [1, 2],
      secondStrind: [1],
      firstString: [1]
    }
  }
}, {
  id: "3",
  name: "Fm",
  startString: 1,
  structure: {
    strings: {
      sixthString: [1],
      fifthString: [1, 3],
      fourthString: [1, 3],
      thirdString: [1],
      secondStrind: [1],
      firstString: [1]
    }
  }
}, {
  id: "4",
  name: "C",
  startString: 1,
  structure: {
    strings: {
      sixthString: [],
      fifthString: [3],
      fourthString: [2],
      thirdString: [],
      secondStrind: [1],
      firstString: []
    }
  }
}, {
  id: "5",
  name: "C7",
  startString: 1,
  structure: {
    strings: {
      sixthString: [],
      fifthString: [3],
      fourthString: [2],
      thirdString: [3],
      secondStrind: [1],
      firstString: []
    }
  }
}, {
  id: "6",
  name: "Cm",
  startString: 2,
  structure: {
    strings: {
      sixthString: [2],
      fifthString: [2],
      fourthString: [2, 4],
      thirdString: [2, 4],
      secondStrind: [2, 3],
      firstString: [2]
    }
  }
}, {
  id: "7",
  name: "D",
  startString: 1,
  structure: {
    strings: {
      sixthString: [],
      fifthString: [],
      fourthString: [],
      thirdString: [2],
      secondStrind: [3],
      firstString: [2]
    }
  }
}, {
  id: "8",
  name: "D7",
  startString: 1,
  structure: {
    strings: {
      sixthString: [],
      fifthString: [],
      fourthString: [],
      thirdString: [2],
      secondStrind: [1],
      firstString: [2]
    }
  }
}, {
  id: "9",
  name: "Dm",
  startString: 1,
  structure: {
    strings: {
      sixthString: [],
      fifthString: [],
      fourthString: [],
      thirdString: [2],
      secondStrind: [3],
      firstString: [1]
    }
  }
}, {
  id: "10",
  name: "E",
  startString: 1,
  structure: {
    strings: {
      sixthString: [],
      fifthString: [2],
      fourthString: [2],
      thirdString: [1],
      secondStrind: [],
      firstString: []
    }
  }
}, {
  id: "11",
  name: "E7",
  startString: 1,
  structure: {
    strings: {
      sixthString: [],
      fifthString: [2],
      fourthString: [],
      thirdString: [1],
      secondStrind: [],
      firstString: []
    }
  }
}, {
  id: "11",
  name: "Em",
  startString: 1,
  structure: {
    strings: {
      sixthString: [],
      fifthString: [2],
      fourthString: [2],
      thirdString: [],
      secondStrind: [],
      firstString: []
    }
  }
}, {
  id: "12",
  name: "G",
  startString: 1,
  structure: {
    strings: {
      sixthString: [3],
      fifthString: [2],
      fourthString: [],
      thirdString: [],
      secondStrind: [],
      firstString: [3]
    }
  }
}, {
  id: "13",
  name: "G7",
  startString: 1,
  structure: {
    strings: {
      sixthString: [3],
      fifthString: [2],
      fourthString: [],
      thirdString: [],
      secondStrind: [],
      firstString: [1]
    }
  }
}, {
  id: "14",
  name: "Gm",
  startString: 2,
  structure: {
    strings: {
      sixthString: [2, 5],
      fifthString: [2, 5],
      fourthString: [2],
      thirdString: [2],
      secondStrind: [2],
      firstString: [2]
    }
  }
}, {
  id: "15",
  name: "A",
  startString: 1,
  structure: {
    strings: {
      sixthString: [],
      fifthString: [],
      fourthString: [2],
      thirdString: [2],
      secondStrind: [2],
      firstString: []
    }
  }
}, {
  id: "16",
  name: "A7",
  startString: 1,
  structure: {
    strings: {
      sixthString: [],
      fifthString: [],
      fourthString: [2],
      thirdString: [],
      secondStrind: [2],
      firstString: []
    }
  }
}, {
  id: "17",
  name: "Am",
  startString: 1,
  structure: {
    strings: {
      sixthString: [],
      fifthString: [],
      fourthString: [2],
      thirdString: [2],
      secondStrind: [1],
      firstString: []
    }
  }
}, {
  id: "18",
  name: "B",
  startString: 2,
  structure: {
    strings: {
      sixthString: [2],
      fifthString: [2],
      fourthString: [2, 4],
      thirdString: [2, 4],
      secondStrind: [2, 4],
      firstString: [2]
    }
  }
}, {
  id: "19",
  name: "Bm",
  startString: 2,
  structure: {
    strings: {
      sixthString: [2],
      fifthString: [2],
      fourthString: [2, 4],
      thirdString: [2, 4],
      secondStrind: [2, 3],
      firstString: [2]
    }
  }
}, {
  id: "20",
  name: "B7",
  startString: 1,
  structure: {
    strings: {
      sixthString: [],
      fifthString: [2],
      fourthString: [1],
      thirdString: [2],
      secondStrind: [],
      firstString: [2]
    }
  }
}];
exports.chordList = chordList;
},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChordCreator = void 0;

var _style = require("./style.constant");

var _attributeGetter = require("./attribute-getter");

var _commonTools = require("./common-tools");

var _canvasDrawTool = require("./canvas-draw-tool");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ChordCreator =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(ChordCreator, _HTMLElement);

  function ChordCreator() {
    var _this;

    _classCallCheck(this, ChordCreator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChordCreator).call(this));
    _this.attrGetter;
    _this.canvasSettings = {
      reflect: {
        horizontal: false,
        vertical: false
      }
    };
    _this.customAttributes = {
      chords: [],
      size: null,
      theme: "light"
    };

    _this.initAll();

    return _this;
  }

  _createClass(ChordCreator, [{
    key: "initAll",
    value: function initAll() {
      var _this2 = this;

      this.id = "single-chord-component-".concat((0, _commonTools.makeIdEnding)());
      this.attachShadow({
        mode: "open"
      });
      this.shadowRoot.innerHTML = "<div>Loading data</div>";
      this.chordComponentRef = document.getElementById(this.id);
      this.attrGetter = new _attributeGetter.AttrGetter(this.chordComponentRef);

      if (this.attrGetter.resolveChordArray().length) {
        this.initAttributes();
        this.shadowRoot.innerHTML = this.resolveFinalTemplate();
        this.customAttributes.chords.map(function (chord) {
          var customAttributes = _objectSpread({}, _this2.customAttributes, {
            reflection: _this2.canvasSettings.reflect
          });

          new _canvasDrawTool.CanvasDrawTool(_this2.initCanvas(chord), chord, customAttributes).draw();
        });
      } else {
        this.shadowRoot.innerHTML = "<div>Unknown chord</div>";
      }
    }
  }, {
    key: "initAttributes",
    value: function initAttributes() {
      this.initChords();
      this.initSize();
      this.initTheme();
      this.initReflectAttr();
    }
  }, {
    key: "initSize",
    value: function initSize() {
      this.customAttributes.size = this.attrGetter.resolveSize();
    }
  }, {
    key: "initChords",
    value: function initChords() {
      this.customAttributes.chords = this.attrGetter.resolveChordArray();
    }
  }, {
    key: "initReflectAttr",
    value: function initReflectAttr() {
      this.canvasSettings.reflect = this.attrGetter.resolveReflectAttr();
    }
  }, {
    key: "initTheme",
    value: function initTheme() {
      this.customAttributes.theme = this.attrGetter.resolveTheme();
    }
  }, {
    key: "initCanvas",
    value: function initCanvas(chord) {
      var canvasRef = {
        canvas: {},
        ctx: {}
      };
      canvasRef.canvas = this.shadowRoot.getElementById(chord.componentCanvasId);
      canvasRef.ctx = canvasRef.canvas ? canvasRef.canvas.getContext("2d") : null;
      return canvasRef;
    }
  }, {
    key: "getCommonTemplete",
    value: function getCommonTemplete(chord, canvasId) {
      var template = "\n    <div class=\"main-container\">\n        <div class=\"accord-description\">\n            <div class=\"description-element\">\n                ".concat(chord.name, "\n            </div>\n            <div class=\"description-element row-number-container\">\n                ").concat(chord.startString, "\n                </div>\n        </div>\n        <canvas id=").concat(canvasId, "\n            class=\"canvas-style\"\n            width=").concat(this.canvasSettings.canvasWidth, "\n            height=").concat(this.canvasSettings.canvasHeight, "/>\n    </div>                                    \n    ");
      return template;
    }
  }, {
    key: "resolveFinalTemplate",
    value: function resolveFinalTemplate() {
      var _this3 = this;

      var styles = "<style>\n    .accord-description {\n        display: flex;\n        justify-content: space-between;\n        border: solid ".concat(_style.styleConstants.colors.borderColor[this.customAttributes.theme], " 1px;\n        border-bottom: none;\n        font-size: ").concat(_style.styleConstants.fontSize.normal * this.customAttributes.size, "px;\n        color: ").concat(_style.styleConstants.colors.textColor[this.customAttributes.theme], ";\n        background-color: ").concat(_style.styleConstants.colors.backgroundColor[this.customAttributes.theme], ";\n    }\n    .description-element {\n        display: inline-block;\n        width: 50%;\n        padding-top: 2px;\n        padding-left: 5px;\n    }\n        .row-number-container {\n        display: inline-block;\n        text-align: right;\n        padding-right: 13px;\n    }\n    .main-container {\n        width: auto;\n        display: inline-block;\n        margin: 20px;\n        color: ").concat(_style.styleConstants.colors.borderColor[this.customAttributes.theme], ";\n    }\n    .canvas-style {\n        border: solid ").concat(_style.styleConstants.colors.borderColor[this.customAttributes.theme], " 1px;\n        border-top: none;\n    }\n</style>");
      var template = "";
      this.customAttributes.chords.map(function (el) {
        template += _this3.getCommonTemplete(el, el.componentCanvasId);
      });
      return template + styles;
    }
  }]);

  return ChordCreator;
}(_wrapNativeSuper(HTMLElement));

exports.ChordCreator = ChordCreator;
},{"./attribute-getter":1,"./canvas-draw-tool":2,"./common-tools":5,"./style.constant":7}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeIdEnding = makeIdEnding;

function makeIdEnding() {
  var text = "-";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return new Date().getTime() + text;
}
},{}],6:[function(require,module,exports){
"use strict";

var _chord = require("./chord");

customElements.define("chord-creator", _chord.ChordCreator);
},{"./chord":4}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sizeList = exports.styleConstants = void 0;
var sizeList = {
  medium: 1,
  large: 2,
  small: 0.9
};
exports.sizeList = sizeList;
var styleConstants = {
  fontSize: {
    normal: 14
  },
  colors: {
    circleColor: {
      dark: "#FFFFFF",
      light: "#000000"
    },
    basisColor: {
      dark: "#795548",
      light: "#E5CE8C"
    },
    stringsColor: {
      dark: "#cddc39",
      light: "#6D5454"
    },
    rowDividerColor: {
      dark: "#000000",
      light: "#FFFFFF"
    },
    borderColor: {
      dark: "#FFFFFF",
      light: "#000000"
    },
    textColor: {
      dark: "#FFFFFF",
      light: "#000000"
    },
    backgroundColor: {
      dark: "#000000",
      light: "#FFFFFF"
    }
  }
};
exports.styleConstants = styleConstants;
},{}]},{},[6]);
