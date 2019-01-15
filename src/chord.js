import { chordList } from "./chord-list";
import { styleConstants, sizeList } from "./style-constants";

class SingleChord extends HTMLElement {
  constructor() {
    super();

    this.state = {
      canvasWidth: 390,
      canvasHeight: 140,
      maxRow: 12,
      reflect: true
    };
    this.currentChord = {};

    this.size = sizeList.medium;
    this.rowWidth = 30;
    this.stringHeight = 20;
    this.theme = "light";

    this.idEnding = this.makeIdEnding();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "<div>Loading data</div>";

    this.id = `single-chord-component-${new Date().getTime()}-${this.idEnding}`;

    this.chordComponentRef = document.getElementById(this.id);
    if (this.getCurrentChord(this.getChordNameAttr())) {
      this.initAttributes();
      this.currentChord = this.getCurrentChord(this.getChordNameAttr());
      this.initSize();
      this.shadowRoot.innerHTML = this.getCurrentTemplete();
      this.initCanvas();

      this.findBorders();
      this.calculateCanvasSize();
      this.state.canvas.setAttribute("height", this.state.canvasHeight);
      this.state.canvas.setAttribute("width", this.state.canvasWidth);
      this.drawChord();
    } else {
      this.shadowRoot.innerHTML = "<div>Unknown chord</div>";
    }
  }

  initSize() {
    this.stringHeight = this.stringHeight * this.size;
    this.rowWidth = this.stringHeight * this.size;
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

  initAttributes() {
    this.resolveSize(this.getSizeAttr());
    this.theme = this.getThemeAttr() ? this.getThemeAttr() : "light";
  }

  resolveSize(size) {
    const sizeParsed = parseFloat("" + size);
    if (isNaN(sizeParsed)) {
      this.size = sizeList[size] ? sizeList[size] : sizeList.medium;
    } else this.size = sizeParsed;
    this.state.canvasHeight = this.state.canvasHeight * this.size;
    this.state.canvasWidth = this.state.canvasWidth * this.size;
  }

  getCurrentChord(chordName) {
    return chordList.find(
      el => el.name.toUpperCase() == chordName.toUpperCase()
    );
  }

  initCanvas() {
    const canvasRef = this.shadowRoot.querySelector("canvas");
    const renderingContext = canvasRef ? canvasRef.getContext("2d") : null;
    this.state.canvas = canvasRef;
    this.state.ctx = renderingContext;
    if (this.state.reflect) {
      this.reflectChord();
    }
  }

  drawBasis() {
    this.drawRectangle(
      styleConstants.colors.basisColor[this.theme],
      0,
      0,
      this.state.canvasHeight,
      this.state.canvasWidth
    );
    for (let i = 1; i <= 12; i++) {
      this.drawALine(
        styleConstants.colors.rowDividerColor[this.theme],
        i * this.rowWidth,
        0,
        i * this.rowWidth,
        this.state.canvasHeight
      );
    }
    for (let i = 0; i <= 6; i++) {
      this.drawALine(
        styleConstants.colors.stringsColor[this.theme],
        0,
        i * this.stringHeight,
        this.state.canvasWidth,
        i * this.stringHeight
      );
    }
  }

  drawRectangle(color, positionY, positionX, width, height) {
    const ctx = this.state.ctx;
    if (ctx) {
      ctx.fillStyle = color;
      ctx.fillRect(positionX, positionY, height, width);
    }
  }

  drawChord() {
    const stringHeight = this.stringHeight;
    let currentStringHigth = this.stringHeight;
    const pressedStringRows = [];
    const circleColor = styleConstants.colors.circleColor[this.theme];
    this.drawBasis();
    for (const stringG in this.currentChord.structure.strings) {
      if (this.currentChord.structure.strings.hasOwnProperty(stringG)) {
        this.currentChord.structure.strings[stringG].forEach(element => {
          pressedStringRows.push(element);
          this.drawCircle(
            5 * this.size,
            circleColor,
            circleColor,
            this.calculateElementHorizontalPosition(element),
            currentStringHigth
          );
        });
        currentStringHigth += stringHeight;
      }
    }
    const minRow = Math.min.apply(null, pressedStringRows);
    if (pressedStringRows.filter(el => el === minRow).length === 6) {
      this.drawBare(minRow);
    }
  }

  findBorders() {
    let max = 1;
    let min = 12;
    for (const stringG in this.currentChord.structure.strings) {
      if (this.currentChord.structure.strings.hasOwnProperty(stringG)) {
        max =
          Math.max.apply(null, this.currentChord.structure.strings[stringG]) >
          max
            ? Math.max.apply(null, this.currentChord.structure.strings[stringG])
            : max;
        min =
          Math.min.apply(null, this.currentChord.structure.strings[stringG]) <
          min
            ? Math.min.apply(null, this.currentChord.structure.strings[stringG])
            : min;
      }
    }

    this.state.maxRow = max - this.currentChord.startString < 2 ? max + 1 : max;
  }

  calculateElementHorizontalPosition(elementPosition) {
    const elementPos = elementPosition - this.currentChord.startString;
    const rowWidth = this.rowWidth;
    return this.state.canvasWidth - elementPos * rowWidth - rowWidth * 0.5;
  }

  calculateCanvasSize() {
    const tempWidth =
      (this.state.maxRow - this.currentChord.startString + 1) * this.rowWidth;
    this.state.canvasWidth = tempWidth;
  }

  drawCircle(size, color, fill, horizontal, vertical) {
    const ctx = this.state.ctx;
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
    const ctx = this.state.ctx;
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
      styleConstants.colors.circleColor[this.theme],
      this.calculateElementHorizontalPosition(row),
      5 * this.size,
      this.calculateElementHorizontalPosition(row),
      this.state.canvasHeight - 5,
      15 * this.size
    );
  }

  reflectChord() {
    //TODO create flipping logic
    this.state.ctx.scale(-1, 1);
  }

  getCurrentTemplete() {
    const template = `
    <div class="main-container">
        <div class="accord-description">
            <div class="description-element">
                ${this.currentChord.name}
            </div>
            <div class="description-element row-number-container">
                ${this.currentChord.startString}
                </div>
        </div>
        <canvas
            class="canvas-style"
            width=${this.state.canvasWidth}
            height=${this.state.canvasHeight}/>
    </div>                                    
    <style>
        .accord-description {
            display: flex;
            justify-content: space-between;
            border: solid ${styleConstants.colors.borderColor[this.theme]} 1px;
            border-bottom: none;
            font-size: ${styleConstants.fontSize.normal * this.size}px;
            color: ${styleConstants.colors.textColor[this.theme]};
            background-color: ${
              styleConstants.colors.backgroundColor[this.theme]
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
            color: ${styleConstants.colors.borderColor[this.theme]};
        }
        .canvas-style {
            border: solid ${styleConstants.colors.borderColor[this.theme]} 1px;
            border-top: none;
        }
    </style>`;
    return template;
  }

  makeIdEnding() {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}

customElements.define("single-chord", SingleChord);
