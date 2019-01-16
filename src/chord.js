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

    if (this.attrGetter.resolveChordArray().length) {
      this.initAttributes();

      this.shadowRoot.innerHTML = this.resolveFinalTemplate();
      this.customAttributes.chords.map(chord => {
        const customAttributes = {
          ...this.customAttributes,
          reflection: this.canvasSettings.reflect
        };
        new CanvasDrawTool(
          this.initCanvas(chord),
          chord,
          customAttributes
        ).draw();
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
