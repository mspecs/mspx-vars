/**
 * Created by rasulniyazimbetov on 20/04/16.
 */
'use strict';

var _ = require('lodash');

var templateUtils = require('../utils');
var constants = require('../constants');
var Base = require('./baseTemplateModel');
var BaseCollection = require('./baseTemplateCollection');

var TAG = templateUtils.TAG;
var utils = templateUtils.utils;

class Estate extends Base {

    // TODO: instead of using deferred property, we are going to reference cache object
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
        return this.pass({
            html: '',
            latex: this.isPartOf ?  'Del av t' : (this.isSharedOwnership ? 'Andelen till t' : 'T') + `omträtten till ${this.propertyName} ${this.address}`
        });
    }

    get noLeashold() {
        // TODO: we don't have any this.estates values, we need to figure out where to store them
        let response = _.reduce(this.estates, (memo, estate) => {
            return memo + estate.isPartOf ? 'Del av f' : (estate.isSharedOwnership ? 'Andelen till f' : 'F');
        });

        return this.pass({
            html: '',
            latex: response
        });
    }

    get estatesWithFaultOrDefect() {
        // TODO: we don't have this.estates yet. we gotta fix it some way
        return _.reject(this.estates, (estate) => {
            return !estate.faultsAndDefectsComment || !estate.faultsAndDefectsComment.length;
        });
    };

    get faultOrDefect() {
        let response;
        response = `Därutöver har säljaren lämnat följande uppgifter om fel eller brister i ${this.objectTypeName == 'OBJECT_TYPE_TENANT_OWNERSHIP' ? 'bostadsrätten' : 'fastigheten'}
        ${this.filteredPropertyNames}`;

        return this.pass({
            html: '',
            latex: response
        });
    };

    get filteredPropertyNames() {
        var response = _.map(this.estatesWithFaultOrDefect, (estate) => {
            let text = '';
            if (this.estatesWithFaultOrDefect.length > 1) {
                text = `\\vbox{\n} ${estate.propertyName}`;
            }

            text += `\\begin{addmargin}[1em]{2em}'${estate.faultsAndDefectsComment}'\\end{addmargin}`;
            return text;
        });

        return this.pass({
            html: '',
            latex: response
        });
    }
}

class EstateTemplate extends BaseCollection {
    static getBaseClass() {
        return Estate;
    }

    static getTemplateList() {
        return templateList;
    }
}

var templateList = [
    {
        name: 'faultOrDefectOnEstate',
        latex: {
            body(estates) {

            }
        },
        html: {
            body(estates) {

            }
        },
        getTemplateString(data, isHtml) {

        }
    },
    {
        name: 'estateDescription',
        latex: {
            body(estate) {

            }
        },
        html: {
            body(estate) {

            }
        },
        getTemplateString(data, isHtml) {

        }
    }
];

module.exports = exports = EstateTemplate;