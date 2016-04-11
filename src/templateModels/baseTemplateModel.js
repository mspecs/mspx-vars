'use strict';

module.exports = class Base {
    constructor() {
        this.setIsLatex();
    }

    setIsHtml() {
        this.type = 'HTML';
    }

    setIsLatex() {
        this.type = 'LATEX';
    }
};