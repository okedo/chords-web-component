(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
"use strict";

var _chordList = require("./chord-list");

var _styleConstants = require("./style-constants");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var SingleChord =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(SingleChord, _HTMLElement);

  function SingleChord() {
    var _this;

    _classCallCheck(this, SingleChord);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SingleChord).call(this));
    _this.canvasSettings = {
      canvasWidth: 390,
      canvasHeight: 140,
      maxRow: 12,
      reflect: {
        horizontal: false,
        vertical: false
      },
      rowWidth: 30,
      stringHeight: 20
    };
    _this.customAttributes = {
      currentChord: {},
      size: _styleConstants.sizeList.medium,
      theme: "light"
    };

    _this.initAll();

    return _this;
  }

  _createClass(SingleChord, [{
    key: "initAll",
    value: function initAll() {
      this.id = "single-chord-component-".concat(this.makeIdEnding());
      this.attachShadow({
        mode: "open"
      });
      this.shadowRoot.innerHTML = "<div>Loading data</div>";
      this.chordComponentRef = document.getElementById(this.id);

      if (this.getCurrentChord(this.getChordNameAttr())) {
        this.initAttributes();
        this.findBorders();
        this.initSize();
        this.shadowRoot.innerHTML = this.getCurrentTemplete();
        this.initCanvas();
        this.calculateCanvasSize();
        this.canvasSettings.canvas.setAttribute("height", this.canvasSettings.canvasHeight);
        this.canvasSettings.canvas.setAttribute("width", this.canvasSettings.canvasWidth);
        this.drawChord();
      } else {
        this.shadowRoot.innerHTML = "<div>Unknown chord</div>";
      }
    }
  }, {
    key: "initSize",
    value: function initSize() {
      this.canvasSettings.stringHeight = this.canvasSettings.stringHeight * this.customAttributes.size;
      this.canvasSettings.rowWidth = this.canvasSettings.stringHeight * this.customAttributes.size;
    }
  }, {
    key: "getChordNameAttr",
    value: function getChordNameAttr() {
      return this.chordComponentRef.getAttribute("chord");
    }
  }, {
    key: "getSizeAttr",
    value: function getSizeAttr() {
      return this.chordComponentRef.getAttribute("size");
    }
  }, {
    key: "getThemeAttr",
    value: function getThemeAttr() {
      return this.chordComponentRef.getAttribute("theme");
    }
  }, {
    key: "getReflectAttr",
    value: function getReflectAttr() {
      return this.chordComponentRef.getAttribute("reflect");
    }
  }, {
    key: "resolveReflectAttr",
    value: function resolveReflectAttr(attrStr) {
      var reflectModel = {
        horizontal: false,
        vertical: false
      };
      var reflectData = attrStr && attrStr.length ? attrStr.toLowerCase().split(/\s+|[,.]+/) : "";

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

      this.canvasSettings.reflect = reflectModel;
    }
  }, {
    key: "initAttributes",
    value: function initAttributes() {
      this.resolveSize(this.getSizeAttr());
      this.customAttributes.currentChord = this.getCurrentChord(this.getChordNameAttr());
      this.resolveTheme(this.getThemeAttr());
      this.resolveReflectAttr(this.getReflectAttr());
    }
  }, {
    key: "resolveTheme",
    value: function resolveTheme(themeStr) {
      this.customAttributes.theme = themeStr && themeStr.toLowerCase() == "dark" ? "dark" : "light";
    }
  }, {
    key: "resolveSize",
    value: function resolveSize(size) {
      var sizeParsed = parseFloat("" + size);

      if (isNaN(sizeParsed)) {
        this.customAttributes.size = _styleConstants.sizeList[size] ? _styleConstants.sizeList[size] : _styleConstants.sizeList.medium;
      } else this.customAttributes.size = sizeParsed;

      this.canvasSettings.canvasHeight = this.canvasSettings.canvasHeight * this.customAttributes.size;
      this.canvasSettings.canvasWidth = this.canvasSettings.canvasWidth * this.customAttributes.size;
    }
  }, {
    key: "getCurrentChord",
    value: function getCurrentChord(chordName) {
      return _chordList.chordList.find(function (el) {
        return el.name.toUpperCase() == chordName.toUpperCase();
      });
    }
  }, {
    key: "initCanvas",
    value: function initCanvas() {
      this.canvasSettings.canvas = this.shadowRoot.querySelector("canvas");
      this.canvasSettings.ctx = this.canvasSettings.canvas ? this.canvasSettings.canvas.getContext("2d") : null;
      this.resolveChordReflection();
    }
  }, {
    key: "drawBasis",
    value: function drawBasis() {
      this.drawRectangle(_styleConstants.styleConstants.colors.basisColor[this.customAttributes.theme], 0, 0, this.canvasSettings.canvasHeight, this.canvasSettings.canvasWidth);

      for (var i = 1; i <= 12; i++) {
        this.drawALine(_styleConstants.styleConstants.colors.rowDividerColor[this.customAttributes.theme], i * this.canvasSettings.rowWidth, 0, i * this.canvasSettings.rowWidth, this.canvasSettings.canvasHeight);
      }

      for (var _i = 0; _i <= 6; _i++) {
        this.drawALine(_styleConstants.styleConstants.colors.stringsColor[this.customAttributes.theme], 0, _i * this.canvasSettings.stringHeight, this.canvasSettings.canvasWidth, _i * this.canvasSettings.stringHeight);
      }
    }
  }, {
    key: "drawRectangle",
    value: function drawRectangle(color, positionY, positionX, width, height) {
      var ctx = this.canvasSettings.ctx;

      if (ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(positionX, positionY, height, width);
      }
    }
  }, {
    key: "drawChord",
    value: function drawChord() {
      var _this2 = this;

      var stringHeight = this.canvasSettings.stringHeight;
      var currentStringHigth = this.canvasSettings.stringHeight;
      var pressedStringRows = [];
      var circleColor = _styleConstants.styleConstants.colors.circleColor[this.customAttributes.theme];
      this.drawBasis();

      for (var stringG in this.customAttributes.currentChord.structure.strings) {
        if (this.customAttributes.currentChord.structure.strings.hasOwnProperty(stringG)) {
          this.customAttributes.currentChord.structure.strings[stringG].forEach(function (element) {
            pressedStringRows.push(element);

            _this2.drawCircle(5 * _this2.customAttributes.size, circleColor, circleColor, _this2.calculateElementHorizontalPosition(element), currentStringHigth);
          });
          currentStringHigth += stringHeight;
        }
      }

      var minRow = Math.min.apply(null, pressedStringRows);

      if (pressedStringRows.filter(function (el) {
        return el === minRow;
      }).length === 6) {
        this.drawBare(minRow);
      }
    }
  }, {
    key: "findBorders",
    value: function findBorders() {
      var strings = this.customAttributes.currentChord.structure.strings;
      var max = 1;
      var min = 12;

      for (var st in strings) {
        if (strings.hasOwnProperty(st)) {
          max = Math.max.apply(null, strings[st]) > max ? Math.max.apply(null, strings[st]) : max;
          min = Math.min.apply(null, strings[st]) < min ? Math.min.apply(null, strings[st]) : min;
        }
      }

      this.canvasSettings.maxRow = max - this.customAttributes.currentChord.startString < 2 ? max + 1 : max;
    }
  }, {
    key: "calculateElementHorizontalPosition",
    value: function calculateElementHorizontalPosition(elementPosition) {
      var elementPos = elementPosition - this.customAttributes.currentChord.startString;
      var rowWidth = this.canvasSettings.rowWidth;
      return this.canvasSettings.canvasWidth - elementPos * rowWidth - rowWidth * 0.5;
    }
  }, {
    key: "calculateCanvasSize",
    value: function calculateCanvasSize() {
      this.canvasSettings.canvasWidth = (1 + this.canvasSettings.maxRow - this.customAttributes.currentChord.startString) * this.canvasSettings.rowWidth;
    }
  }, {
    key: "drawCircle",
    value: function drawCircle(size, color, fill, horizontal, vertical) {
      var ctx = this.canvasSettings.ctx;

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
      var ctx = this.canvasSettings.ctx;

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
    value: function drawBare(row) {
      this.drawALine(_styleConstants.styleConstants.colors.circleColor[this.customAttributes.theme], this.calculateElementHorizontalPosition(row), 5 * this.customAttributes.size, this.calculateElementHorizontalPosition(row), this.canvasSettings.canvasHeight - 5, 15 * this.customAttributes.size);
    }
  }, {
    key: "resolveChordReflection",
    value: function resolveChordReflection() {
      if (this.canvasSettings.reflect.horizontal) {
        this.canvasSettings.canvas.style += "; transform: scaleX(-1);";
      }

      if (this.canvasSettings.reflect.vertical) {
        this.canvasSettings.canvas.style += "; transform: scaleY(-1);";
      }
    }
  }, {
    key: "getCurrentTemplete",
    value: function getCurrentTemplete() {
      var template = "\n    <div class=\"main-container\">\n        <div class=\"accord-description\">\n            <div class=\"description-element\">\n                ".concat(this.customAttributes.currentChord.name, "\n            </div>\n            <div class=\"description-element row-number-container\">\n                ").concat(this.customAttributes.currentChord.startString, "\n                </div>\n        </div>\n        <canvas\n            class=\"canvas-style\"\n            width=").concat(this.canvasSettings.canvasWidth, "\n            height=").concat(this.canvasSettings.canvasHeight, "/>\n    </div>                                    \n    <style>\n        .accord-description {\n            display: flex;\n            justify-content: space-between;\n            border: solid ").concat(_styleConstants.styleConstants.colors.borderColor[this.customAttributes.theme], " 1px;\n            border-bottom: none;\n            font-size: ").concat(_styleConstants.styleConstants.fontSize.normal * this.customAttributes.size, "px;\n            color: ").concat(_styleConstants.styleConstants.colors.textColor[this.customAttributes.theme], ";\n            background-color: ").concat(_styleConstants.styleConstants.colors.backgroundColor[this.customAttributes.theme], ";\n        }\n        .description-element {\n            display: inline-block;\n            width: 50%;\n            padding-top: 2px;\n            padding-left: 5px;\n        }\n            .row-number-container {\n            display: inline-block;\n            text-align: right;\n            padding-right: 13px;\n        }\n        .main-container {\n            width: auto;\n            display: inline-block;\n            margin: 20px;\n            color: ").concat(_styleConstants.styleConstants.colors.borderColor[this.customAttributes.theme], ";\n        }\n        .canvas-style {\n            border: solid ").concat(_styleConstants.styleConstants.colors.borderColor[this.customAttributes.theme], " 1px;\n            border-top: none;\n        }\n    </style>");
      return template;
    }
  }, {
    key: "makeIdEnding",
    value: function makeIdEnding() {
      var text = "-";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return new Date().getTime() + text;
    }
  }]);

  return SingleChord;
}(_wrapNativeSuper(HTMLElement));

customElements.define("single-chord", SingleChord);
},{"./chord-list":1,"./style-constants":3}],3:[function(require,module,exports){
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
},{}]},{},[2]);
