'use strict';
let _ = require('_');

module.exports = class Base {
    constructor() {
        this.setIsLatex();
        this.templates = [];
    }

    setIsHtml() {
        this.type = 'HTML';
    }

    setIsLatex() {
        this.type = 'LATEX';
    }

    isMyTemplate(template) {
        return _.findWhere(this.templates, {name: template.name});
    }
};