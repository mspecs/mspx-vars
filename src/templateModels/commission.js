/**
 * Created by rasulniyazimbetov on 08/04/16.
 */
'use strict';


var utils = require('../utils');
var constants = require('../constants');
var Base = require('./baseTemplateModel');
var BaseCollection = require('./baseTemplateCollection');
var TAG = utils.TAG;

class Commission extends Base {

    constructor(data, share, isHtml) {
        super(isHtml);
        Object.assign(this, data);
        this._share = share;
        this.currency = '';
    }

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

    isNoLowerBounds(interval) {
        return !!(interval || !interval.lowerBound || interval.lowerBound == 0);
    }

    formatMoney(amount) {
        return this.pass({
            html:   `${amount}&nbsp;${this.currency}`,
            latex:  `${amount}~${this.currency}`
        });
    }


    get sum() {
        return this.pass(`Arvode kommer att utgå med ${this.formatMoney(this.commissionSum)}`);
    }

    get soldWithoutVAT() {
        return this.pass(this.isSold`Arvodet är ${this.isSoldWithoutVAT}`);
    }

    //TODO: I don't know if I named this getter correct, but it just returns this plain text only
    get broker() {
        return this.pass('Arvodet kan överlåtas på juridisk person under vilken fastighetsmäklaren arbetar.');
    }

    get baseFee() {
        return this.pass(`Arvode kommer att utgå med ${this.formatMoney(this.commissionBaseFee)}. Därutöver kommer provision utgå`);
    }

    // TODO: not sure with naming, need to select something better
    get provisionPaid() {
        return this.pass('Provision ska utgå');
    }

    get dash() {
        return this.pass({
            html: 'med -----------------',
            latex: 'med \\xdash[103mm]{}'
        });
    }

    intervalPercentage(interval) {
        return this.formatPercent(interval.percentage * 100 / (this.divisor * 100));
    }

    get intervalNoLowerBound() {
        let intervals = this.commissionIntervals;
        return this.pass(`med ${this.intervalPercentage(intervals[0])} av  köpeskillingen.`);
    }

    get noLowerBound() {
        let intervals  = this.commissionIntervals;
        let interval = intervals[0];
        return this.pass({
            html: ``,
            latex: 'enligt stege\n' + this.isNoLowerBounds(interval) ? `makebox[15mm][r]{${this.intervalPercentage(interval)}} för köpeskilling i intervallet upp till ${this.formatMoney(interval.upperBound)}` : ``
        });
    }

    get intervalsPrint() {
        let intervals = this.commissionIntervals;
        return intervals.map((interval, index) => {
            if (index == 0) return;
            return this.pass({
                html:   ``,
                latex:  `\\makebox[15mm][r]{${this.intervalPercentage(interval)}} för köpeskilling i intervallet ${this.formatMoney(interval.lowerBound)} -- ${this.formatMoney(interval.upperBound)}`
            });
        });
    }

    get paidWithInterval() {
        let intervals = this.commissionIntervals;
        if (!intervals || !intervals.length) {
            return this.dash;
        } else if (intervals && intervals.length <= 1 && this.isNoLowerBounds(intervals[0])) {
            return this.intervalNoLowerBound;
        } else {
            return `${this.noLowerBound}
                    ${this.intervalsPrint}`;
        }
    }

    get provision() {
        let printString = '';
        if (this.commissionType !== 'ENUM_COMMISSION_TYPE_MIXED' && this.minimumCommissionFee) {
            printString = this.pass('Provision ');
        }

        if (this.minimumCommissionFee) printString += ` lägst med ${this.formatMoney(this.minimumCommissionFee)}`;
        if (this.maximumCommissionFee) printString += `${this.minimumCommissionFee ? ' och' : '' } högst med ${this.formatMoney(this.maximumCommissionFee)}`;

        return printString;
    }

    get provisionType() {
        return this.pass({
            html: ``,
            latex: `${this.commissionType == 'ENUM_COMMISSION_TYPE_MIXED' ? 'Arvodet och provisionen' : 'Provisionen'} enligt ovan är ${this.isSoldWithoutVAT ? 'momsbefriat' : 'exklusive moms.'}
                    ${this.commissionType == 'ENUM_COMMISSION_TYPE_MIXED' ? 'Arvodet och provisionen' : 'Provisionen'} kan överlåtas på juridisk person under vilken fastighetsmäklaren arbetar.`
        });
    }

    get templates() {

        return commissionTemplates || null;

        //var templateObject = _.findWhere(commissionTemplates, {name: templateName});
        //if (!templateObject) return;
        //
        //templateObject
        //
        //return commissionTemplates || null;
    }

    getValue(templateName, isHtml) {
        let templateObject = _.find(commissionTemplates, {name: templateName});
        if (!templateObject) return;

        return templateObject.getTemplateString(this, isHtml);
    }
}

module.exports.Commission = Commission;

class CommissionTemplate extends BaseCollection {

    static getTemplateString(data, templateName, type) {
        return _.find(commissionTemplates, {name: templateName}).getTemplateString(data, type);
    };

    static getTemplateList() {
        return commissionTemplates;
    }
}

module.exports.CommissionTemplate = CommissionTemplate;


var commissionTemplates = [
    {
        name: 'commissionWithoutVAT',
        latex: {
            separator: `\\hline \\n`,
            body(commission) { // blaaw
                let commissionPrint = '';
                switch (commission.commissionType) {
                    case 'ENUM_COMMISSION_TYPE_FIXED_PRICE':
                        commissionPrint = String.raw`${commission.sum}
                                            ${commission.soldWithoutVAT}
                                            ${commission.broker}`;
                        break;
                    case 'ENUM_COMMISSION_TYPE_MIXED':
                        commissionPrint = `${commission.baseFee}`;
                        break;
                    default:
                        commissionPrint = `${commission.provisionPaid}
                                            ${commission.paidWithInterval}`;
                        break;
                }
                commissionPrint += String.raw`${commission.provision}`;
                commissionPrint += String.raw`${commission.provisionType}`;

                return commissionPrint;
            }
        },
        html: {
            body(commission) {

            }
        },
        getTemplateString(data, isHtml) {
            var commission = data.commission;
            let to = isHtml ? this.html : this.latex;
            return to.body(new Commission(commission, data.share)) + to.separator;
        }
    }
];