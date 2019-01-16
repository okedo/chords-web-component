export class TemplatesHolder {
  getCommonTemplete(
    chordName,
    canvasId,
    startString,
    canvasWidth,
    canvasHeight
  ) {
    const template = `
    <div class="main-container">
        <div class="accord-description">
            <div class="description-element">
                ${chordName}
            </div>
            <div class="description-element row-number-container">
                ${startString}
                </div>
        </div>
        <canvas id=${canvasId}
            class="canvas-style"
            width=${canvasWidth}
            height=${canvasHeight}/>
    </div> `;
    return template;
  }

  get unknownChordTemplate() {
    return "<div class='unknown-chord'>Unknown chord</div>";
  }

  get loadingTemplate() {
    return "<div>Loading data</div>";
  }
}
