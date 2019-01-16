import { STYLE_CONSTANTS } from "./style-tools";

export class CanvasDrawTool {
  constructor(canvasRef, chordData, customAttributes) {
    this.chordData = chordData;
    this.canvas = {};

    const canvas = {
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

    this.canvas.canvasSettings.canvasWidth = this.calculateCanvasSize(
      this.findBorders()
    );
  }

  draw() {
    this.updateCanvasSize();
    this.drawChord();
    this.resolveChordReflection();
  }

  updateCanvasSize() {
    this.canvas.ref.canvas.setAttribute(
      "height",
      this.canvas.canvasSettings.canvasHeight
    );
    this.canvas.ref.canvas.setAttribute(
      "width",
      this.canvas.canvasSettings.canvasWidth
    );
  }

  drawBasis() {
    this.drawRectangle(
      STYLE_CONSTANTS.colors.basisColor[this.canvas.customAttributes.theme],
      0,
      0,
      this.canvas.canvasSettings.canvasHeight,
      this.canvas.canvasSettings.canvasWidth
    );
    for (let i = 1; i <= 12; i++) {
      this.drawALine(
        STYLE_CONSTANTS.colors.rowDividerColor[
          this.canvas.customAttributes.theme
        ],
        i * this.canvas.canvasSettings.rowWidth,
        0,
        i * this.canvas.canvasSettings.rowWidth,
        this.canvas.canvasSettings.canvasHeight
      );
    }
    for (let i = 0; i <= 6; i++) {
      this.drawALine(
        STYLE_CONSTANTS.colors.stringsColor[this.canvas.customAttributes.theme],
        0,
        i * this.canvas.canvasSettings.stringHeight,
        this.canvas.canvasSettings.canvasWidth,
        i * this.canvas.canvasSettings.stringHeight
      );
    }
  }

  drawRectangle(color, positionY, positionX, width, height) {
    const ctx = this.canvas.ref.ctx;
    if (ctx) {
      ctx.fillStyle = color;
      ctx.fillRect(positionX, positionY, height, width);
    }
  }

  drawChord() {
    let currentStringHigth = this.canvas.canvasSettings.stringHeight;
    const pressedStringRows = [];
    const circleColor =
      STYLE_CONSTANTS.colors.circleColor[this.canvas.customAttributes.theme];
    this.drawBasis();
    for (const stringG in this.chordData.structure.strings) {
      if (this.chordData.structure.strings.hasOwnProperty(stringG)) {
        this.chordData.structure.strings[stringG].forEach(element => {
          pressedStringRows.push(element);
          this.drawCircle(
            5 * this.canvas.customAttributes.size,
            circleColor,
            circleColor,
            this.calculateElementHorizontalPosition(element),
            currentStringHigth
          );
        });
        currentStringHigth += this.canvas.canvasSettings.stringHeight;
      }
    }
    if (
      pressedStringRows.filter(el => el === this.chordData.startString)
        .length === 6
    ) {
      this.drawBare();
    }
  }

  findBorders() {
    const strings = this.chordData.structure.strings;
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

    return max - this.chordData.startString < 2 ? max + 1 : max;
  }

  calculateElementHorizontalPosition(elementPosition) {
    const elementPos = elementPosition - this.chordData.startString;
    const rowWidth = this.canvas.canvasSettings.rowWidth;
    return (
      this.canvas.canvasSettings.canvasWidth -
      elementPos * rowWidth -
      rowWidth * 0.5
    );
  }

  calculateCanvasSize(maxRow) {
    const canvasWidth =
      (1 + maxRow - this.chordData.startString) *
      this.canvas.canvasSettings.rowWidth;
    return canvasWidth;
  }

  drawCircle(size, color, fill, horizontal, vertical) {
    const ctx = this.canvas.ref.ctx;
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
    const ctx = this.canvas.ref.ctx;
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(xEnd, yEnd);
      ctx.lineWidth = lineWidth ? lineWidth : 1;
      ctx.stroke();
    }
  }

  drawBare() {
    const calculatedPos = this.calculateElementHorizontalPosition(
      this.chordData.startString
    );
    this.drawALine(
      STYLE_CONSTANTS.colors.circleColor[this.canvas.customAttributes.theme],
      calculatedPos,
      5 * this.canvas.customAttributes.size,
      calculatedPos,
      this.canvas.canvasSettings.canvasHeight - 5,
      15 * this.canvas.customAttributes.size
    );
  }

  resolveChordReflection() {
    let transform = `; transform: scale(${
      this.canvas.customAttributes.reflection.horizontal ? -1 : 1
    },${this.canvas.customAttributes.reflection.vertical ? -1 : 1})`;
    this.canvas.ref.canvas.style += transform;
  }
}
