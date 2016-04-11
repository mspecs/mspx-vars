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

    formatMoney(amount) {
        switch (this.type) {
            case constants.LATEX:
                return `${amount}&nbsp;${this.currency}`;
            case constants.HTML:
                return `${amount}~${this.currency}`;
        }
    }

    // {return formatAmount(x) + '~' + currency};
/*    var formatMoney = '';

    var formatPercentage = (value) => {
        return (Math.floor((value || 0) * 100) / 100);
    };

    get commissionSum() {
        switch (this.type) {
            case constants.LATEX:
                return `Arvode kommer att utgå med ' + formatMoney(commission.commissionSum)`;
            case constants.HTML:
                return;
        }
    }*/

};