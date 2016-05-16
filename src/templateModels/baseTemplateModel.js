'use strict';
var constants = require('../constants');

module.exports = class Base {
    constructor(isHtml) {
        if (isHtml) {
            this.setIsHtml();
        } else {
            this.setIsLatex();
        }
    }

    setIsHtml() {
        this.type = 'HTML';
    }

    setIsLatex() {
        this.type = 'LATEX';
    }

    // arguments order: HTML, latex
    pass(value) {
        // return default value if no type set
        //TODO: should use lodash instead
        if (!value.latex && !value.html) {
            return value;
        }
        switch (this.type) {
            case constants.HTML:
                return value.html;
            case constants.LATEX:
                return value.latex;
            default:
                return value.latex;
        }
    }
};