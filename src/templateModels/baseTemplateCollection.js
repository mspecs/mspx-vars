'use strict';
let _ = require('lodash');

module.exports = class Base {

    constructor(templateList) {
        this.setIsLatex();
    }

    getTemplate(data, template, type) {

    }

    setIsHtml() {
        this.type = 'HTML';
    }

    setIsLatex() {
        this.type = 'LATEX';
    }

    static getTemplate(templateName) {
        return _.find(this.getTemplateList(), {name:templateName});
    }

    static getTemplateString(data, templateName, type) {
        return _.find(this.getTemplateList(), {name: templateName}).getTemplateString(data, type);
    }

    //just for declaration purposes each child class needs to override
    static getTemplateList() {
        return [];
    }
};