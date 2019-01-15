import { chordList } from "./chord-list";
import { styleConstants, sizeList } from "./style-constants";

class SingleChord extends HTMLElement {
  constructor() {
    super();

    this.canvasSettings = {
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

    this.customAttributes = {
      currentChord: {},
      size: sizeList.medium,
      theme: "light"
    };
    this.initAll();
  }

  initAll() {
    this.id = `single-chord-component-${this.makeIdEnding()}`;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "<div>Loading data</div>";

    this.chordComponentRef = document.getElementById(this.id);
    if (this.getCurrentChord(this.getChordNameAttr())) {
      this.initAttributes();

      this.findBorders();
      this.initSize();
      this.shadowRoot.innerHTML = this.getCurrentTemplete();
      this.initCanvas();

      this.calculateCanvasSize();
      this.canvasSettings.canvas.setAttribute(
        "height",
        this.canvasSettings.canvasHeight
      );
      this.canvasSettings.canvas.setAttribute(
        "width",
        this.canvasSettings.canvasWidth
      );
      this.drawChord();
    } else {
      this.shadowRoot.innerHTML = "<div>Unknown chord</div>";
    }
  }

  initSize() {
    this.canvasSettings.stringHeight =
      this.canvasSettings.stringHeight * this.customAttributes.size;
    this.canvasSettings.rowWidth =
      this.canvasSettings.stringHeight * this.customAttributes.size;
  }

  getChordNameAttr() {
    return this.chordComponentRef.getAttribute("chord");
  }

  getSizeAttr() {
    return this.chordComponentRef.getAttribute("size");
  }

  getThemeAttr() {
    return this.chordComponentRef.getAttribute("theme");
  }

  getReflectAttr() {
    return this.chordComponentRef.getAttribute("reflect");
  }

  resolveReflectAttr(attrStr) {
    const reflectModel = { horizontal: false, vertical: false };
    const reflectData =
      attrStr && attrStr.length ? attrStr.toLowerCase().split(/\s+|[,.]+/) : "";
    if (reflectData) {
      reflectData.map(el => {
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

  initAttributes() {
    this.resolveSize(this.getSizeAttr());

    this.customAttributes.currentChord = this.getCurrentChord(
      this.getChordNameAttr()
    );
    this.resolveTheme(this.getThemeAttr());

    this.resolveReflectAttr(this.getReflectAttr());
  }

  resolveTheme(themeStr) {
    this.customAttributes.theme =
      themeStr && themeStr.toLowerCase() == "dark" ? "dark" : "light";
  }

  resolveSize(size) {
    const sizeParsed = parseFloat("" + size);
    if (isNaN(sizeParsed)) {
      this.customAttributes.size = sizeList[size]
        ? sizeList[size]
        : sizeList.medium;
    } else this.customAttributes.size = sizeParsed;
    this.canvasSettings.canvasHeight =
      this.canvasSettings.canvasHeight * this.customAttributes.size;
    this.canvasSettings.canvasWidth =
      this.canvasSettings.canvasWidth * this.customAttributes.size;
  }

  getCurrentChord(chordName) {
    return chordList.find(
      el => el.name.toUpperCase() == chordName.toUpperCase()
    );
  }

  initCanvas() {
    this.canvasSettings.canvas = this.shadowRoot.querySelector("canvas");
    this.canvasSettings.ctx = this.canvasSettings.canvas
      ? this.canvasSettings.canvas.getContext("2d")
      : null;

    this.resolveChordReflection();
  }

  drawBasis() {
    this.drawRectangle(
      styleConstants.colors.basisColor[this.customAttributes.theme],
      0,
      0,
      this.canvasSettings.canvasHeight,
      this.canvasSettings.canvasWidth
    );
    for (let i = 1; i <= 12; i++) {
      this.drawALine(
        styleConstants.colors.rowDividerColor[this.customAttributes.theme],
        i * this.canvasSettings.rowWidth,
        0,
        i * this.canvasSettings.rowWidth,
        this.canvasSettings.canvasHeight
      );
    }
    for (let i = 0; i <= 6; i++) {
      this.drawALine(
        styleConstants.colors.stringsColor[this.customAttributes.theme],
        0,
        i * this.canvasSettings.stringHeight,
        this.canvasSettings.canvasWidth,
        i * this.canvasSettings.stringHeight
      );
    }
  }

  drawRectangle(color, positionY, positionX, width, height) {
    const ctx = this.canvasSettings.ctx;
    if (ctx) {
      ctx.fillStyle = color;
      ctx.fillRect(positionX, positionY, height, width);
    }
  }

  drawChord() {
    const stringHeight = this.canvasSettings.stringHeight;
    let currentStringHigth = this.canvasSettings.stringHeight;
    const pressedStringRows = [];
    const circleColor =
      styleConstants.colors.circleColor[this.customAttributes.theme];
    this.drawBasis();
    for (const stringG in this.customAttributes.currentChord.structure
      .strings) {
      if (
        this.customAttributes.currentChord.structure.strings.hasOwnProperty(
          stringG
        )
      ) {
        this.customAttributes.currentChord.structure.strings[stringG].forEach(
          element => {
            pressedStringRows.push(element);
            this.drawCircle(
              5 * this.customAttributes.size,
              circleColor,
              circleColor,
              this.calculateElementHorizontalPosition(element),
              currentStringHigth
            );
          }
        );
        currentStringHigth += stringHeight;
      }
    }
    const minRow = Math.min.apply(null, pressedStringRows);
    if (pressedStringRows.filter(el => el === minRow).length === 6) {
      this.drawBare(minRow);
    }
  }

  findBorders() {
    const strings = this.customAttributes.currentChord.structure.strings;
    let max = 1;
    let min = 12;
    for (const st in strings) {
      if (strings.hasOwnProperty(st)) {
        max =
          Math.max.apply(null, strings[st]) > max
            ? Math.max.apply(null, strings[st])
            : max;
        min =
          Math.min.apply(null, strings[st]) < min
            ? Math.min.apply(null, strings[st])
            : min;
      }
    }

    this.canvasSettings.maxRow =
      max - this.customAttributes.currentChord.startString < 2 ? max + 1 : max;
  }

  calculateElementHorizontalPosition(elementPosition) {
    const elementPos =
      elementPosition - this.customAttributes.currentChord.startString;
    const rowWidth = this.canvasSettings.rowWidth;
    return (
      this.canvasSettings.canvasWidth - elementPos * rowWidth - rowWidth * 0.5
    );
  }

  calculateCanvasSize() {
    this.canvasSettings.canvasWidth =
      (1 +
        this.canvasSettings.maxRow -
        this.customAttributes.currentChord.startString) *
      this.canvasSettings.rowWidth;
  }

  drawCircle(size, color, fill, horizontal, vertical) {
    const ctx = this.canvasSettings.ctx;
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(horizontal, vertical, size, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    }
  }

  drawALine(color, xStart, yStart, xEnd, yEnd, lineWidth = 0) {
    const ctx = this.canvasSettings.ctx;
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(xEnd, yEnd);
      ctx.lineWidth = lineWidth ? lineWidth : 1;
      ctx.stroke();
    }
  }

  drawBare(row) {
    this.drawALine(
      styleConstants.colors.circleColor[this.customAttributes.theme],
      this.calculateElementHorizontalPosition(row),
      5 * this.customAttributes.size,
      this.calculateElementHorizontalPosition(row),
      this.canvasSettings.canvasHeight - 5,
      15 * this.customAttributes.size
    );
  }

  resolveChordReflection() {
    if (this.canvasSettings.reflect.horizontal) {
      this.canvasSettings.canvas.style += "; transform: scaleX(-1);";
    }
    if (this.canvasSettings.reflect.vertical) {
      this.canvasSettings.canvas.style += "; transform: scaleY(-1);";
    }
  }

  getCurrentTemplete() {
    const template = `
    <div class="main-container">
        <div class="accord-description">
            <div class="description-element">
                ${this.customAttributes.currentChord.name}
            </div>
            <div class="description-element row-number-container">
                ${this.customAttributes.currentChord.startString}
                </div>
        </div>
        <canvas
            class="canvas-style"
            width=${this.canvasSettings.canvasWidth}
            height=${this.canvasSettings.canvasHeight}/>
    </div>                                    
    <style>
        .accord-description {
            display: flex;
            justify-content: space-between;
            border: solid ${
              styleConstants.colors.borderColor[this.customAttributes.theme]
            } 1px;
            border-bottom: none;
            font-size: ${styleConstants.fontSize.normal *
              this.customAttributes.size}px;
            color: ${
              styleConstants.colors.textColor[this.customAttributes.theme]
            };
            background-color: ${
              styleConstants.colors.backgroundColor[this.customAttributes.theme]
            };
        }
        .description-element {
            display: inline-block;
            width: 50%;
            padding-top: 2px;
            padding-left: 5px;
        }
            .row-number-container {
            display: inline-block;
            text-align: right;
            padding-right: 13px;
        }
        .main-container {
            width: auto;
            display: inline-block;
            margin: 20px;
            color: ${
              styleConstants.colors.borderColor[this.customAttributes.theme]
            };
        }
        .canvas-style {
            border: solid ${
              styleConstants.colors.borderColor[this.customAttributes.theme]
            } 1px;
            border-top: none;
        }
    </style>`;
    return template;
  }

  makeIdEnding() {
    let text = "-";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return new Date().getTime() + text;
  }
}

customElements.define("single-chord", SingleChord);
