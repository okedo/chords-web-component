class SingleChord extends HTMLElement {
  constructor() {
    super();

    this.state = {
      canvasWidth: 390,
      canvasHeight: 140,
      maxRow: 12,
      reflect: true
    };
    this.props = {};

    this.idEnding = this.makeIdEnding();

    this.chordId = `single-chord-${new Date().getTime()}-${this.idEnding}`;
    this.id = `single-chord-component-${new Date().getTime()}-${this.idEnding}`;
    this.rowNumberId = `row-number-${new Date().getTime()}-${this.idEnding}`;
    this.chordNameId = `chord-name-${new Date().getTime()}-${this.idEnding}`;
    this.innerHTML = "<div>Loading data</div>";

    setTimeout(() => {
      this.chordComponentRef = document.getElementById(this.id);
      this.initChord();
      this.innerHTML = this.getCurrentTemplete();
      this.initCanvas();

      if (this.state.reflect) {
        this.reflectChord();
      }
      this.findBorders();
      this.calculateCanvasSize();
      setTimeout(() => {
        document
          .getElementById(this.chordId)
          .setAttribute("height", this.state.canvasHeight);
        document
          .getElementById(this.chordId)
          .setAttribute("width", this.state.canvasWidth);
        this.drawChord();
      });
    });
  }

  initChord() {
    const chordName = this.chordComponentRef.getAttribute("chord");
    this.props = chordList.find(el => el.name == chordName);
  }

  initCanvas() {
    const canvasRef = document.getElementById(this.chordId);
    const renderingContext = canvasRef ? canvasRef.getContext("2d") : null;
    this.state.canvas = canvasRef;
    this.state.ctx = renderingContext;
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
      this.drawALine("#FFFFFF", i * 30, 0, i * 30, this.state.canvasHeight);
    }
    for (let i = 0; i <= 6; i++) {
      this.drawALine("#6D5454", 0, i * 20, this.state.canvasWidth, i * 20);
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
    const stringHeight = 20;
    let currentStringHigth = 20;
    const pressedStringRows = [];
    this.drawBasis();
    for (const stringG in this.props.structure.strings) {
      if (this.props.structure.strings.hasOwnProperty(stringG)) {
        this.props.structure.strings[stringG].forEach(element => {
          pressedStringRows.push(element);
          this.drawCircle(
            5,
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
    for (const stringG in this.props.structure.strings) {
      if (this.props.structure.strings.hasOwnProperty(stringG)) {
        max =
          Math.max.apply(null, this.props.structure.strings[stringG]) > max
            ? Math.max.apply(null, this.props.structure.strings[stringG])
            : max;
        min =
          Math.min.apply(null, this.props.structure.strings[stringG]) < min
            ? Math.min.apply(null, this.props.structure.strings[stringG])
            : min;
      }
    }

    this.state.maxRow = max - this.props.startString < 2 ? max + 1 : max;
  }

  calculateElementHorizontalPosition(elementPosition) {
    const elementPos = elementPosition - this.props.startString;
    const rowWidth = 30;
    return this.state.canvasWidth - elementPos * rowWidth - rowWidth * 0.5;
  }

  calculateCanvasSize() {
    const tempWidth = (this.state.maxRow - this.props.startString + 1) * 30;
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
      5,
      this.calculateElementHorizontalPosition(row),
      this.state.canvasHeight - 5,
      15
    );
  }

  reflectChord() {
    this.state.ctx.scale(-1, 1);
  }

  getCurrentTemplete() {
    const template = `<div class="main-container">
                              <div class="accord-description">
                                  <div 
                                  id=${this.chordNameId} 
                                  class="description-element">
                                      ${this.props.name}
                                  </div>
                                  <div 
                                  id=${this.rowNumberId} 
                                  class="description-element row-number-container">
                                      ${this.props.startString}
                                  </div>
                              </div>
                              <canvas
                                  class="canvas-style"
                                  id=${this.chordId}
                                  width=${this.state.canvasWidth}
                                  height=${this.state.canvasHeight}/>
                          </div>`;
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

customElements.define("single-chord", SingleChord);
