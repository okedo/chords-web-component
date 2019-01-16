!function(){return function t(r,n,e){function i(o,a){if(!n[o]){if(!r[o]){var c="function"==typeof require&&require;if(!a&&c)return c(o,!0);if(s)return s(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[o]={exports:{}};r[o][0].call(l.exports,function(t){return i(r[o][1][t]||t)},l,l.exports,t,r,n,e)}return n[o].exports}for(var s="function"==typeof require&&require,o=0;o<e.length;o++)i(e[o]);return i}}()({1:[function(t,r,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"makeIdEnding",{enumerable:!0,get:function(){return s.makeIdEnding}}),n.AttrGetter=void 0;var e=t("./style.constant"),i=t("./chord-list.constant"),s=t("./common-tools");function o(t,r,n){return r in t?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n,t}function a(t,r){for(var n=0;n<r.length;n++){var e=r[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}var c=function(){function t(r){!function(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t),this.componentRef=r}var r,n,c;return r=t,(n=[{key:"getChords",value:function(){return this.componentRef.getAttribute("chords")}},{key:"getSizeAttr",value:function(){return this.componentRef.getAttribute("size")}},{key:"getThemeAttr",value:function(){return this.componentRef.getAttribute("theme")}},{key:"getReflectAttr",value:function(){return this.componentRef.getAttribute("reflect")}},{key:"resolveReflectAttr",value:function(){var t={horizontal:!1,vertical:!1},r=this.getReflectAttr()&&this.getReflectAttr().length?this.getReflectAttr().toLowerCase().split(/\s+|[,.]+/):"";return r&&r.map(function(r){"horizontal"!=r&&"x"!=r||(t.horizontal=!0),"vertical"!=r&&"y"!=r||(t.vertical=!0)}),t}},{key:"resolveTheme",value:function(){return this.getThemeAttr()&&"dark"==this.getThemeAttr().toLowerCase()?"dark":"light"}},{key:"resolveSize",value:function(){var t=this.getSizeAttr(),r=parseFloat(""+t);e.sizeList.medium;return isNaN(r)?e.sizeList[t]?e.sizeList[t]:e.sizeList.medium:r}},{key:"resolveCurrentChord",value:function(){var t=this;return this.getChords()?i.chordList.find(function(r){return r.name.toUpperCase()==t.getChords().toUpperCase()}):""}},{key:"resolveChordNamesArray",value:function(){var t=this.getChords(),r=[];return t&&t.split(/\s+|[,.]+/).map(function(t){i.chordList.find(function(r){return r.name.toLowerCase()==t.toLowerCase()})&&r.push(t.toLowerCase())}),r}},{key:"resolveChordArray",value:function(){var t=[];return this.resolveChordNamesArray().map(function(r){i.chordList.map(function(n){n.name.toLowerCase()==r&&t.push(function(t){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},e=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.forEach(function(r){o(t,r,n[r])})}return t}({},n,{componentCanvasId:"chord-".concat((0,s.makeIdEnding)())}))})}),t}}])&&a(r.prototype,n),c&&a(r,c),t}();n.AttrGetter=c},{"./chord-list.constant":3,"./common-tools":5,"./style.constant":7}],2:[function(t,r,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.CanvasDrawTool=void 0;var e=t("./style.constant");function i(t,r){for(var n=0;n<r.length;n++){var e=r[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}var s=function(){function t(r,n,e){!function(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t),this.chordData=n,this.canvas=r,this.customAttributes=e}var r,n,s;return r=t,(n=[{key:"draw",value:function(){var t=this.chordData,r={defaults:{canvasWidth:390,canvasHeight:140,rowWidth:30,stringHeight:20},ref:this.canvas,canvasSettings:{}};r.canvasSettings={canvasHeight:r.defaults.canvasHeight*this.customAttributes.size,canvasWidth:r.defaults.canvasWidth*this.customAttributes.size,rowWidth:r.defaults.rowWidth*this.customAttributes.size,stringHeight:r.defaults.stringHeight*this.customAttributes.size,reflection:this.customAttributes.reflection},r.canvasSettings.canvasWidth=this.calculateCanvasSize(r,t,this.findBorders(t)),this.updateCanvasSize(r.ref.canvas,r.canvasSettings),this.drawChord(t,r),this.resolveChordReflection(r)}},{key:"updateCanvasSize",value:function(t,r){t.setAttribute("height",r.canvasHeight),t.setAttribute("width",r.canvasWidth)}},{key:"drawBasis",value:function(t){this.drawRectangle(t.ref,e.styleConstants.colors.basisColor[this.customAttributes.theme],0,0,t.canvasSettings.canvasHeight,t.canvasSettings.canvasWidth);for(var r=1;r<=12;r++)this.drawALine(t.ref,e.styleConstants.colors.rowDividerColor[this.customAttributes.theme],r*t.canvasSettings.rowWidth,0,r*t.canvasSettings.rowWidth,t.canvasSettings.canvasHeight);for(var n=0;n<=6;n++)this.drawALine(t.ref,e.styleConstants.colors.stringsColor[this.customAttributes.theme],0,n*t.canvasSettings.stringHeight,t.canvasSettings.canvasWidth,n*t.canvasSettings.stringHeight)}},{key:"drawRectangle",value:function(t,r,n,e,i,s){var o=t.ctx;o&&(o.fillStyle=r,o.fillRect(e,n,s,i))}},{key:"drawChord",value:function(t,r){var n=this,i=r.canvasSettings.stringHeight,s=[],o=e.styleConstants.colors.circleColor[this.customAttributes.theme];for(var a in this.drawBasis(r),t.structure.strings)t.structure.strings.hasOwnProperty(a)&&(t.structure.strings[a].forEach(function(e){s.push(e),n.drawCircle(r.ref,5*n.customAttributes.size,o,o,n.calculateElementHorizontalPosition(r,t,e),i)}),i+=r.canvasSettings.stringHeight);6===s.filter(function(r){return r===t.startString}).length&&this.drawBare(r,t)}},{key:"findBorders",value:function(t){var r=t.structure.strings,n=1,e=12;for(var i in r)r.hasOwnProperty(i)&&(n=Math.max.apply(null,r[i])>n?Math.max.apply(null,r[i]):n,e=Math.min.apply(null,r[i])<e?Math.min.apply(null,r[i]):e);return n-t.startString<2?n+1:n}},{key:"calculateElementHorizontalPosition",value:function(t,r,n){var e=n-r.startString,i=t.canvasSettings.rowWidth;return t.canvasSettings.canvasWidth-e*i-.5*i}},{key:"calculateCanvasSize",value:function(t,r,n){return(1+n-r.startString)*t.canvasSettings.rowWidth}},{key:"drawCircle",value:function(t,r,n,e,i,s){var o=t.ctx;o&&(o.strokeStyle=n,o.fillStyle=e,o.beginPath(),o.arc(i,s,r,0,2*Math.PI),o.stroke(),o.fill())}},{key:"drawALine",value:function(t,r,n,e,i,s){var o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,a=t.ctx;a&&(a.strokeStyle=r,a.beginPath(),a.moveTo(n,e),a.lineTo(i,s),a.lineWidth=o||1,a.stroke())}},{key:"drawBare",value:function(t,r){var n=this.calculateElementHorizontalPosition(t,r,r.startString);this.drawALine(t.ref,e.styleConstants.colors.circleColor[this.customAttributes.theme],n,5*this.customAttributes.size,n,t.canvasSettings.canvasHeight-5,15*this.customAttributes.size)}},{key:"resolveChordReflection",value:function(t){t.canvasSettings.reflection.horizontal&&(t.ref.canvas.style+="; transform: scaleX(-1);"),t.canvasSettings.reflection.vertical&&(t.ref.canvas.style+="; transform: scaleY(-1);")}}])&&i(r.prototype,n),s&&i(r,s),t}();n.CanvasDrawTool=s},{"./style.constant":7}],3:[function(t,r,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.chordList=void 0;n.chordList=[{id:"1",name:"F",startString:1,structure:{strings:{sixthString:[1],fifthString:[1,3],fourthString:[1,3],thirdString:[1,2],secondStrind:[1],firstString:[1]}}},{id:"2",name:"F7",startString:1,structure:{strings:{sixthString:[1],fifthString:[1,3],fourthString:[1],thirdString:[1,2],secondStrind:[1],firstString:[1]}}},{id:"3",name:"Fm",startString:1,structure:{strings:{sixthString:[1],fifthString:[1,3],fourthString:[1,3],thirdString:[1],secondStrind:[1],firstString:[1]}}},{id:"4",name:"C",startString:1,structure:{strings:{sixthString:[],fifthString:[3],fourthString:[2],thirdString:[],secondStrind:[1],firstString:[]}}},{id:"5",name:"C7",startString:1,structure:{strings:{sixthString:[],fifthString:[3],fourthString:[2],thirdString:[3],secondStrind:[1],firstString:[]}}},{id:"6",name:"Cm",startString:2,structure:{strings:{sixthString:[2],fifthString:[2],fourthString:[2,4],thirdString:[2,4],secondStrind:[2,3],firstString:[2]}}},{id:"7",name:"D",startString:1,structure:{strings:{sixthString:[],fifthString:[],fourthString:[],thirdString:[2],secondStrind:[3],firstString:[2]}}},{id:"8",name:"D7",startString:1,structure:{strings:{sixthString:[],fifthString:[],fourthString:[],thirdString:[2],secondStrind:[1],firstString:[2]}}},{id:"9",name:"Dm",startString:1,structure:{strings:{sixthString:[],fifthString:[],fourthString:[],thirdString:[2],secondStrind:[3],firstString:[1]}}},{id:"10",name:"E",startString:1,structure:{strings:{sixthString:[],fifthString:[2],fourthString:[2],thirdString:[1],secondStrind:[],firstString:[]}}},{id:"11",name:"E7",startString:1,structure:{strings:{sixthString:[],fifthString:[2],fourthString:[],thirdString:[1],secondStrind:[],firstString:[]}}},{id:"11",name:"Em",startString:1,structure:{strings:{sixthString:[],fifthString:[2],fourthString:[2],thirdString:[],secondStrind:[],firstString:[]}}},{id:"12",name:"G",startString:1,structure:{strings:{sixthString:[3],fifthString:[2],fourthString:[],thirdString:[],secondStrind:[],firstString:[3]}}},{id:"13",name:"G7",startString:1,structure:{strings:{sixthString:[3],fifthString:[2],fourthString:[],thirdString:[],secondStrind:[],firstString:[1]}}},{id:"14",name:"Gm",startString:2,structure:{strings:{sixthString:[2,5],fifthString:[2,5],fourthString:[2],thirdString:[2],secondStrind:[2],firstString:[2]}}},{id:"15",name:"A",startString:1,structure:{strings:{sixthString:[],fifthString:[],fourthString:[2],thirdString:[2],secondStrind:[2],firstString:[]}}},{id:"16",name:"A7",startString:1,structure:{strings:{sixthString:[],fifthString:[],fourthString:[2],thirdString:[],secondStrind:[2],firstString:[]}}},{id:"17",name:"Am",startString:1,structure:{strings:{sixthString:[],fifthString:[],fourthString:[2],thirdString:[2],secondStrind:[1],firstString:[]}}},{id:"18",name:"B",startString:2,structure:{strings:{sixthString:[2],fifthString:[2],fourthString:[2,4],thirdString:[2,4],secondStrind:[2,4],firstString:[2]}}},{id:"19",name:"Bm",startString:2,structure:{strings:{sixthString:[2],fifthString:[2],fourthString:[2,4],thirdString:[2,4],secondStrind:[2,3],firstString:[2]}}},{id:"20",name:"B7",startString:1,structure:{strings:{sixthString:[],fifthString:[2],fourthString:[1],thirdString:[2],secondStrind:[],firstString:[2]}}}]},{}],4:[function(t,r,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.ChordCreator=void 0;var e=t("./style.constant"),i=t("./attribute-getter"),s=t("./common-tools"),o=t("./canvas-draw-tool");function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function c(t,r,n){return r in t?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n,t}function u(t,r){for(var n=0;n<r.length;n++){var e=r[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function l(t,r){return!r||"object"!==a(r)&&"function"!=typeof r?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):r}function h(t){var r="function"==typeof Map?new Map:void 0;return(h=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==r){if(r.has(t))return r.get(t);r.set(t,e)}function e(){return f(t,arguments,g(this).constructor)}return e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),d(e,t)})(t)}function f(t,r,n){return(f=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}()?Reflect.construct:function(t,r,n){var e=[null];e.push.apply(e,r);var i=new(Function.bind.apply(t,e));return n&&d(i,n.prototype),i}).apply(null,arguments)}function d(t,r){return(d=Object.setPrototypeOf||function(t,r){return t.__proto__=r,t})(t,r)}function g(t){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var v=function(t){function r(){var t;return function(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,r),(t=l(this,g(r).call(this))).attrGetter,t.canvasSettings={reflect:{horizontal:!1,vertical:!1}},t.customAttributes={chords:[],size:null,theme:"light"},t.initAll(),t}var n,a,f;return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),r&&d(t,r)}(r,h(HTMLElement)),n=r,(a=[{key:"initAll",value:function(){var t=this;this.id="single-chord-component-".concat((0,s.makeIdEnding)()),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML="<div>Loading data</div>",this.chordComponentRef=document.getElementById(this.id),this.attrGetter=new i.AttrGetter(this.chordComponentRef),this.attrGetter.resolveChordArray().length?(this.initAttributes(),this.shadowRoot.innerHTML=this.resolveFinalTemplate(),this.customAttributes.chords.map(function(r){var n=function(t){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},e=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.forEach(function(r){c(t,r,n[r])})}return t}({},t.customAttributes,{reflection:t.canvasSettings.reflect});new o.CanvasDrawTool(t.initCanvas(r),r,n).draw()})):this.shadowRoot.innerHTML="<div>Unknown chord</div>"}},{key:"initAttributes",value:function(){this.initChords(),this.initSize(),this.initTheme(),this.initReflectAttr()}},{key:"initSize",value:function(){this.customAttributes.size=this.attrGetter.resolveSize()}},{key:"initChords",value:function(){this.customAttributes.chords=this.attrGetter.resolveChordArray()}},{key:"initReflectAttr",value:function(){this.canvasSettings.reflect=this.attrGetter.resolveReflectAttr()}},{key:"initTheme",value:function(){this.customAttributes.theme=this.attrGetter.resolveTheme()}},{key:"initCanvas",value:function(t){var r={canvas:{},ctx:{}};return r.canvas=this.shadowRoot.getElementById(t.componentCanvasId),r.ctx=r.canvas?r.canvas.getContext("2d"):null,r}},{key:"getCommonTemplete",value:function(t,r){return'\n    <div class="main-container">\n        <div class="accord-description">\n            <div class="description-element">\n                '.concat(t.name,'\n            </div>\n            <div class="description-element row-number-container">\n                ').concat(t.startString,"\n                </div>\n        </div>\n        <canvas id=").concat(r,'\n            class="canvas-style"\n            width=').concat(this.canvasSettings.canvasWidth,"\n            height=").concat(this.canvasSettings.canvasHeight,"/>\n    </div>                                    \n    ")}},{key:"resolveFinalTemplate",value:function(){var t=this,r="<style>\n    .accord-description {\n        display: flex;\n        justify-content: space-between;\n        border: solid ".concat(e.styleConstants.colors.borderColor[this.customAttributes.theme]," 1px;\n        border-bottom: none;\n        font-size: ").concat(e.styleConstants.fontSize.normal*this.customAttributes.size,"px;\n        color: ").concat(e.styleConstants.colors.textColor[this.customAttributes.theme],";\n        background-color: ").concat(e.styleConstants.colors.backgroundColor[this.customAttributes.theme],";\n    }\n    .description-element {\n        display: inline-block;\n        width: 50%;\n        padding-top: 2px;\n        padding-left: 5px;\n    }\n        .row-number-container {\n        display: inline-block;\n        text-align: right;\n        padding-right: 13px;\n    }\n    .main-container {\n        width: auto;\n        display: inline-block;\n        margin: 20px;\n        color: ").concat(e.styleConstants.colors.borderColor[this.customAttributes.theme],";\n    }\n    .canvas-style {\n        border: solid ").concat(e.styleConstants.colors.borderColor[this.customAttributes.theme]," 1px;\n        border-top: none;\n    }\n</style>"),n="";return this.customAttributes.chords.map(function(r){n+=t.getCommonTemplete(r,r.componentCanvasId)}),n+r}}])&&u(n.prototype,a),f&&u(n,f),r}();n.ChordCreator=v},{"./attribute-getter":1,"./canvas-draw-tool":2,"./common-tools":5,"./style.constant":7}],5:[function(t,r,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.makeIdEnding=function(){for(var t="-",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;n<5;n++)t+=r.charAt(Math.floor(Math.random()*r.length));return(new Date).getTime()+t}},{}],6:[function(t,r,n){"use strict";var e=t("./chord");customElements.define("chord-creator",e.ChordCreator)},{"./chord":4}],7:[function(t,r,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.sizeList=n.styleConstants=void 0;n.sizeList={medium:1,large:2,small:.9};n.styleConstants={fontSize:{normal:14},colors:{circleColor:{dark:"#FFFFFF",light:"#000000"},basisColor:{dark:"#795548",light:"#E5CE8C"},stringsColor:{dark:"#cddc39",light:"#6D5454"},rowDividerColor:{dark:"#000000",light:"#FFFFFF"},borderColor:{dark:"#FFFFFF",light:"#000000"},textColor:{dark:"#FFFFFF",light:"#000000"},backgroundColor:{dark:"#000000",light:"#FFFFFF"}}}},{}]},{},[6]);