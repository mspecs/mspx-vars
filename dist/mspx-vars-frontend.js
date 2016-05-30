(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
    HTML: 'HTML',
    LATEX: 'LATEX'
};

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Base() {
        _classCallCheck(this, Base);

        this.setIsLatex();
    }

    _createClass(Base, [{
        key: 'getTemplate',
        value: function getTemplate(data, template, type) {}
    }, {
        key: 'setIsHtml',
        value: function setIsHtml() {
            this.type = 'HTML';
        }
    }, {
        key: 'setIsLatex',
        value: function setIsLatex() {
            this.type = 'LATEX';
        }
    }], [{
        key: 'getTemplate',
        value: function getTemplate(templateName) {
            return _.find(this.getTemplateList(), { name: templateName });
        }

        //just for declaration purposes each child class needs to override

    }, {
        key: 'getTemplateList',
        value: function getTemplateList() {
            return [];
        }
    }]);

    return Base;
}();

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var constants = require('../constants');

module.exports = function () {
    function Base(isHtml) {
        _classCallCheck(this, Base);

        if (isHtml) {
            this.setIsHtml();
        } else {
            this.setIsLatex();
        }
    }

    _createClass(Base, [{
        key: 'setIsHtml',
        value: function setIsHtml() {
            this.type = 'HTML';
        }
    }, {
        key: 'setIsLatex',
        value: function setIsLatex() {
            this.type = 'LATEX';
        }

        // arguments order: HTML, latex

    }, {
        key: 'pass',
        value: function pass(value) {
            // return default value if no type set
            //TODO: should use lodash instead
            if (!value.latex && !value.html) {
                return value;
            }
            switch (this.type) {
                case constants.HTML:
                    return value.html;
                case constants.LATEX:
                    return value.latex;
                default:
                    return value.latex;
            }
        }
    }]);

    return Base;
}();

},{"../constants":1}],4:[function(require,module,exports){
/**
 * Created by rasulniyazimbetov on 08/04/16.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['Arvodet är ', ''], ['Arvodet är ', '']),
    _templateObject2 = _taggedTemplateLiteral(['', '\n                                            ', '\n                                            ', ''], ['', '\n                                            ', '\n                                            ', '']),
    _templateObject3 = _taggedTemplateLiteral(['', ''], ['', '']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var utils = require('../utils');
var constants = require('../constants');
var Base = require('./baseTemplateModel');
var BaseCollection = require('./baseTemplateCollection');
var TAG = utils.TAG;

//var _ = require('lodash');

var Commission = function (_Base) {
    _inherits(Commission, _Base);

    function Commission(data, share, isHtml) {
        _classCallCheck(this, Commission);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Commission).call(this, isHtml));

        Object.assign(_this, data);
        _this._share = share;
        _this.currency = '';
        return _this;
    }

    _createClass(Commission, [{
        key: 'formatPercent',
        value: function formatPercent(amount) {
            return Math.floor((amount || 0) * 100) / 100 + '%';
        }
    }, {
        key: 'isSold',
        value: function isSold(strings, values) {
            if (values[0]) {
                return strings + 'momsbefriat.';
            } else {
                return strings + 'exklusive moms.';
            }
        }
    }, {
        key: 'isNoLowerBounds',
        value: function isNoLowerBounds(interval) {
            return !!(interval || !interval.lowerBound || interval.lowerBound == 0);
        }
    }, {
        key: 'formatMoney',
        value: function formatMoney(amount) {
            return this.pass({
                html: amount + '&nbsp;' + this.currency,
                latex: amount + '~' + this.currency
            });
        }
    }, {
        key: 'intervalPercentage',
        value: function intervalPercentage(interval) {
            return this.formatPercent(interval.percentage * 100 / (this.divisor * 100));
        }
    }, {
        key: 'getValue',


        //var templateObject = _.findWhere(commissionTemplates, {name: templateName});
        //if (!templateObject) return;
        //
        //templateObject
        //
        //return commissionTemplates || null;
        value: function getValue(templateName, isHtml) {
            var templateObject = _.find(commissionTemplates, { name: templateName });
            if (!templateObject) return;

            return templateObject.getTemplateString(this, isHtml);
        }
    }, {
        key: 'sum',
        get: function get() {
            return this.pass('Arvode kommer att utgå med ' + this.formatMoney(this.commissionSum));
        }
    }, {
        key: 'soldWithoutVAT',
        get: function get() {
            return this.pass(this.isSold(_templateObject, this.isSoldWithoutVAT));
        }

        //TODO: I don't know if I named this getter correct, but it just returns this plain text only

    }, {
        key: 'broker',
        get: function get() {
            return this.pass('Arvodet kan överlåtas på juridisk person under vilken fastighetsmäklaren arbetar.');
        }
    }, {
        key: 'baseFee',
        get: function get() {
            return this.pass('Arvode kommer att utgå med ' + this.formatMoney(this.commissionBaseFee) + '. Därutöver kommer provision utgå');
        }

        // TODO: not sure with naming, need to select something better

    }, {
        key: 'provisionPaid',
        get: function get() {
            return this.pass('Provision ska utgå');
        }
    }, {
        key: 'dash',
        get: function get() {
            return this.pass({
                html: 'med -----------------',
                latex: 'med \\xdash[103mm]{}'
            });
        }
    }, {
        key: 'intervalNoLowerBound',
        get: function get() {
            var intervals = this.commissionIntervals;
            return this.pass('med ' + this.intervalPercentage(intervals[0]) + ' av  köpeskillingen.');
        }
    }, {
        key: 'noLowerBound',
        get: function get() {
            var intervals = this.commissionIntervals;
            var interval = intervals[0];
            return this.pass({
                html: '',
                latex: 'enligt stege\n' + this.isNoLowerBounds(interval) ? 'makebox[15mm][r]{' + this.intervalPercentage(interval) + '} för köpeskilling i intervallet upp till ' + this.formatMoney(interval.upperBound) : ''
            });
        }
    }, {
        key: 'intervalsPrint',
        get: function get() {
            var _this2 = this;

            var intervals = this.commissionIntervals;
            return intervals.map(function (interval, index) {
                if (index == 0) return;
                return _this2.pass({
                    html: '',
                    latex: '\\makebox[15mm][r]{' + _this2.intervalPercentage(interval) + '} för köpeskilling i intervallet ' + _this2.formatMoney(interval.lowerBound) + ' -- ' + _this2.formatMoney(interval.upperBound)
                });
            });
        }
    }, {
        key: 'paidWithInterval',
        get: function get() {
            var intervals = this.commissionIntervals;
            if (!intervals || !intervals.length) {
                return this.dash;
            } else if (intervals && intervals.length <= 1 && this.isNoLowerBounds(intervals[0])) {
                return this.intervalNoLowerBound;
            } else {
                return this.noLowerBound + '\n                    ' + this.intervalsPrint;
            }
        }
    }, {
        key: 'provision',
        get: function get() {
            var printString = '';
            if (this.commissionType !== 'ENUM_COMMISSION_TYPE_MIXED' && this.minimumCommissionFee) {
                printString = this.pass('Provision ');
            }

            if (this.minimumCommissionFee) printString += ' lägst med ' + this.formatMoney(this.minimumCommissionFee);
            if (this.maximumCommissionFee) printString += (this.minimumCommissionFee ? ' och' : '') + ' högst med ' + this.formatMoney(this.maximumCommissionFee);

            return printString;
        }
    }, {
        key: 'provisionType',
        get: function get() {
            return this.pass({
                html: '',
                latex: (this.commissionType == 'ENUM_COMMISSION_TYPE_MIXED' ? 'Arvodet och provisionen' : 'Provisionen') + ' enligt ovan är ' + (this.isSoldWithoutVAT ? 'momsbefriat' : 'exklusive moms.') + '\n                    ' + (this.commissionType == 'ENUM_COMMISSION_TYPE_MIXED' ? 'Arvodet och provisionen' : 'Provisionen') + ' kan överlåtas på juridisk person under vilken fastighetsmäklaren arbetar.'
            });
        }
    }, {
        key: 'templates',
        get: function get() {

            return commissionTemplates || null;
        }
    }]);

    return Commission;
}(Base);

var CommissionTemplate = function (_BaseCollection) {
    _inherits(CommissionTemplate, _BaseCollection);

    function CommissionTemplate() {
        _classCallCheck(this, CommissionTemplate);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(CommissionTemplate).apply(this, arguments));
    }

    _createClass(CommissionTemplate, null, [{
        key: 'getTemplateString',
        value: function getTemplateString(data, templateName, type) {
            var templateObject = _.find(commissionTemplates, { name: templateName });
            if (!templateObject) return;

            return templateObject.getTemplateString(data, type);
        }
    }, {
        key: 'getTemplateList',
        value: function getTemplateList() {
            return commissionTemplates;
        }
    }]);

    return CommissionTemplate;
}(BaseCollection);

module.exports = exports = CommissionTemplate;

var commissionTemplates = [{
    name: 'commissionWithoutVAT',
    latex: {
        separator: '\\hline \\n',
        body: function body(commission) {
            // blaaw
            var commissionPrint = '';
            switch (commission.commissionType) {
                case 'ENUM_COMMISSION_TYPE_FIXED_PRICE':
                    commissionPrint = String.raw(_templateObject2, commission.sum, commission.soldWithoutVAT, commission.broker);
                    break;
                case 'ENUM_COMMISSION_TYPE_MIXED':
                    commissionPrint = '' + commission.baseFee;
                    break;
                default:
                    commissionPrint = commission.provisionPaid + '\n                                            ' + commission.paidWithInterval;
                    break;
            }
            commissionPrint += String.raw(_templateObject3, commission.provision);
            commissionPrint += String.raw(_templateObject3, commission.provisionType);

            return commissionPrint;
        }
    },
    html: {
        separator: '',
        body: function body(commission) {
            return 'hello world';
        }
    },
    getTemplateString: function getTemplateString(data, deferred, isHtml) {
        // this has to be on every function??? maybe we should loop it somehow
        if (_.isBoolean(deferred)) {
            isHtml = deferred;
            deferred = {};
        }
        var commission = data.commission;
        var to = isHtml ? this.html : this.latex;
        // need better way of sending the data
        return to.body(new Commission(commission, deferred, to)) + to.separator;
    }
}, {
    name: 'commissionWithVAT',
    latex: {
        separator: '\\hline \\n',
        body: function body(commission) {
            // blaaw
            var commissionPrint = '';
            switch (commission.commissionType) {
                case 'ENUM_COMMISSION_TYPE_FIXED_PRICE':
                    commissionPrint = String.raw(_templateObject2, commission.sum, commission.soldWithoutVAT, commission.broker);
                    break;
                case 'ENUM_COMMISSION_TYPE_MIXED':
                    commissionPrint = '' + commission.baseFee;
                    break;
                default:
                    commissionPrint = commission.provisionPaid + '\n                                            ' + commission.paidWithInterval;
                    break;
            }
            commissionPrint += String.raw(_templateObject3, commission.provision);
            commissionPrint += String.raw(_templateObject3, commission.provisionType);

            return commissionPrint;
        }
    },
    html: {
        separator: '',
        body: function body(commission) {
            return 'with vat';
        }
    },
    getTemplateString: function getTemplateString(data, deferred, isHtml) {
        // this has to be on every function??? maybe we should loop it somehow
        if (_.isBoolean(deferred)) {
            isHtml = deferred;
            deferred = {};
        }
        var commission = data.commission;
        var to = isHtml ? this.html : this.latex;
        // need better way of sending the data
        return to.body(new Commission(commission, deferred, to)) + to.separator;
    }
}, {
    name: 'foo',
    latex: {
        separator: '\\hline \\n',
        body: function body(commission) {
            // blaaw
            var commissionPrint = '';
            switch (commission.commissionType) {
                case 'ENUM_COMMISSION_TYPE_FIXED_PRICE':
                    commissionPrint = String.raw(_templateObject2, commission.sum, commission.soldWithoutVAT, commission.broker);
                    break;
                case 'ENUM_COMMISSION_TYPE_MIXED':
                    commissionPrint = '' + commission.baseFee;
                    break;
                default:
                    commissionPrint = commission.provisionPaid + '\n                                            ' + commission.paidWithInterval;
                    break;
            }
            commissionPrint += String.raw(_templateObject3, commission.provision);
            commissionPrint += String.raw(_templateObject3, commission.provisionType);

            return commissionPrint;
        }
    },
    html: {
        separator: '',
        body: function body(commission) {
            return 'wat wat!!';
        }
    },
    getTemplateString: function getTemplateString(data, deferred, isHtml) {
        // this has to be on every function??? maybe we should loop it somehow
        if (_.isBoolean(deferred)) {
            isHtml = deferred;
            deferred = {};
        }
        var commission = data.commission;
        var to = isHtml ? this.html : this.latex;
        // need better way of sending the data
        return to.body(new Commission(commission, deferred, to)) + to.separator;
    }
}];

},{"../constants":1,"../utils":8,"./baseTemplateCollection":2,"./baseTemplateModel":3}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\\raggedrigh ', ''], ['\\\\raggedrigh ', '']),
    _templateObject2 = _taggedTemplateLiteral(['E-post:~', ''], ['E-post:~', '']),
    _templateObject3 = _taggedTemplateLiteral(['E-post:', ''], ['E-post:', '']),
    _templateObject4 = _taggedTemplateLiteral([' & ', ''], [' & ', '']),
    _templateObject5 = _taggedTemplateLiteral([' & ', '-del'], [' & ', '-del']),
    _templateObject6 = _taggedTemplateLiteral(['\\begin{tabular}[t]{@{}p{7cm} p{3cm} p{2cm}@{}}\n                ', '\n                ', '\n                ', '\n                ', '\n                ', '\n                ', ' \\end{tabular}\n                '], ['\\\\begin{tabular}[t]{@{}p{7cm} p{3cm} p{2cm}@{}}\n                ', '\n                ', '\n                ', '\n                ', '\n                ', '\n                ', ' \\\\end{tabular}\n                ']),
    _templateObject7 = _taggedTemplateLiteral(['<span class="variable-neu">', ', ', ',', ', ', ', ', ', ', '</span>'], ['<span class="variable-neu">', ', ', ',', ', ', ', ', ', ', '</span>']),
    _templateObject8 = _taggedTemplateLiteral(['\\begin{tabular}[t]{@{}p{9cm} p{3cm}@{}}\n                ', '\n                ', '\n                ', '\n                ', '\n                \\end{tabular}\n                '], ['\\\\begin{tabular}[t]{@{}p{9cm} p{3cm}@{}}\n                ', '\n                ', '\n                ', '\n                ', '\n                \\\\end{tabular}\n                ']),
    _templateObject9 = _taggedTemplateLiteral(['<span class="variable-neu">', ', ', ',', ', ', ', ', '</span>'], ['<span class="variable-neu">', ', ', ',', ', ', ', ', '</span>']),
    _templateObject10 = _taggedTemplateLiteral(['\\begin{tabular}[t]{@{}p{9cm} p{3cm}@{}}\n                ', '\n                ', '\n                ', '\n                ', '\n                ', '\n                \\end{tabular}\n                '], ['\\\\begin{tabular}[t]{@{}p{9cm} p{3cm}@{}}\n                ', '\n                ', '\n                ', '\n                ', '\n                ', '\n                \\\\end{tabular}\n                ']),
    _templateObject11 = _taggedTemplateLiteral(['\\begin{tabular}[t]{@{}p{12cm}@{}}\n                ', '\n                ', '\n                ', '\n                ', '\n                \\end{tabular}\n                '], ['\\\\begin{tabular}[t]{@{}p{12cm}@{}}\n                ', '\n                ', '\n                ', '\n                ', '\n                \\\\end{tabular}\n                ']),
    _templateObject12 = _taggedTemplateLiteral(['\\begin{tabular}[t]{@{}p{6.8cm}@{}}\'\n                ', '\n                ', '\n                ', '\n                ', '\n                \\end{tabular}%\n                '], ['\\\\begin{tabular}[t]{@{}p{6.8cm}@{}}\'\n                ', '\n                ', '\n                ', '\n                ', '\n                \\\\end{tabular}%\n                ']),
    _templateObject13 = _taggedTemplateLiteral(['\\begin{tabular}[t]{@{}p{7cm} p{3cm} p{2cm}@{}}\n\n                ', '\n                ', '\n                ', '\n                \\end{tabular}\n'], ['\\\\begin{tabular}[t]{@{}p{7cm} p{3cm} p{2cm}@{}}\\n\n                ', '\n                ', '\n                ', '\n                \\\\end{tabular}\\n']),
    _templateObject14 = _taggedTemplateLiteral(['<span class="contact-info-shares">', ', ', ',', ', ', ', ', '</span>'], ['<span class="contact-info-shares">', ', ', ',', ', ', ', ', '</span>']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var utils = require('../utils');
var TAG = utils.TAG;
var constants = require('../constants');
var Base = require('./baseTemplateModel');
var BaseCollection = require('./baseTemplateCollection');

var Contact = function (_Base) {
    _inherits(Contact, _Base);

    function Contact(data, share, isHtml) {
        _classCallCheck(this, Contact);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Contact).call(this));

        Object.assign(_this, data);
        _this._share = share;
        return _this;
    }

    _createClass(Contact, [{
        key: 'name',
        get: function get() {
            switch (this.type) {
                case constants.LATEX:
                    return this.isLegalEntity ? TAG.escapelatex(this.companyName) || '' : (this.isDeceased ? 'Dödsboet efter ' : '') + TAG.escapelatex(this.firstName + ' ' + this.lastName);
                case constants.HTML:
                    return this.isLegalEntity ? this.companyName || '' : (this.isDeceased ? 'Dödsboet efter ' : '') + (this.firstName + ' ' + this.lastName);
            }
        }
    }, {
        key: 'address',
        get: function get() {
            switch (this.type) {
                case constants.LATEX:
                    var address = nobreak(escapelatex(this.streetAddress)) + ', ' + (this.postalCode ? nobreak(this.postalCode) + '~' : '') + nobreak(escapelatex(this.city));
                    return TAG.nonEmpty(_templateObject, address);
                case constants.HTML:
                    return noBreakHtml(this.streetAddress) + ', ' + (noBreakHtml(this.postalCode) || '') + ' ' + (noBreakHtml(this.city) || '');
            }
        }
    }, {
        key: 'phone',
        get: function get() {
            switch (this.type) {
                case constants.LATEX:
                    return this.phoneNumber && this.homePhoneNumber ? '' : 'Telefon:~' + (person.phoneNumber || '') + (this.phoneNumber && this.homePhoneNumber ? ', ' : '') + (this.homePhoneNumber || '');
                case constants.HTML:
                    return this.phoneNumber && this.homePhoneNumber ? '' : 'Telefon:' + (this.phoneNumber || '') + (this.phoneNumber && this.homePhoneNumber ? ', ' : '') + (this.homePhoneNumber || '');
            }
        }
    }, {
        key: 'email',
        get: function get() {
            switch (this.type) {
                case constants.LATEX:
                    return TAG.nonEmpty(_templateObject2, escapelatex(this.email));
                case constants.HTML:
                    return TAG.nonEmpty(_templateObject3, this.email);
            }
        }
    }, {
        key: 'id',
        get: function get() {
            switch (this.type) {
                case constants.LATEX:
                    return ' & ' + escapelatex(this.identifier);
                case constants.HTML:
                    return TAG.nonEmpty(_templateObject4, this.identifier);
            }
        }
    }, {
        key: 'share',
        get: function get() {
            switch (this.type) {
                case constants.LATEX:
                    return TAG.nonEmpty(_templateObject5, this.isHtml ? this._share : escapelatex(this._share));
                case constants.HTML:
                    return TAG.nonEmpty(_templateObject5, this._share);
            }
        }
    }]);

    return Contact;
}(Base);

module.exports = function (_BaseCollection) {
    _inherits(ContactTemplates, _BaseCollection);

    function ContactTemplates() {
        _classCallCheck(this, ContactTemplates);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ContactTemplates).apply(this, arguments));
    }

    _createClass(ContactTemplates, null, [{
        key: 'getTemplateString',
        value: function getTemplateString(data, templateName, type) {
            return _.find(templates, { name: temlateName }).getTEmplateString(data, type);
        }
    }, {
        key: 'getTemplateList',
        value: function getTemplateList() {
            return templates;
        }
    }]);

    return ContactTemplates;
}(BaseCollection);

var getTemplateString = function getTemplateString(data, isHtml) {
    if (!data.contacts && data.contact) {
        var contacts = [data.contact];
    }
    var to = isHtml ? this.latex : this.html;
    return contacts.map(function (contact, index) {
        var share = _.findWhere(data.shares, { contactId: xc.id });
        return to.body(new Contact(contact, share)) + (contacts.length - 1 !== index && to.separator ? to.separator : '');
    });
};

var templateAliases = [{
    name: "contactsInfoFull",
    alias: "contactInfoFull"
}, {
    name: "contactsInfo",
    alias: "contactInfo"
}, {
    name: "contactsInfoMedium",
    alias: 'contactInfoMedium'
}, {
    name: "contactsInfoMedium2",
    alias: 'contactInfoMedium2'
}, {
    name: "contactsInfoShares",
    alias: "contactInfoShares"
}, {
    name: "contactsInfoParts",
    alias: "contactInfoShares"
}, {
    name: "contactInfoParts",
    alias: "contactInfoShares"
}, {
    name: "contactsInfoShort",
    alias: "contactInfoShort"
}, {
    name: "contactsName",
    alias: "contactName"
}];

var templates = [{
    name: "contactInfoFull",
    latex: {
        separator: '\\\\hline \\n',
        body: function body(contact) {

            return String.raw(_templateObject6, contact.name, contact.address, contact.phone, contact.id, contact.share, contact.email);
        }
    },
    html: {
        separator: '<br>',
        body: function body(contact) {
            contact.setIsHtml();
            return String.raw(_templateObject7, contact.name, contact.address, contact.phone, contact.email, contact.id, contact.share);
        }
    },
    getTemplateString: getTemplateString
}, {
    name: "groupedContactInfo",
    latex: {
        separator: '\\hline \\n',
        body: function body(contact) {
            return String.raw(_templateObject8, contact.name, contact.address, contact.phone, contact.email);
        }
    },
    html: {
        separator: '<br>',
        body: function body(contact) {
            contact.setIsHtml();
            return String.raw(_templateObject9, contact.name, contact.address, contact.phone, contact.email, contact.id);
        }
    },
    getTemplateString: getTemplateString
}, {
    name: "contactInfo",
    latex: {
        body: function body(contact) {
            return String.raw(_templateObject10, contact.name, contact.address, contact.phone, contact.email, contact.id);
        }
    },
    html: {
        body: function body(contact) {
            contact.setIsHtml();
            return String.raw(_templateObject9, contact.name, contact.address, contact.phone, contact.email, contact.id);
        }
    },
    getTemplateString: getTemplateString
}, {
    name: "contactInfoMedium",
    latex: {
        body: function body(contact) {
            return String.raw(_templateObject11, contact.name, contact.address, contact.phone, contact.email);
        }
    },
    html: {
        body: function body(contact) {
            contact.setIsHtml();
            return String.raw(_templateObject9, contact.name, contact.address, contact.phone, contact.email, contact.id);
        }
    },
    getTemplateString: getTemplateString
}, {
    name: "contactInfoMedium2",
    latex: {
        separator: '\\n',
        body: function body(contact) {
            return String.raw(_templateObject12, contact.name, contact.address, contact.phone, contact.email);
        }
    },
    html: {
        separator: '<br>',
        body: function body(contact) {
            contact.setIsHtml();
            return String.raw(_templateObject9, contact.name, contact.address, contact.phone, contact.email, contact.id);
        }
    },
    getTemplateString: function getTemplateString(data, isHtml) {
        if (!data.contacts && data.contact) {
            var contacts = [data.contact];
        }

        var to = isHtml ? this.latex : this.html;
        return contacts.map(function (xc, index) {
            var share = _.findWhere(data.shares, { contactId: xc.id });
            return to.body(new Contact(contact, share)) + (index && index % 2 !== 0 ? to.separator : '');
        });
    }
}, {
    name: "contactInfoShares",
    latex: {
        body: function body(contact) {
            return String.raw(_templateObject13, contact.name, contact.id, contact.share);
        }
    },
    html: {
        body: function body(contact) {
            contact.setIsHtml();
            return String.raw(_templateObject14, contact.name, contact.address, contact.phone, contact.id, contact.share);
        }
    },
    getTemplateString: getTemplateString
}, {
    name: "contactInfoShort", //name, ssn
    template: '<% if(_.isUndefined(contacts) && !_.isUndefined(contact)) { var contacts = [contact];};_.each(contacts, function(xc){print(\'\\\\begin{tabular}[t]{@{}p{9cm} p{3cm}@{}}\\n\');print(xc ? (xc.isLegalEntity?escapelatex(xc.companyName):(xc.isDeceased ? \'Dödsboet efter \' : \'\') + escapelatex(xc.firstName + \' \' + xc.lastName))+ \' & \' + escapelatex(xc.identifier) + \' \\\\\\\\ \':\'\');print(\'\\\\end{tabular}\\n\');});%>',

    latex: {
        body: function body(contact) {
            return String.raw(_templateObject13, contact.name, contact.id, contact.share);
        }
    },
    html: {
        body: function body(contact) {
            contact.setIsHtml();
            return String.raw(_templateObject9, contact.name, contact.address, contact.phone, contact.id, contact.share);
        }
    },
    getTemplateString: getTemplateString

}, {
    name: "contactName", //name
    template: '<%if(_.isUndefined(contacts) && !_.isUndefined(contact)) { var contacts = [contact];}; _.each(contacts, function(x) {if(x){print((x.isLegalEntity?escapelatex(x.companyName): (x.isDeceased ? \'Dödsboet efter \' : \'\') + escapelatex(x.firstName + \' \' + x.lastName)) + \'\\n\');} else {print(\'Saknas\');};});%>'
}];

templates.push.apply(templateAliases);

},{"../constants":1,"../utils":8,"./baseTemplateCollection":2,"./baseTemplateModel":3}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var utils = require('../utils');
var TAG = utils.TAG;
var constants = require('../constants');
var Base = require('./baseTemplateModel');
var BaseCollection = require('./baseTemplateCollection');

var Easement = function (_Base) {
    _inherits(Easement, _Base);

    function Easement(logEntryId, description, isHtml) {
        _classCallCheck(this, Easement);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Easement).call(this));

        Object.assign(_this, data);
        _this._share = share;
        return _this;
    }

    //need to change for html/latex ?


    _createClass(Easement, [{
        key: 'toString',
        value: function toString() {
            return (this.logEntryId || '') + (logEntryId ? '(' + this.description + ')' : '' + this.description);
        }
    }]);

    return Easement;
}(Base);

var _getTemplateString = function _getTemplateString(data, isHtml, filterFunction) {
    var to = isHtml ? this.latex : this.html;
    var filteredE = _.filter(data.easments, filterFunction);
    return _.reduce(filteredE, function (acc, x) {
        return to.body(new Easemente(x.logEntryId, x.description, isHtml));
    }, to.header).slice(0, -1);
};

var templates = [{
    name: "easementTypeIsCOMMUNITYFACILITIES",
    latex: {
        header: '\\\\vbox{\\n}\\nfastigheten har del i följande samfälligheter eller gemensamhetsanläggningar:\\n',
        separator: '\\n',
        body: function body(eastment) {
            return eastment.toString() + '\\n';
        }
    },
    html: {
        header: 'fastigheten har del i följande samfälligheter eller gemensamhetsanläggningar:\\n',
        separator: '<br>',
        body: function body(easementId, description) {
            return eastment.toString() + '<br>';
        }
    },
    getTemplateString: function getTemplateString(data, isHtml) {
        _getTemplateString(data, isHtml, function (x) {
            return x.easementType === 'ENUMS_EASEMENTTYPE_COMMUNITYFACILITIES' || x.easementType === 'ENUMS_EASEMENTTYPE_JOINT_PROPERTY';
        });
    }
}, {
    name: "easementTypeIsCOMMUNITYFACILITIESFarming",
    latex: {
        header: '\\\\vbox{\\n}\\nområdet har del i följande samfälligheter eller gemensamhetsanläggningar:\\n',
        separator: '\\n',
        body: function body(eastment) {
            return eastment.toString() + '\\n';
        }
    },
    html: {
        header: '\\\\vbox{\\n}\\nområdet har del i följande samfälligheter eller gemensamhetsanläggningar:\\n',
        separator: '<br>',
        body: function body(eastment) {
            return eastment.toString() + '<br>';
        }
    },
    getTemplateString: function getTemplateString(data, isHtml) {
        _getTemplateString(data, isHtml, function (x) {
            return x.easementType === 'ENUMS_EASEMENTTYPE_COMMUNITYFACILITIES' || x.easementType === 'ENUMS_EASEMENTTYPE_JOINT_PROPERTY';
        });
    }
}, {
    name: "easementTypeIsNotCOMMUNITYFACILITIES",
    latex: {
        header: 'fastigheten inte belastas av servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar.',
        noEasements: 'fastigheten inte belastas av servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar.',
        separator: '\\n',
        body: function body(eastment) {
            return eastment.toString() + '\\n';
        }
    },
    html: {
        header: 'fastigheten inte belastas av servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar.',
        noEasements: 'fastigheten inte belastas av servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar.',
        separator: '<br>',
        body: function body(eastment) {
            return eastment.toString() + '<br>';
        }
    },
    getTemplateString: function getTemplateString(data, isHtml) {
        _getTemplateString(data, isHtml, function (x) {
            return x.easementType !== 'ENUMS_EASEMENTTYPE_COMMUNITYFACILITIES' || x.easementType !== 'ENUMS_EASEMENTTYPE_JOINT_PROPERTY';
        });
    }
}, {
    name: "easementTypeIsNotCOMMUNITYFACILITIESFarming",
    latex: {
        header: 'området endast belastas eller har förmån av följande servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar:\\n',
        noEasements: 'området inte belastas av servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar.',
        separator: '\\n',
        body: function body(eastment) {
            return eastment.toString() + '\\n';
        }
    },
    html: {
        header: 'området endast belastas eller har förmån av följande servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar:\\n',
        noEasements: 'området inte belastas av servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar.',
        separator: '<br>',
        body: function body(eastment) {
            return eastment.toString() + '<br>';
        }
    },
    getTemplateString: function getTemplateString(data, isHtml) {
        _getTemplateString(data, isHtml, function (x) {
            return x.easementType !== 'ENUMS_EASEMENTTYPE_COMMUNITYFACILITIES' || x.easementType !== 'ENUMS_EASEMENTTYPE_JOINT_PROPERTY';
        });
    }
}];

module.exports = exports = function (_BaseCollection) {
    _inherits(EasementTemplate, _BaseCollection);

    function EasementTemplate() {
        _classCallCheck(this, EasementTemplate);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(EasementTemplate).apply(this, arguments));
    }

    _createClass(EasementTemplate, null, [{
        key: 'getTemplateString',
        value: function getTemplateString(data, templateName, type) {
            return _.find(templates, { name: templateName }).getTemplateString(data, type);
        }
    }, {
        key: 'getTemplateList',
        value: function getTemplateList() {
            return templates;
        }
    }]);

    return EasementTemplate;
}(BaseCollection);

},{"../constants":1,"../utils":8,"./baseTemplateCollection":2,"./baseTemplateModel":3}],7:[function(require,module,exports){
'use strict';

module.exports = {
    Contact: require('./contact'),
    Commission: require('./commission'),
    Easement: require('./easement')
};

},{"./commission":4,"./contact":5,"./easement":6}],8:[function(require,module,exports){
'use strict';

var TemplateUtils = {
    escapeFormatting: function escapeFormatting(s) {
        return s ? '' : s.replace(/<b>/g, "\\textbf{").replace(/<i>/g, "\\textit{").replace(/<u>/g, '\\underline{').replace(/<\/[biu]>/g, "}").replace(/\n/g, "\\newline ");
    },
    escapeLatex: function escapeLatex(s) {
        return s ? '' : s.replace(/\\/g, "\\textbackslash@@emptygroup@").replace(/{/g, "\\{").replace(/}/g, "\\}").replace(/&/g, "\\&").replace(/%/g, "\\%").replace(/_/g, "\\_").replace(/"/g, "''").replace(/\footerbreak/g, "\\linebreak ").replace(/~/g, "\\textasciitilde@emptygroup@").replace(/\n\n/g, "\n\\ \\linebreak ")
        //ok, not beautiful, but it adds strength.
        .replace(/@@emptygroup@@/g, "{}").replace(/@@begingroup@@/g, "{").replace(/@@endgroup@@/g, "}").replace(/@@([^@]+)@@/g, "\\$1");
    },
    formatMoney: function formatMoney(s) {},
    nobreakLatex: function nobreakLatex(s) {
        return s ? '' : s.replace(/ /g, "~");
    },
    nobreakHtml: function nobreakHtml(s) {
        return s ? '' : s.replace(/ /g, "&nbsp;");
    },
    argEach: function argEach(values, callback) {
        for (var i = 0; i < values.length; i++) {
            callback(values[i], i);
        }
    }
};
module.exports.utils = TemplateUtils;

//tag functions for template literal
var TAG = {
    nonEmpty: function nonEmpty(strings, value) {
        if (!value) {
            return '';
        }
    }
};

module.exports.TAG = TAG;

},{}],9:[function(require,module,exports){
'use strict';

var templates = require('./templateModels');
var variables = require('./variableList.js');

//var _ = require('lodash');

var variableHandler = {
    //might not need to pass templateName to function, might want to just send all possible templates
    //getVariable(variableName, templateName) {
    //    var variable = _.find(variables, { name: variableName });
    //    // var variableTemplates = _.pluck(templates, variable.templateClasses);
    //    var templateClasses = _.pick(templates, variable.templateClasses);
    //    // get template lass that we need only
    //    var variableTemplate = _.find(templateClasses, function(templateClass) {
    //        return _.find(templateClass.getTemplateList(), {name: templateName});
    //    });
    //    return { variable: variable, templates: variableTemplate };
    //},
    //getTemplate(variableName, templateName) {
    //    var variable = _.find(variables, { name: variableName });
    //    // var variableTemplates = _.pluck(templates, variable.templateClasses);
    //    var templateClasses = _.pick(templates, variable.templateClasses);
    //    // get template that we need only
    //    return _.find(templateClasses, function(templateClass) {
    //        return _.find(templateClass.getTemplateList(), {name: templateName});
    //    });
    //},

    getHtmlTemplate: function getHtmlTemplate(variableName, templateName, data) {
        var variable = _.find(variables, { name: variableName });
        // var variableTemplates = _.pluck(templates, variable.templateClasses);
        var templateClasses = _.pick(templates, variable.templateClasses);
        // get template that we need only
        var templateClass = _.find(templateClasses, function (templateClass) {
            return _.find(templateClass.getTemplateList(), { name: templateName });
        });

        return templateClass.getTemplateString(data, templateName, true);
    },
    getTemplateClasses: function getTemplateClasses(variableName) {
        var variable = _.find(variables, { name: variableName });
        // var variableTemplates = _.pluck(templates, variable.templateClasses);
        return _.pick(templates, variable.templateClasses);
    },
    getActiveTemplate: function getActiveTemplate(variableName, templateName) {
        var variable = _.find(variables, { name: variableName });
        // var variableTemplates = _.pluck(templates, variable.templateClasses);
        var templateClasses = _.pick(templates, variable.templateClasses);
        return _.find(templateClasses, function (templateClass) {
            return _.find(templateClass.getTemplateList(), { name: templateName });
        });
    },
    getTemplateList: function getTemplateList(variableName) {
        var variable = _.find(variables, { name: variableName });
        var templateClasses = _.pick(templates, variable.templateClasses);
        return _(templateClasses).map(function (templateClass) {
            return templateClass.getTemplateList();
        }).flatten().value();
    },
    getVariableDependencies: function getVariableDependencies(variableName) {
        var variable = _.find(variables, { name: variableName });
        return variable ? variable.dependencies : null;
    }
};

module.exports = variableHandler;

},{"./templateModels":7,"./variableList.js":10}],10:[function(require,module,exports){
'use strict';

/*
* Variable meta data.
* templateClasses lists all valid template classes and should be compatible with the "templateModels/index.js" naming scheme
*
*/
module.exports = [{
    name: 'deal.broker',
    dependencies: ['deals.mainBrokerContactId'],
    templateClasses: ['Contact']
}, {
    name: 'deal.sellers',
    dependencies: ['deals.collections.sellers.contactId', 'deals.collections.sellers'],
    templateClasses: ['Contact']
}, {
    name: 'deal.collections.buyers',
    dependencies: ['deals.buyerGroupId', 'deals.buyerGroupId.collections.buyers', 'deals.buyerGroupId.collections.buyers.contactId'],
    templateClasses: ['Contact']
}, {
    name: 'deal.housingAssociation',
    dependencies: ['deals.housingAssociationId'],
    templateClasses: ['Contact']
}, {
    name: 'deal.commission',
    dependencies: ['deals.commissionId'],
    templateClasses: ['Commission']
}, {
    name: 'deal.easement',
    dependencies: ['deals.housingAssociationId'],
    templateClass: 'Easement'
}];

},{}],11:[function(require,module,exports){
'use strict';

angular.module('mspxVariables', []).service('variableHandler', function () {
    return require('../src/variableHandler.js');
});

},{"../src/variableHandler.js":9}]},{},[11]);
