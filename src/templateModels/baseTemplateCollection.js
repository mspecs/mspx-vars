'use strict';

module.exports = class Base {

    constructor() {
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

    //just for declaration purposes each child class needs to override
    static getTemplateList() {
        return [];
    }
};