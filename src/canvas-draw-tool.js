import { styleConstants } from "./style.constant";

export class CanvasDrawTool {
  constructor(canvas, chordData, customAttributes) {
    this.chordData = chordData;
    this.canvas = canvas;
    this.customAttributes = customAttributes;
  }

  draw() {
    const chord = this.chordData;
    const canvas = {
      defaults: {
        canvasWidth: 390,
        canvasHeight: 140,
        rowWidth: 30,
        stringHeight: 20
      },
      ref: this.canvas,
      canvasSettings: {}
    };
    canvas.canvasSettings = {
      canvasHeight: canvas.defaults.canvasHeight * this.customAttributes.size,
      canvasWidth: canvas.defaults.canvasWidth * this.customAttributes.size,
      rowWidth: canvas.defaults.rowWidth * this.customAttributes.size,
      stringHeight: canvas.defaults.stringHeight * this.customAttributes.size,
      reflection: this.customAttributes.reflection
    };

    canvas.canvasSettings.canvasWidth = this.calculateCanvasSize(
      canvas,
      chord,
      this.findBorders(chord)
    );
    this.updateCanvasSize(canvas.ref.canvas, canvas.canvasSettings);
    this.drawChord(chord, canvas);
    this.resolveChordReflection(canvas);
  }

  updateCanvasSize(canvas, canvasSettings) {
    canvas.setAttribute("height", canvasSettings.canvasHeight);
    canvas.setAttribute("width", canvasSettings.canvasWidth);
  }

  drawBasis(canvas) {
    this.drawRectangle(
      canvas.ref,
      styleConstants.colors.basisColor[this.customAttributes.theme],
      0,
      0,
      canvas.canvasSettings.canvasHeight,
      canvas.canvasSettings.canvasWidth
    );
    for (let i = 1; i <= 12; i++) {
      this.drawALine(
        canvas.ref,
        styleConstants.colors.rowDividerColor[this.customAttributes.theme],
        i * canvas.canvasSettings.rowWidth,
        0,
        i * canvas.canvasSettings.rowWidth,
        canvas.canvasSettings.canvasHeight
      );
    }
    for (let i = 0; i <= 6; i++) {
      this.drawALine(
        canvas.ref,
        styleConstants.colors.stringsColor[this.customAttributes.theme],
        0,
        i * canvas.canvasSettings.stringHeight,
        canvas.canvasSettings.canvasWidth,
        i * canvas.canvasSettings.stringHeight
      );
    }
  }

  drawRectangle(canvas, color, positionY, positionX, width, height) {
    const ctx = canvas.ctx;
    if (ctx) {
      ctx.fillStyle = color;
      ctx.fillRect(positionX, positionY, height, width);
    }
  }

  drawChord(chord, canvas) {
    let currentStringHigth = canvas.canvasSettings.stringHeight;
    const pressedStringRows = [];
    const circleColor =
      styleConstants.colors.circleColor[this.customAttributes.theme];
    this.drawBasis(canvas);
    for (const stringG in chord.structure.strings) {
      if (chord.structure.strings.hasOwnProperty(stringG)) {
        chord.structure.strings[stringG].forEach(element => {
          pressedStringRows.push(element);
          this.drawCircle(
            canvas.ref,
            5 * this.customAttributes.size,
            circleColor,
            circleColor,
            this.calculateElementHorizontalPosition(canvas, chord, element),
            currentStringHigth
          );
        });
        currentStringHigth += canvas.canvasSettings.stringHeight;
      }
    }
    if (pressedStringRows.filter(el => el === chord.startString).length === 6) {
      this.drawBare(canvas, chord);
    }
  }

  findBorders(chord) {
    const strings = chord.structure.strings;
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

    return max - chord.startString < 2 ? max + 1 : max;
  }

  calculateElementHorizontalPosition(canvas, chord, elementPosition) {
    const elementPos = elementPosition - chord.startString;
    const rowWidth = canvas.canvasSettings.rowWidth;
    return (
      canvas.canvasSettings.canvasWidth - elementPos * rowWidth - rowWidth * 0.5
    );
  }

  calculateCanvasSize(canvas, chord, maxRow) {
    const canvasWidth =
      (1 + maxRow - chord.startString) * canvas.canvasSettings.rowWidth;
    return canvasWidth;
  }

  drawCircle(canvas, size, color, fill, horizontal, vertical) {
    const ctx = canvas.ctx;
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(horizontal, vertical, size, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    }
  }

  drawALine(canvas, color, xStart, yStart, xEnd, yEnd, lineWidth = 0) {
    const ctx = canvas.ctx;
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(xEnd, yEnd);
      ctx.lineWidth = lineWidth ? lineWidth : 1;
      ctx.stroke();
    }
  }

  drawBare(canvas, chord) {
    const calculatedPos = this.calculateElementHorizontalPosition(
      canvas,
      chord,
      chord.startString
    );
    this.drawALine(
      canvas.ref,
      styleConstants.colors.circleColor[this.customAttributes.theme],
      calculatedPos,
      5 * this.customAttributes.size,
      calculatedPos,
      canvas.canvasSettings.canvasHeight - 5,
      15 * this.customAttributes.size
    );
  }

  resolveChordReflection(canvas) {
    let transform = `; transform: scale(${
      canvas.canvasSettings.reflection.horizontal ? -1 : 1
    },${canvas.canvasSettings.reflection.vertical ? -1 : 1})`;
    canvas.ref.canvas.style += transform;
  }
}
