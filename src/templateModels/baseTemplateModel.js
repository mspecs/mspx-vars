

module.exports.Base = class Base {
    constructor() {
        setIsLatex();
    }

    setIsHtml() {
        this.type = 'HTML';
    }

    setIsLatex() {
        this.type = 'LATEX';
    }
};