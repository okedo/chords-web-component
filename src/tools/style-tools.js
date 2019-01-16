const sizeList = {
  medium: 1,
  large: 2,
  small: 0.9
};

const STYLE_CONSTANTS = {
  fontSize: {
    normal: 14
  },
  colors: {
    circleColor: {
      dark: "#FFFFFF",
      light: "#000000"
    },
    basisColor: {
      dark: "#795548",
      light: "#E5CE8C"
    },
    stringsColor: {
      dark: "#cddc39",
      light: "#6D5454"
    },
    rowDividerColor: {
      dark: "#000000",
      light: "#FFFFFF"
    },
    borderColor: {
      dark: "#FFFFFF",
      light: "#000000"
    },
    textColor: {
      dark: "#FFFFFF",
      light: "#000000"
    },
    backgroundColor: {
      dark: "#000000",
      light: "#FFFFFF"
    }
  }
};

const stylesHolder = {
  getChordContainerStyleTag(theme, size) {
    const styles = `<style>
      .accord-description {
          display: flex;
          justify-content: space-between;
          border: solid ${STYLE_CONSTANTS.colors.borderColor[theme]} 1px;
          border-bottom: none;
          font-size: ${STYLE_CONSTANTS.fontSize.normal * size}px;
          color: ${STYLE_CONSTANTS.colors.textColor[theme]};
          background-color: ${STYLE_CONSTANTS.colors.backgroundColor[theme]};
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
          color: ${STYLE_CONSTANTS.colors.borderColor[theme]};
      }
      .canvas-style {
          border: solid ${STYLE_CONSTANTS.colors.borderColor[theme]} 1px;
          border-top: none;
      }
  </style>`;

    return styles;
  },

  getUnknownChordTemplateStyleTag() {
    const style = `<style>
      .unknown-chord {
        display: inline-block;
        margin: 20px;
      }
    </style`;
    return style;
  }
};

export { STYLE_CONSTANTS, sizeList, stylesHolder };
