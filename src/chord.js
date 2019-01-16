import { styleConstants } from "./style.constant";
import { AttrGetter } from "./attribute-getter";
import { makeIdEnding } from "./common-tools";
import { CanvasDrawTool } from "./canvas-draw-tool";

export class ChordCreator extends HTMLElement {
  constructor() {
    super();
    this.attrGetter;

    this.canvasSettings = {
      reflect: {
        horizontal: false,
        vertical: false
      }
    };

    this.customAttributes = {
      chords: [],
      size: null,
      theme: "light"
    };
    this.initAll();
  }

  initAll() {
    this.id = `single-chord-component-${makeIdEnding()}`;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "<div>Loading data</div>";

    this.chordComponentRef = document.getElementById(this.id);

    this.attrGetter = new AttrGetter(this.chordComponentRef);

    if (this.attrGetter.resolveCurrentChord()) {
      this.initAttributes();

      this.shadowRoot.innerHTML = this.resolveFinalTemplate();
      this.customAttributes.chords.map(chord => {
        new CanvasDrawTool(
          this.initCanvas(chord),
          chord,
          this.canvasSettings.reflect
        ).draw();
        this.resolveCanvas(
          chord,
          this.initCanvas(chord),
          this.canvasSettings.reflect
        );
      });
    } else {
      this.shadowRoot.innerHTML = "<div>Unknown chord</div>";
    }
  }

  initAttributes() {
    this.initChords();
    this.initSize();
    this.initTheme();
    this.initReflectAttr();
  }

  initSize() {
    this.customAttributes.size = this.attrGetter.resolveSize();
    this.canvasSettings.stringHeight =
      this.canvasSettings.stringHeight * this.customAttributes.size;
    this.canvasSettings.rowWidth =
      this.canvasSettings.stringHeight * this.customAttributes.size;
  }

  initCurrentChord() {
    this.customAttributes.currentChord = this.attrGetter.resolveCurrentChord();
  }
  initChords() {
    this.customAttributes.chords = this.attrGetter.resolveChordArray();
  }

  initReflectAttr() {
    this.canvasSettings.reflect = this.attrGetter.resolveReflectAttr();
  }

  initTheme() {
    this.customAttributes.theme = this.attrGetter.resolveTheme();
  }

  initCanvas(chord) {
    const canvasRef = { canvas: {}, ctx: {} };
    canvasRef.canvas = this.shadowRoot.getElementById(chord.componentCanvasId);
    canvasRef.ctx = canvasRef.canvas ? canvasRef.canvas.getContext("2d") : null;
    return canvasRef;
  }

  resolveCanvas(chord, canvasRef, reflection) {
    const canvas = {
      defaults: {
        canvasWidth: 390,
        canvasHeight: 140,
        rowWidth: 30,
        stringHeight: 20
      },
      ref: canvasRef,
      canvasSettings: {}
    };
    canvas.canvasSettings = {
      canvasHeight: canvas.defaults.canvasHeight * this.customAttributes.size,
      canvasWidth: canvas.defaults.canvasWidth * this.customAttributes.size,
      rowWidth: canvas.defaults.rowWidth * this.customAttributes.size,
      stringHeight: canvas.defaults.stringHeight * this.customAttributes.size,
      reflection: reflection
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
    if (canvas.canvasSettings.reflection.horizontal) {
      canvas.ref.canvas.style += "; transform: scaleX(-1);";
    }
    if (canvas.canvasSettings.reflection.vertical) {
      canvas.ref.canvas.style += "; transform: scaleY(-1);";
    }
  }

  getCommonTemplete(chord, canvasId) {
    const template = `
    <div class="main-container">
        <div class="accord-description">
            <div class="description-element">
                ${chord.name}
            </div>
            <div class="description-element row-number-container">
                ${chord.startString}
                </div>
        </div>
        <canvas id=${canvasId}
            class="canvas-style"
            width=${this.canvasSettings.canvasWidth}
            height=${this.canvasSettings.canvasHeight}/>
    </div>                                    
    `;
    return template;
  }

  resolveFinalTemplate() {
    const styles = `<style>
    .accord-description {
        display: flex;
        justify-content: space-between;
        border: solid ${
          styleConstants.colors.borderColor[this.customAttributes.theme]
        } 1px;
        border-bottom: none;
        font-size: ${styleConstants.fontSize.normal *
          this.customAttributes.size}px;
        color: ${styleConstants.colors.textColor[this.customAttributes.theme]};
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
    let template = "";
    this.customAttributes.chords.map(el => {
      template += this.getCommonTemplete(el, el.componentCanvasId);
    });
    return template + styles;
  }
}
