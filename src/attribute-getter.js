import { sizeList } from "./style.constant";
import { chordList } from "./chord-list.constant";
import { makeIdEnding } from "./common-tools";

class AttrGetter {
  constructor(componentRef) {
    this.componentRef = componentRef;
  }

  getChords() {
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

  resolveReflectAttr() {
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

  resolveTheme() {
    return this.getThemeAttr() && this.getThemeAttr().toLowerCase() == "dark"
      ? "dark"
      : "light";
  }

  resolveSize() {
    const tempSize = this.getSizeAttr();
    const sizeParsed = parseFloat("" + tempSize);
    let size = sizeList.medium;
    if (isNaN(sizeParsed)) {
      size = sizeList[tempSize] ? sizeList[tempSize] : sizeList.medium;
    } else size = sizeParsed;
    return size;
  }

  resolveCurrentChord() {
    return this.getChords()
      ? chordList.find(
          el => el.name.toUpperCase() == this.getChords().toUpperCase()
        )
      : "";
  }

  resolveChordNamesArray() {
    const chordsData = this.getChords();
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

  resolveChordArray() {
    const chordsArr = [];
    this.resolveChordNamesArray().map(el => {
      chordList.map(element => {
        if (element.name.toLowerCase() == el) {
          chordsArr.push({ ...element, componentCanvasId: `chord-${makeIdEnding()}` });
        }
      });
    });
    return chordsArr;
  }
}

export { makeIdEnding, AttrGetter };
