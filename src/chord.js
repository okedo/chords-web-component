import { stylesHolder } from "./style-tools";
import { AttrGetter } from "./attribute-getter";
import { makeIdEnding } from "./common-tools";
import { CanvasDrawTool } from "./canvas-draw-tool";
import { TemplatesHolder } from "./templates";

export class ChordCreator extends HTMLElement {
  constructor() {
    super();
    this.attrGetter;
    this.templatesHolder = new TemplatesHolder();

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
    this.shadowRoot.innerHTML = this.templatesHolder.loadingTemplate;

    this.chordComponentRef = document.getElementById(this.id);

    this.attrGetter = new AttrGetter(this.chordComponentRef);

    if (this.attrGetter.chordArray.length) {
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
      this.shadowRoot.innerHTML =
        this.templatesHolder.unknownChordTemplate +
        stylesHolder.getUnknownChordTemplateStyleTag();
    }
  }

  initAttributes() {
    this.initChords();
    this.initSize();
    this.initTheme();
    this.initReflectAttr();
  }

  initSize() {
    this.customAttributes.size = this.attrGetter.size;
  }

  initChords() {
    this.customAttributes.chords = this.attrGetter.chordArray;
  }

  initReflectAttr() {
    this.canvasSettings.reflect = this.attrGetter.reflect;
  }

  initTheme() {
    this.customAttributes.theme = this.attrGetter.theme;
  }

  initCanvas(chord) {
    const canvasRef = { canvas: {}, ctx: {} };
    canvasRef.canvas = this.shadowRoot.getElementById(chord.componentCanvasId);
    canvasRef.ctx = canvasRef.canvas ? canvasRef.canvas.getContext("2d") : null;
    return canvasRef;
  }

  resolveFinalTemplate() {
    const styles = stylesHolder.getChordContainerStyleTag(
      this.customAttributes.theme,
      this.customAttributes.size
    );
    let template = "";
    this.customAttributes.chords.map(el => {
      template += this.templatesHolder.getCommonTemplete(
        el.name,
        el.componentCanvasId,
        el.startString,
        this.canvasSettings.canvasWidth,
        this.canvasSettings.canvasHeight
      );
    });
    return template + styles;
  }
}
