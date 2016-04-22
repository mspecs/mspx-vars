/**
 * Created by rasulniyazimbetov on 20/04/16.
 */
'use strict';

var templateUtils = require('../utils');
var constants = require('../constants');
var Base = require('./baseTemplateModel');
var BaseCollection = require('./baseTemplateCollection');
var TAG = templateUtils.TAG;
var utils = templateUtils.utils;

class Estate extends Base {

    constructor(data, isHtml) {
        super(isHtml);
        Object.assign(this, data);
        this.currency = '';
        this.deferred = data.deferred;
    }

    get haDetails() {
        let ha = this.deferred.housingAssociation;
        let haNameLatex = (ha && ha.name) ? `i bostadsföreningen ${utils.escapeLatex(ha.name)}` : '';
        return this.pass({
            html: '',
            latex: haNameLatex
        });
    }

    get address() {
        let address = this.streetAddress || this.postalCode || this.city ? ' med addressen ' : '';
        let postalLatex = utils.escapeLatex(this.streetAddress) + (this.postalCode && this.city) ? `, ${utils.escapeLatex(this.postalCode)}~${utils.escapeLatex(this.city)}` : '';
        return this.pass({
            html: '',
            latex: address + postalLatex
        });
    }

    get apartmentInfo() {
        return this.pass({
            html: ``,
            latex: `Andelsrätten till lägenhet nr ${this.apartmentNumber || '\\\\xdash[10mm]'}, ${this.haDetails}, ${this.address} ${this.haDetails}`
        });
    }

    get sharedOwnership() {
        return this.pass({
            html: ``,
            latex: `${this.isSharedOwnership ? 'Andelen till b' : 'B'}ostadsrätten till lägenhet nr ${this.apartmentNumber || '\\\\xdash[10mm]'} ${this.address}`
        });
    }

    get isLeashold() {

    }
}

class EstateTemplate extends BaseCollection {
    static getBaseClass() {
        return Estate;
    }
}

module.exports = exports = EstateTemplate;