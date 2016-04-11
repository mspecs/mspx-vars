/**
 * Created by rasulniyazimbetov on 08/04/16.
 */
'use strict';

var utils = require('../utils');
var constants = require('../constants');
var Base = require('./baseTemplateModel');
var TAG = utils.TAG;

module.exports = class Commission extends Base {

    constructor(data, share, isHtml) {
        super();
        Object.assign(this, data);
        this._share = share;
        this.currency = '';
    }

    // {return formatAmount(x) + '~' + currency};
    formatMoney(amount) {
        switch (this.type) {
            case constants.HTML:
                return `${amount}&nbsp;${this.currency}`;
            case constants.LATEX:
                return `${amount}~${this.currency}`;
        }
    }

    //var formatPercentage = function(x) {return (Math.floor((x || 0) * 100) / 100) +'\\\\%';};\
    formatPercent(amount) {
        return (Math.floor((amount || 0) * 100) / 100) + '%';
    }

    isSold(strings, values) {
        if (values[0]) {
            return strings + 'momsbefriat.';
        } else {
            return strings + 'exklusive moms.';
        }
    };

    get sum() {
        switch (this.type) {
            case constants.HTML:
                return `Arvode kommer att utgå med ${this.formatMoney(this.commissionSum)}<br/><br/>`;
            case constants.LATEX:
                return `Arvode kommer att utgå med ${this.formatMoney(this.commissionSum)}\n\n`;
        }
    }

    //print('Arvodet är ' + (commission.isSoldWithoutVAT ? 'momsbefriat.' : 'exklusive moms.') + '\\n\\n');\
    get soldWithoutVAT() {
        switch (this.type) {
             case constants.HTML:
                 return this.isSold`Arvodet är ${this.isSoldWithoutVAT}` + `<br/><br/>`;
            case constants.LATEX:
                return this.isSold`Arvodet är ${this.isSoldWithoutVAT}` + `\n\n`;
        }
    }

    //print('Arvodet kan överlåtas på juridisk person under vilken fastighetsmäklaren arbetar.\\n');\
    // I don't know if I named this getter correct, but it just returns this plain text only
    get broker() {
        switch(this.type) {
            case constants.HTML:
                return 'Arvodet kan överlåtas på juridisk person under vilken fastighetsmäklaren arbetar.<br/><br/>>';
            case constants.LATEX:
                return 'Arvodet kan överlåtas på juridisk person under vilken fastighetsmäklaren arbetar.\n';
        }
    }

    get baseFee() {
        
    }

    /**
    if(commission.commissionType == 'ENUM_COMMISSION_TYPE_FIXED_PRICE') {\
      print('Arvode kommer att utgå med ' + formatMoney(commission.commissionSum) + '\\n\\n');\
      print('Arvodet är ' + (commission.isSoldWithoutVAT ? 'momsbefriat.' : 'exklusive moms.') + '\\n\\n');\
      print('Arvodet kan överlåtas på juridisk person under vilken fastighetsmäklaren arbetar.\\n');\
    } else {\
        if(commission.commissionType == 'ENUM_COMMISSION_TYPE_MIXED') {\
          print('Arvode kommer att utgå med ' + formatMoney(commission.commissionBaseFee) + '. Därutöver kommer provision utgå ');\
        } else {\
          print('Provision ska utgå ');\
    };\
     */

};