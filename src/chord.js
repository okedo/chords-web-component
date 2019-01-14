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

    this.idEnding = this.makeIdEnding();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "<div>Loading data</div>";

    this.id = `single-chord-component-${new Date().getTime()}-${this.idEnding}`;

    this.chordComponentRef = document.getElementById(this.id);
    this.initChord();
    this.initSize();
    this.shadowRoot.innerHTML = this.getCurrentTemplete();
    this.initCanvas();

    this.findBorders();
    this.calculateCanvasSize();
    this.state.canvas.setAttribute("height", this.state.canvasHeight);
    this.state.canvas.setAttribute("width", this.state.canvasWidth);
    this.drawChord();
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

  initChord() {
    const chordName = this.getChordNameAttr();
    const sizeAttr = this.getSizeAttr();
    this.size = sizeList[sizeAttr] ? sizeList[sizeAttr] : sizeList.medium;
    this.state.canvasHeight = this.state.canvasHeight * this.size;
    this.state.canvasWidth = this.state.canvasWidth * this.size;
    this.currentChord = chordList.find(
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
      "#E5CE8C",
      0,
      0,
      this.state.canvasHeight,
      this.state.canvasWidth
    );
    for (let i = 1; i <= 12; i++) {
      this.drawALine(
        "#FFFFFF",
        i * this.rowWidth,
        0,
        i * this.rowWidth,
        this.state.canvasHeight
      );
    }
    for (let i = 0; i <= 6; i++) {
      this.drawALine(
        "#6D5454",
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
    this.drawBasis();
    for (const stringG in this.currentChord.structure.strings) {
      if (this.currentChord.structure.strings.hasOwnProperty(stringG)) {
        this.currentChord.structure.strings[stringG].forEach(element => {
          pressedStringRows.push(element);
          this.drawCircle(
            5 * this.size,
            "black",
            "black",
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
      "black",
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
        border: solid black 1px;
        border-bottom: none;
        font-size: ${styleConstants.fontSize[this.getSizeAttr()]};
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
        color: black;
        }
        .canvas-style {
        border: solid black 1px;
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

const chordList = [
  {
    id: "1",
    name: "F",
    startString: 1,
    structure: {
      strings: {
        sixthString: [1],
        fifthString: [1, 3],
        fourthString: [1, 3],
        thirdString: [1, 2],
        secondStrind: [1],
        firstString: [1]
      }
    }
  },
  {
    id: "2",
    name: "F7",
    startString: 1,
    structure: {
      strings: {
        sixthString: [1],
        fifthString: [1, 3],
        fourthString: [1],
        thirdString: [1, 2],
        secondStrind: [1],
        firstString: [1]
      }
    }
  },
  {
    id: "3",
    name: "Fm",
    startString: 1,
    structure: {
      strings: {
        sixthString: [1],
        fifthString: [1, 3],
        fourthString: [1, 3],
        thirdString: [1],
        secondStrind: [1],
        firstString: [1]
      }
    }
  },
  {
    id: "4",
    name: "C",
    startString: 1,
    structure: {
      strings: {
        sixthString: [],
        fifthString: [3],
        fourthString: [2],
        thirdString: [],
        secondStrind: [1],
        firstString: []
      }
    }
  },
  {
    id: "5",
    name: "C7",
    startString: 1,
    structure: {
      strings: {
        sixthString: [],
        fifthString: [3],
        fourthString: [2],
        thirdString: [3],
        secondStrind: [1],
        firstString: []
      }
    }
  },
  {
    id: "6",
    name: "Cm",
    startString: 2,
    structure: {
      strings: {
        sixthString: [2],
        fifthString: [2],
        fourthString: [2, 4],
        thirdString: [2, 4],
        secondStrind: [2, 3],
        firstString: [2]
      }
    }
  },
  {
    id: "7",
    name: "D",
    startString: 1,
    structure: {
      strings: {
        sixthString: [],
        fifthString: [],
        fourthString: [],
        thirdString: [2],
        secondStrind: [3],
        firstString: [2]
      }
    }
  },
  {
    id: "8",
    name: "D7",
    startString: 1,
    structure: {
      strings: {
        sixthString: [],
        fifthString: [],
        fourthString: [],
        thirdString: [2],
        secondStrind: [1],
        firstString: [2]
      }
    }
  },
  {
    id: "9",
    name: "Dm",
    startString: 1,
    structure: {
      strings: {
        sixthString: [],
        fifthString: [],
        fourthString: [],
        thirdString: [2],
        secondStrind: [3],
        firstString: [1]
      }
    }
  },
  {
    id: "10",
    name: "E",
    startString: 1,
    structure: {
      strings: {
        sixthString: [],
        fifthString: [2],
        fourthString: [2],
        thirdString: [1],
        secondStrind: [],
        firstString: []
      }
    }
  },
  {
    id: "11",
    name: "E7",
    startString: 1,
    structure: {
      strings: {
        sixthString: [],
        fifthString: [2],
        fourthString: [],
        thirdString: [1],
        secondStrind: [],
        firstString: []
      }
    }
  },
  {
    id: "11",
    name: "Em",
    startString: 1,
    structure: {
      strings: {
        sixthString: [],
        fifthString: [2],
        fourthString: [2],
        thirdString: [],
        secondStrind: [],
        firstString: []
      }
    }
  },
  {
    id: "12",
    name: "G",
    startString: 1,
    structure: {
      strings: {
        sixthString: [3],
        fifthString: [2],
        fourthString: [],
        thirdString: [],
        secondStrind: [],
        firstString: [3]
      }
    }
  },
  {
    id: "13",
    name: "G7",
    startString: 1,
    structure: {
      strings: {
        sixthString: [3],
        fifthString: [2],
        fourthString: [],
        thirdString: [],
        secondStrind: [],
        firstString: [1]
      }
    }
  },
  {
    id: "14",
    name: "Gm",
    startString: 2,
    structure: {
      strings: {
        sixthString: [2, 5],
        fifthString: [2, 5],
        fourthString: [2],
        thirdString: [2],
        secondStrind: [2],
        firstString: [2]
      }
    }
  },
  {
    id: "15",
    name: "A",
    startString: 1,
    structure: {
      strings: {
        sixthString: [],
        fifthString: [],
        fourthString: [2],
        thirdString: [2],
        secondStrind: [2],
        firstString: []
      }
    }
  },
  {
    id: "16",
    name: "A7",
    startString: 1,
    structure: {
      strings: {
        sixthString: [],
        fifthString: [],
        fourthString: [2],
        thirdString: [],
        secondStrind: [2],
        firstString: []
      }
    }
  },
  {
    id: "17",
    name: "Am",
    startString: 1,
    structure: {
      strings: {
        sixthString: [],
        fifthString: [],
        fourthString: [2],
        thirdString: [2],
        secondStrind: [1],
        firstString: []
      }
    }
  },
  {
    id: "18",
    name: "B",
    startString: 2,
    structure: {
      strings: {
        sixthString: [2],
        fifthString: [2],
        fourthString: [2, 4],
        thirdString: [2, 4],
        secondStrind: [2, 4],
        firstString: [2]
      }
    }
  },
  {
    id: "19",
    name: "Bm",
    startString: 2,
    structure: {
      strings: {
        sixthString: [2],
        fifthString: [2],
        fourthString: [2, 4],
        thirdString: [2, 4],
        secondStrind: [2, 3],
        firstString: [2]
      }
    }
  },
  {
    id: "20",
    name: "B7",
    startString: 1,
    structure: {
      strings: {
        sixthString: [],
        fifthString: [2],
        fourthString: [1],
        thirdString: [2],
        secondStrind: [],
        firstString: [2]
      }
    }
  }
];

sizeList = {
  medium: 1,
  large: 2,
  small: 0.9
};

styleConstants = {
  fontSize: {
    medium: "14px",
    small: "10px",
    large: "24px"
  }
};

customElements.define("single-chord", SingleChord);
