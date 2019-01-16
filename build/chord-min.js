!function(){return function t(n,r,e){function i(s,a){if(!r[s]){if(!n[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(o)return o(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var l=r[s]={exports:{}};n[s][0].call(l.exports,function(t){return i(n[s][1][t]||t)},l,l.exports,t,n,r,e)}return r[s].exports}for(var o="function"==typeof require&&require,s=0;s<e.length;s++)i(e[s]);return i}}()({1:[function(t,n,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.ChordCreator=void 0;var e=t("./tools/style-tools"),i=t("./tools/attribute-getter"),o=t("./tools/common-tools"),s=t("./tools/canvas-draw-tool"),a=t("./tools/templates");function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,n,r){return n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}function l(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function h(t,n){return!n||"object"!==c(n)&&"function"!=typeof n?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):n}function f(t){var n="function"==typeof Map?new Map:void 0;return(f=function(t){if(null===t||(r=t,-1===Function.toString.call(r).indexOf("[native code]")))return t;var r;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(t))return n.get(t);n.set(t,e)}function e(){return d(t,arguments,v(this).constructor)}return e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),g(e,t)})(t)}function d(t,n,r){return(d=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}()?Reflect.construct:function(t,n,r){var e=[null];e.push.apply(e,n);var i=new(Function.bind.apply(t,e));return r&&g(i,r.prototype),i}).apply(null,arguments)}function g(t,n){return(g=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function v(t){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var S=function(t){function n(){var t;return function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),(t=h(this,v(n).call(this))).attrGetter,t.templatesHolder=new a.TemplatesHolder,t.canvasSettings={reflect:{horizontal:!1,vertical:!1}},t.customAttributes={chords:[],size:null,theme:"light"},t.initAll(),t}var r,c,d;return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&g(t,n)}(n,f(HTMLElement)),r=n,(c=[{key:"initAll",value:function(){var t=this;this.id="single-chord-component-".concat((0,o.makeIdEnding)()),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.templatesHolder.loadingTemplate,this.chordComponentRef=document.getElementById(this.id),this.attrGetter=new i.AttrGetter(this.chordComponentRef),this.attrGetter.chordArray.length?(this.initAttributes(),this.shadowRoot.innerHTML=this.resolveFinalTemplate(),this.customAttributes.chords.map(function(n){var r=function(t){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{},e=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.forEach(function(n){u(t,n,r[n])})}return t}({},t.customAttributes,{reflection:t.canvasSettings.reflect});new s.CanvasDrawTool(t.initCanvas(n),n,r).draw()})):this.shadowRoot.innerHTML=this.templatesHolder.unknownChordTemplate+e.stylesHolder.getUnknownChordTemplateStyleTag()}},{key:"initAttributes",value:function(){this.initChords(),this.initSize(),this.initTheme(),this.initReflectAttr()}},{key:"initSize",value:function(){this.customAttributes.size=this.attrGetter.size}},{key:"initChords",value:function(){this.customAttributes.chords=this.attrGetter.chordArray}},{key:"initReflectAttr",value:function(){this.canvasSettings.reflect=this.attrGetter.reflect}},{key:"initTheme",value:function(){this.customAttributes.theme=this.attrGetter.theme}},{key:"initCanvas",value:function(t){var n={canvas:{},ctx:{}};return n.canvas=this.shadowRoot.getElementById(t.componentCanvasId),n.ctx=n.canvas?n.canvas.getContext("2d"):null,n}},{key:"resolveFinalTemplate",value:function(){var t=this,n=e.stylesHolder.getChordContainerStyleTag(this.customAttributes.theme,this.customAttributes.size),r="";return this.customAttributes.chords.map(function(n){r+=t.templatesHolder.getCommonTemplete(n.name,n.componentCanvasId,n.startString,t.canvasSettings.canvasWidth,t.canvasSettings.canvasHeight,t.canvasSettings.reflect.horizontal)}),r+n}}])&&l(r.prototype,c),d&&l(r,d),n}();r.ChordCreator=S},{"./tools/attribute-getter":3,"./tools/canvas-draw-tool":4,"./tools/common-tools":6,"./tools/style-tools":7,"./tools/templates":8}],2:[function(t,n,r){"use strict";var e=t("./chord");customElements.define("chord-creator",e.ChordCreator)},{"./chord":1}],3:[function(t,n,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"makeIdEnding",{enumerable:!0,get:function(){return o.makeIdEnding}}),r.AttrGetter=void 0;var e=t("./style-tools"),i=t("./chord-list.constant"),o=t("./common-tools");function s(t,n,r){return n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}function a(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}var c=function(){function t(n){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.componentRef=n}var n,r,c;return n=t,(r=[{key:"getChordsAttr",value:function(){return this.componentRef.getAttribute("chords")}},{key:"getSizeAttr",value:function(){return this.componentRef.getAttribute("size")}},{key:"getThemeAttr",value:function(){return this.componentRef.getAttribute("theme")}},{key:"getReflectAttr",value:function(){return this.componentRef.getAttribute("reflect")}},{key:"resolveChordNamesArray",value:function(){var t=this.getChordsAttr(),n=[];return t&&t.split(/\s+|[,.]+/).map(function(t){i.chordList.find(function(n){return n.name.toLowerCase()==t.toLowerCase()})&&n.push(t.toLowerCase())}),n}},{key:"reflect",get:function(){var t={horizontal:!1,vertical:!1},n=this.getReflectAttr()&&this.getReflectAttr().length?this.getReflectAttr().toLowerCase().split(/\s+|[,.]+/):"";return n&&n.map(function(n){"horizontal"!=n&&"x"!=n||(t.horizontal=!0),"vertical"!=n&&"y"!=n||(t.vertical=!0)}),t}},{key:"theme",get:function(){return this.getThemeAttr()&&"dark"==this.getThemeAttr().toLowerCase()?"dark":"light"}},{key:"size",get:function(){var t=this.getSizeAttr(),n=parseFloat(""+t);e.sizeList.medium;return isNaN(n)?e.sizeList[t]?e.sizeList[t]:e.sizeList.medium:n}},{key:"chordArray",get:function(){var t=[];return this.resolveChordNamesArray().map(function(n){i.chordList.map(function(r){r.name.toLowerCase()==n&&t.push(function(t){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{},e=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.forEach(function(n){s(t,n,r[n])})}return t}({},r,{componentCanvasId:"chord-".concat((0,o.makeIdEnding)())}))})}),t}}])&&a(n.prototype,r),c&&a(n,c),t}();r.AttrGetter=c},{"./chord-list.constant":5,"./common-tools":6,"./style-tools":7}],4:[function(t,n,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.CanvasDrawTool=void 0;var e=t("./style-tools");function i(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}var o=function(){function t(n,r,e){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.chordData=r,this.canvas={};var i={defaults:{canvasWidth:390,canvasHeight:140,rowWidth:30,stringHeight:20},ref:n,canvasSettings:{},customAttributes:e};i.canvasSettings={canvasHeight:i.defaults.canvasHeight*e.size,canvasWidth:i.defaults.canvasWidth*e.size,rowWidth:i.defaults.rowWidth*e.size,stringHeight:i.defaults.stringHeight*e.size},this.canvas=i,this.canvas.canvasSettings.canvasWidth=this.calculateCanvasSize(this.findBorders())}var n,r,o;return n=t,(r=[{key:"draw",value:function(){this.updateCanvasSize(),this.drawChord(),this.resolveChordReflection()}},{key:"updateCanvasSize",value:function(){this.canvas.ref.canvas.setAttribute("height",this.canvas.canvasSettings.canvasHeight),this.canvas.ref.canvas.setAttribute("width",this.canvas.canvasSettings.canvasWidth)}},{key:"drawBasis",value:function(){this.drawRectangle(e.STYLE_CONSTANTS.colors.basisColor[this.canvas.customAttributes.theme],0,0,this.canvas.canvasSettings.canvasHeight,this.canvas.canvasSettings.canvasWidth);for(var t=1;t<=12;t++)this.drawALine(e.STYLE_CONSTANTS.colors.rowDividerColor[this.canvas.customAttributes.theme],t*this.canvas.canvasSettings.rowWidth,0,t*this.canvas.canvasSettings.rowWidth,this.canvas.canvasSettings.canvasHeight);for(var n=0;n<=6;n++)this.drawALine(e.STYLE_CONSTANTS.colors.stringsColor[this.canvas.customAttributes.theme],0,n*this.canvas.canvasSettings.stringHeight,this.canvas.canvasSettings.canvasWidth,n*this.canvas.canvasSettings.stringHeight)}},{key:"drawRectangle",value:function(t,n,r,e,i){var o=this.canvas.ref.ctx;o&&(o.fillStyle=t,o.fillRect(r,n,i,e))}},{key:"drawChord",value:function(){var t=this,n=this.canvas.canvasSettings.stringHeight,r=[],i=e.STYLE_CONSTANTS.colors.circleColor[this.canvas.customAttributes.theme];for(var o in this.drawBasis(),this.chordData.structure.strings)this.chordData.structure.strings.hasOwnProperty(o)&&(this.chordData.structure.strings[o].forEach(function(e){r.push(e),t.drawCircle(5*t.canvas.customAttributes.size,i,i,t.calculateElementHorizontalPosition(e),n)}),n+=this.canvas.canvasSettings.stringHeight);6===r.filter(function(n){return n===t.chordData.startString}).length&&this.drawBare()}},{key:"findBorders",value:function(){var t=this.chordData.structure.strings,n=1,r=12;for(var e in t)t.hasOwnProperty(e)&&(n=Math.max.apply(null,t[e])>n?Math.max.apply(null,t[e]):n,r=Math.min.apply(null,t[e])<r?Math.min.apply(null,t[e]):r);return n-this.chordData.startString<2?n+1:n}},{key:"calculateElementHorizontalPosition",value:function(t){var n=t-this.chordData.startString,r=this.canvas.canvasSettings.rowWidth;return this.canvas.canvasSettings.canvasWidth-n*r-.5*r}},{key:"calculateCanvasSize",value:function(t){return(1+t-this.chordData.startString)*this.canvas.canvasSettings.rowWidth}},{key:"drawCircle",value:function(t,n,r,e,i){var o=this.canvas.ref.ctx;o&&(o.strokeStyle=n,o.fillStyle=r,o.beginPath(),o.arc(e,i,t,0,2*Math.PI),o.stroke(),o.fill())}},{key:"drawALine",value:function(t,n,r,e,i){var o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,s=this.canvas.ref.ctx;s&&(s.strokeStyle=t,s.beginPath(),s.moveTo(n,r),s.lineTo(e,i),s.lineWidth=o||1,s.stroke())}},{key:"drawBare",value:function(){var t=this.calculateElementHorizontalPosition(this.chordData.startString);this.drawALine(e.STYLE_CONSTANTS.colors.circleColor[this.canvas.customAttributes.theme],t,5*this.canvas.customAttributes.size,t,this.canvas.canvasSettings.canvasHeight-5,15*this.canvas.customAttributes.size)}},{key:"resolveChordReflection",value:function(){var t="; transform: scale(".concat(this.canvas.customAttributes.reflection.horizontal?-1:1,",").concat(this.canvas.customAttributes.reflection.vertical?-1:1,")");this.canvas.ref.canvas.style+=t}}])&&i(n.prototype,r),o&&i(n,o),t}();r.CanvasDrawTool=o},{"./style-tools":7}],5:[function(t,n,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.chordList=void 0;r.chordList=[{id:"1",name:"F",startString:1,structure:{strings:{sixthString:[1],fifthString:[1,3],fourthString:[1,3],thirdString:[1,2],secondStrind:[1],firstString:[1]}}},{id:"2",name:"F7",startString:1,structure:{strings:{sixthString:[1],fifthString:[1,3],fourthString:[1],thirdString:[1,2],secondStrind:[1],firstString:[1]}}},{id:"3",name:"Fm",startString:1,structure:{strings:{sixthString:[1],fifthString:[1,3],fourthString:[1,3],thirdString:[1],secondStrind:[1],firstString:[1]}}},{id:"4",name:"C",startString:1,structure:{strings:{sixthString:[],fifthString:[3],fourthString:[2],thirdString:[],secondStrind:[1],firstString:[]}}},{id:"5",name:"C7",startString:1,structure:{strings:{sixthString:[],fifthString:[3],fourthString:[2],thirdString:[3],secondStrind:[1],firstString:[]}}},{id:"6",name:"Cm",startString:2,structure:{strings:{sixthString:[2],fifthString:[2],fourthString:[2,4],thirdString:[2,4],secondStrind:[2,3],firstString:[2]}}},{id:"7",name:"D",startString:1,structure:{strings:{sixthString:[],fifthString:[],fourthString:[],thirdString:[2],secondStrind:[3],firstString:[2]}}},{id:"8",name:"D7",startString:1,structure:{strings:{sixthString:[],fifthString:[],fourthString:[],thirdString:[2],secondStrind:[1],firstString:[2]}}},{id:"9",name:"Dm",startString:1,structure:{strings:{sixthString:[],fifthString:[],fourthString:[],thirdString:[2],secondStrind:[3],firstString:[1]}}},{id:"10",name:"E",startString:1,structure:{strings:{sixthString:[],fifthString:[2],fourthString:[2],thirdString:[1],secondStrind:[],firstString:[]}}},{id:"11",name:"E7",startString:1,structure:{strings:{sixthString:[],fifthString:[2],fourthString:[],thirdString:[1],secondStrind:[],firstString:[]}}},{id:"11",name:"Em",startString:1,structure:{strings:{sixthString:[],fifthString:[2],fourthString:[2],thirdString:[],secondStrind:[],firstString:[]}}},{id:"12",name:"G",startString:1,structure:{strings:{sixthString:[3],fifthString:[2],fourthString:[],thirdString:[],secondStrind:[],firstString:[3]}}},{id:"13",name:"G7",startString:1,structure:{strings:{sixthString:[3],fifthString:[2],fourthString:[],thirdString:[],secondStrind:[],firstString:[1]}}},{id:"14",name:"Gm",startString:2,structure:{strings:{sixthString:[2,5],fifthString:[2,5],fourthString:[2],thirdString:[2],secondStrind:[2],firstString:[2]}}},{id:"15",name:"A",startString:1,structure:{strings:{sixthString:[],fifthString:[],fourthString:[2],thirdString:[2],secondStrind:[2],firstString:[]}}},{id:"16",name:"A7",startString:1,structure:{strings:{sixthString:[],fifthString:[],fourthString:[2],thirdString:[],secondStrind:[2],firstString:[]}}},{id:"17",name:"Am",startString:1,structure:{strings:{sixthString:[],fifthString:[],fourthString:[2],thirdString:[2],secondStrind:[1],firstString:[]}}},{id:"18",name:"B",startString:2,structure:{strings:{sixthString:[2],fifthString:[2],fourthString:[2,4],thirdString:[2,4],secondStrind:[2,4],firstString:[2]}}},{id:"19",name:"Bm",startString:2,structure:{strings:{sixthString:[2],fifthString:[2],fourthString:[2,4],thirdString:[2,4],secondStrind:[2,3],firstString:[2]}}},{id:"20",name:"B7",startString:1,structure:{strings:{sixthString:[],fifthString:[2],fourthString:[1],thirdString:[2],secondStrind:[],firstString:[2]}}}]},{}],6:[function(t,n,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.makeIdEnding=function(){for(var t="-",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=0;r<5;r++)t+=n.charAt(Math.floor(Math.random()*n.length));return(new Date).getTime()+t}},{}],7:[function(t,n,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.stylesHolder=r.sizeList=r.STYLE_CONSTANTS=void 0;r.sizeList={medium:1,large:2,small:.9};var e={fontSize:{normal:14},colors:{circleColor:{dark:"#FFFFFF",light:"#000000"},basisColor:{dark:"#795548",light:"#E5CE8C"},stringsColor:{dark:"#cddc39",light:"#6D5454"},rowDividerColor:{dark:"#000000",light:"#FFFFFF"},borderColor:{dark:"#FFFFFF",light:"#000000"},textColor:{dark:"#FFFFFF",light:"#000000"},backgroundColor:{dark:"#000000",light:"#FFFFFF"}}};r.STYLE_CONSTANTS=e;var i={getChordContainerStyleTag:function(t,n){return"<style>\n      .accord-description {\n          display: flex;\n          justify-content: space-between;\n          border: solid ".concat(e.colors.borderColor[t]," 1px;\n          border-bottom: none;\n          font-size: ").concat(e.fontSize.normal*n,"px;\n          color: ").concat(e.colors.textColor[t],";\n          background-color: ").concat(e.colors.backgroundColor[t],";\n      }\n      .description-element {\n          display: inline-block;\n          width: 50%;\n          padding-top: 2px;\n          padding-left: 5px;\n      }\n          .row-number-container {\n          display: inline-block;\n          text-align: right;\n          padding-right: 13px;\n      }\n      .main-container {\n          width: auto;\n          display: inline-block;\n          margin: 20px;\n          color: ").concat(e.colors.borderColor[t],";\n      }\n      .canvas-style {\n          border: solid ").concat(e.colors.borderColor[t]," 1px;\n          border-top: none;\n      }\n  </style>")},getUnknownChordTemplateStyleTag:function(){return"<style>\n      .unknown-chord {\n        display: inline-block;\n        margin: 20px;\n      }\n    </style"}};r.stylesHolder=i},{}],8:[function(t,n,r){"use strict";function e(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}Object.defineProperty(r,"__esModule",{value:!0}),r.TemplatesHolder=void 0;var i=function(){function t(){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,r,i;return n=t,(r=[{key:"getCommonTemplete",value:function(t,n,r,e,i,o){return'\n    <div class="main-container">\n        <div class="accord-description">\n            <div class="description-element">\n                '.concat(o?r:t,'\n            </div>\n            <div class="description-element row-number-container">\n                ').concat(o?t:r,"\n                </div>\n        </div>\n        <canvas id=").concat(n,'\n            class="canvas-style"\n            width=').concat(e,"\n            height=").concat(i,"/>\n    </div> ")}},{key:"unknownChordTemplate",get:function(){return"<div class='unknown-chord'>Unknown chord</div>"}},{key:"loadingTemplate",get:function(){return"<div>Loading data</div>"}}])&&e(n.prototype,r),i&&e(n,i),t}();r.TemplatesHolder=i},{}]},{},[2]);