/**
 * Created by rasulniyazimbetov on 06/10/16.
 */

'use strict';

var utils = require('../utils');
var constants = require('../constants');
var Base = require('./baseTemplateModel');
var BaseCollection = require('./baseTemplateCollection');
var TAG = utils.TAG;

class Signature extends Base {
    get templates() {
        return signatureTemplates || null;
    }

    getValue(templateName, isHtml) {
        let templateObject = _.find(signatureTemplates, {name: templateName});
        if (!templateObject) return;

        return templateObject.getTemplateString();
    }
}

class SignatureTemplate  extends BaseCollection {
    static getTemplateString(data, templateName, type) {
        return _.find(signatureTemplates, {name: templateName}).getTemplateString(data, type);
    };

    static getTemplateList() {
        return signatureTemplates;
    }

    static getView(templateName) {
        let templateObject = _.find(signatureTemplates, {name: templateName});
        return templateObject.view || templateName;
    }

    static getValue(templateName, isHtml) {
        let templateObject = _.find(signatureTemplates, {name: templateName});
        if (!templateObject) return;

        return templateObject.getTemplateString(this, isHtml);
    }

    static isSignature() {
        return true;
    }
}


var dummySignatureTemplate = function(signatureType) {
    return `<span style="width: 4cm;display: block;margin-top: 0.3cm;height: 0.5cm;border-bottom: 1px solid #756d6d;"></span><span style="margin-bottom: 1cm;margin-top: 0.2cm; width: 4cm; display: block;">Ort och datum</span><span style="width: 4cm; display: block;border-bottom: 1px solid #756d6d;"></span><span style="margin-bottom: 1cm;margin-top: 0.2cm;">${signatureType}</span>`;
};

var signatureTemplates = [
    {
        name: 'contactDateAndSign',
        html: {
            body(contact) {
                //return String.raw`<span>contact date and sign</span>`;
                return dummySignatureTemplate('Contact name');
            }
        },
        getTemplateString(data, isHtml) {
            let to = this.html;
            return to.body();
        }
    },
    {
        name: 'spouseConsentSign',
        html: {
            body(contact) {
                //return String.raw`<span>spouse consent signature</span>`;
                return dummySignatureTemplate('Spouse Consent');
            }
        },
        getTemplateString(data, isHtml) {
            let to = this.html;
            return to.body();
        }
    },
    {
        name: 'consentSign',
        html: {
            body(contact) {
                //return String.raw`<span>spouse consent signatur</span>`;
                return dummySignatureTemplate('Spouse Consent');;
            }
        },
        getTemplateString(data, isHtml) {
            let to = this.html;
            return to.body();
        }
    },
    {
        name: 'sellerDealSignatures',
        html: {
            body(contact) {
                //return String.raw`<span>seller deal signature</span>`;
                return dummySignatureTemplate('Seller');
            }
        },
        getTemplateString(data, isHtml) {
            let to = this.html;
            return to.body();
        }
    },
    {
        name: 'buyerDealSignatures',
        html: {
            body(contact) {
                //return String.raw`<span>buyer deal signature</span>`;
                return dummySignatureTemplate('Buyer');
            }
        },
        getTemplateString(data, isHtml) {
            let to = this.html;
            return to.body();
        }
    },
    {
        name: 'dealSignatures',
        html: {
            body(contact) {
                //return String.raw`<span>deal signature</span>`;
                return dummySignatureTemplate('Deal Contact');
            }
        },
        getTemplateString(data, isHtml) {
            let to = this.html;
            return to.body();
        }
    },
    {
        name: 'sellerContactSignees',
        html: {
            body(contact) {
                //return String.raw`<span>seller contact signees</span>`;
                return dummySignatureTemplate('Seller Contacts');
            }
        },
        getTemplateString(data, isHtml) {
            let to = this.html;
            return to.body();
        }
    }
];

module.exports = exports = SignatureTemplate;