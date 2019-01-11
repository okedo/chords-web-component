class SingleChord extends HTMLElement {
  constructor() {
    super();

    this.state = {
      canvasWidth: 390,
      canvasHeight: 140,
      maxRow: 12,
      minRow: 0
    };

    this.props = {
      id: "3",
      name: "F",
      startString: 2,
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
    };

    this.chordId = `single-chord-${new Date().getTime()}`;
    this.id = `single-chord-component-${new Date().getTime()}`;
    this.rowNumberId = `row-number-${new Date().getTime()}`;
    this.chordNameId = `chord-name-${new Date().getTime()}`;

    this.innerHTML = `<div class="main-container">
                            <div class="accord-description">
                                <div id="${
                                  this.chordNameId
                                }" class="description-element">
                                    ${this.props.name}
                                </div>
                                <div id="${
                                  this.rowNumberId
                                }" class="description-element row-number-container">
                                    ${this.state.minRow ? this.state.minRow : 1}
                                </div>
                            </div>
                            <canvas
                                class="canvas-style"
                                id=${this.chordId}
                                width=${this.state.canvasWidth}
                                height=${this.state.canvasHeight}/>
                        </div>`;

    setTimeout(() => {
      //   this.drawChord();
      this.initCanvas();
      this.chordComponentRef = document.getElementById(this.id);
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
    this.state.maxRow = max;
    this.state.minRow = min;
  }

  calculateElementHorizontalPosition(element) {
    const rowWidth = 30;
    return this.state.canvasWidth - element * rowWidth + rowWidth * 0.5;
  }

  calculateCanvasSize() {
    const tempWidth = (this.state.maxRow - this.state.minRow + 1) * 30;
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
}

customElements.define("single-chord", SingleChord);
