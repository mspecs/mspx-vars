/**
 * Created by rasulniyazimbetov on 08/04/16.
 */
'use strict';

//var utils = require('../utils');
var constants = require('../constants');
var Base = require('./baseTemplateModel').Base;
//var TAG = utils.TAG;

module.exports.Commission = class Commission extends Base {

    constructor(data, share, isHtml) {
        super();
        Object.assign(this, data);
        this._share = share;
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