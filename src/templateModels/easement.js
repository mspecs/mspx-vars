'use strict';

let utils = require('../utils');
let TAG = utils.TAG;
let constants = require('../constants');
let Base = require('./baseTemplateModel');
var BaseCollection = require('./baseTemplateCollection');


class Easement extends Base {
    constructor(logEntryId, description, isHtml) {
        super();
        Object.assign(this,data);
        this._share = share;
    }

    //need to change for html/latex ?
    toString() {
        return (this.logEntryId || '') +  (logEntryId ? `(${this.description})`: `${this.description}`);
    }
}


var getTemplateString = function(data, isHtml, filterFunction) {
    let to = isHtml ? this.latex : this.html;
    var filteredE=_.filter(data.easments,filterFunction);
    return _.reduce(filteredE, (acc, x) => {
        return to.body(new Easemente(x.logEntryId, x.description, isHtml));
    }, to.header).slice(0, -1)
};


let templates = [
    {
        name:  "easementTypeIsCOMMUNITYFACILITIES",
        latex:{
            header:'\\\\vbox{\\n}\\nfastigheten har del i följande samfälligheter eller gemensamhetsanläggningar:\\n',
            separator:'\\n',
            body(eastment) {
                return eastment.toString() + '\\n';
            }
        },
        html:{
            header:'fastigheten har del i följande samfälligheter eller gemensamhetsanläggningar:\\n',
            separator: '<br>',
            body(easementId, description) {
                return eastment.toString() + '<br>';
            }
        },
        getTemplateString(data, isHtml) {
            getTemplateString(data,isHtml, (x) => {
                return x.easementType === 'ENUMS_EASEMENTTYPE_COMMUNITYFACILITIES' || x.easementType === 'ENUMS_EASEMENTTYPE_JOINT_PROPERTY';
            })
        }
    },

    {
        name:  "easementTypeIsCOMMUNITYFACILITIESFarming",
        latex:{
            header:'\\\\vbox{\\n}\\nområdet har del i följande samfälligheter eller gemensamhetsanläggningar:\\n',
            separator:'\\n',
            body(eastment) {
                return eastment.toString() + '\\n';
            }
        },
        html:{
            header:'\\\\vbox{\\n}\\nområdet har del i följande samfälligheter eller gemensamhetsanläggningar:\\n',
            separator: '<br>',
            body(eastment) {
                return eastment.toString() + '<br>';
            }
        },
        getTemplateString(data, isHtml) {
            getTemplateString(data,isHtml, (x) => {
                return x.easementType === 'ENUMS_EASEMENTTYPE_COMMUNITYFACILITIES' || x.easementType === 'ENUMS_EASEMENTTYPE_JOINT_PROPERTY';
            })
        }
    },
    {
        name: "easementTypeIsNotCOMMUNITYFACILITIES",
        latex: {
            header: 'fastigheten inte belastas av servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar.',
            noEasements:'fastigheten inte belastas av servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar.',
            separator: '\\n',
            body(eastment) {
                return eastment.toString() + '\\n';
            }
        },
        html: {
            header: 'fastigheten inte belastas av servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar.',
            noEasements:'fastigheten inte belastas av servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar.',
            separator: '<br>',
            body(eastment) {
                return eastment.toString() + '<br>';
            }
        },
        getTemplateString(data, isHtml) {
            getTemplateString(data, isHtml, (x) => {
                return x.easementType !== 'ENUMS_EASEMENTTYPE_COMMUNITYFACILITIES' || x.easementType !== 'ENUMS_EASEMENTTYPE_JOINT_PROPERTY';
            })
        }
    },
    {
    name:  "easementTypeIsNotCOMMUNITYFACILITIESFarming",
    latex: {
        header: 'området endast belastas eller har förmån av följande servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar:\\n',
        noEasements:'området inte belastas av servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar.',
        separator: '\\n',
        body(eastment) {
            return eastment.toString() + '\\n';
        }
    },
    html: {
        header: 'området endast belastas eller har förmån av följande servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar:\\n',
        noEasements:'området inte belastas av servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar.',
        separator: '<br>',
        body(eastment) {
            return eastment.toString() + '<br>';
        }
    },
    getTemplateString(data, isHtml) {
        getTemplateString(data, isHtml, (x) => {
            return x.easementType !== 'ENUMS_EASEMENTTYPE_COMMUNITYFACILITIES' || x.easementType !== 'ENUMS_EASEMENTTYPE_JOINT_PROPERTY';
        })
    }
}];

module.exports = exports = class EasementTemplate extends BaseCollection {
    static getTemplateString(data, templateName, type) {
        return _.find(templates, {name: templateName}).getTemplateString(data, type);
    };

    static getTemplateList() {
        return templates;
    }
};

