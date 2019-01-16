import { sizeList } from "./style-tools";
import { chordList } from "./chord-list.constant";
import { makeIdEnding } from "./common-tools";

class AttrGetter {
  constructor(componentRef) {
    this.componentRef = componentRef;
  }

  getChordsAttr() {
    return this.componentRef.getAttribute("chords");
  }

  getSizeAttr() {
    return this.componentRef.getAttribute("size");
  }

  getThemeAttr() {
    return this.componentRef.getAttribute("theme");
  }

  getReflectAttr() {
    return this.componentRef.getAttribute("reflect");
  }

  get reflect() {
    const reflectModel = { horizontal: false, vertical: false };
    const reflectData =
      this.getReflectAttr() && this.getReflectAttr().length
        ? this.getReflectAttr()
            .toLowerCase()
            .split(/\s+|[,.]+/)
        : "";
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
    return reflectModel;
  }

  get theme() {
    return this.getThemeAttr() && this.getThemeAttr().toLowerCase() == "dark"
      ? "dark"
      : "light";
  }

  get size() {
    const tempSize = this.getSizeAttr();
    const sizeParsed = parseFloat("" + tempSize);
    let size = sizeList.medium;
    if (isNaN(sizeParsed)) {
      size = sizeList[tempSize] ? sizeList[tempSize] : sizeList.medium;
    } else size = sizeParsed;
    return size;
  }

  resolveChordNamesArray() {
    const chordsData = this.getChordsAttr();
    let chordsDataArr = [];
    if (chordsData) {
      chordsData.split(/\s+|[,.]+/).map(element => {
        if (
          chordList.find(el => el.name.toLowerCase() == element.toLowerCase())
        ) {
          chordsDataArr.push(element.toLowerCase());
        }
      });
    }
    return chordsDataArr;
  }

  get chordArray() {
    const chordsArr = [];
    this.resolveChordNamesArray().map(el => {
      chordList.map(element => {
        if (element.name.toLowerCase() == el) {
          chordsArr.push({
            ...element,
            componentCanvasId: `chord-${makeIdEnding()}`
          });
        }
      });
    });
    return chordsArr;
  }
}

export { makeIdEnding, AttrGetter };
