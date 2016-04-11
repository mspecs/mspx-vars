'use strict';
let _ = require('lodash');

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

    isMyTemplate(template) {
        return _.findWhere(this.templates, {name: template.name});
    }
};