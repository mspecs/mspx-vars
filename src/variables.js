/**
 * Created by rasulniyazimbetov on 22/03/16.
 */

var _ = require('underscore');

var printDeal = require('../../printDeal');

var databaseMarkup = printDeal.databaseMarkup;

var exceptionVariables = ['deal.commission.discount', 'deal.commission.discountPercentage', 'deal.housingAssociation',
    'listLoans', 'sideLines'];

var getVariablesMW = function(req, res, next) {

    var sanitisedVariables = _.chain(databaseMarkup).map(function(variable) {
        // we need to avoid templates
        // if it has template property, then it's template :), some variables have template property as well,
        // so we need to check exception list
        if (!variable.template && !_.contains(exceptionVariables, variable.name)) {
            return _.pick(variable, 'name');
        }
    }).compact().value();

    res.send({variables: sanitisedVariables, templates: htmlTemplates});
};

exports.getVariablesMW = getVariablesMW;

var htmlTemplates = [
    {
        "name": "text",
        "value": "html value"
    },
    {
        "name": "textUpperCase",
        "value": "html value"
    },
    {
        "name": "textLowerCase",
        "value": "html value"
    },
    {
        "name": "year",
        "value": "html value"
    },
    {
        "name": "number",
        "value": "html value"
    },
    {
        "name": "money",
        "value": "html value"
    },
    {
        "name": "date",
        "value": "html value"
    },
    {
        "name": "amount",
        "value": "html value"
    },
    {
        "name": "amountVAT",
        "value": "html value"
    },
    {
        "name": "amountWithoutVAT",
        "value": "html value"
    },
    {
        "name": "amountRightJustified",
        "value": "html value"
    },
    {
        "name": "amountRightJustifiedSEK",
        "value": "html value"
    },
    {
        "name": "amountInBox",
        "value": "html value"
    },
    {
        "name": "amountSpelledOut",
        "value": "html value"
    },
    {
        "name": "contactDateAndSign",
        "value": "html value"
    },
    {
        "name": "spouseConsentSign",
        "value": "html value"
    },
    {
        "name": "consentSign",
        "alias": "spouseConsentSign",
        "value": "html value"
    },
    {
        "name": "contactNameAndSSN",
        "value": "html value"
    },
    {
        "name": "contactInfoFull",
        "value": "html value"
    },
    {
        "name": "contactsInfoFull",
        "alias": "contactInfoFull",
        "value": "html value"
    },
    {
        "name": "groupedContactInfo",
        "value": "html value"
    },
    {
        "name": "contactInfo",
        "value": "html value"
    },
    {
        "name": "contactsInfo",
        "alias": "contactInfo",
        "value": "html value"
    },
    {
        "name": "contactInfoMedium",
        "value": "html value"
    },
    {   "name": "contactsInfoMedium",
        "value": "html value",
        "alias": 'contactInfoMedium'
    },
    {
        "name": "contactInfoMedium2",
        "value": "html value"
    },
    {   "name": "contactsInfoMedium2",
        "value": "html value",
        "alias": 'contactInfoMedium2'
    },
    {
        "name": "contactInfoShares",
        "value": "html value"
    },
    {
        "name": "contactsInfoShares",
        "alias": "contactInfoShares",
        "value": "html value"
    },
    {
        "name": "contactsInfoParts",
        "alias": "contactInfoShares",
        "value": "html value"
    },
    {
        "name": "contactInfoParts",
        "alias": "contactInfoShares",
        "value": "html value"
    },
    {
        "name": "contactInfoShort",
        "value": "html value"
    },
    {
        "name": "contactsInfoShort",
        "alias": "contactInfoShort",
        "value": "html value"
    },
    {
        "name": "contactName",
        "value": "html value"
    },
    {
        "name": "contactsName",
        "alias": "contactName",
        "value": "html value"
    },
    {
        "name": "estateDescription",
        "value": "html value"
    },
    {
        "name": "apartmentDescription",
        "alias": "estateDescription",
        "value": "html value"
    },
    {
        "name": "communicationToken",
        "value": "html value"
    },
    {
        "name": "clacba",
        "value": "html value"
    },
    {
        "name": "easementTypeIsCOMMUNITYFACILITIES",
        "value": "html value"
    },
    {
        "name": "easementTypeIsCOMMUNITYFACILITIESFarming",
        "value": "html value"
    },
    {
        "name": "easementTypeIsNotCOMMUNITYFACILITIES",
        "value": "html value"
    },
    {
        "name": "easementTypeIsNotCOMMUNITYFACILITIESFarming",
        "value": "html value"
    },
    {
        "name": "commission",
        "value": "html value"
    },
    {
        "name": "commissionType",
        "value": "html value"
    },
    {
        "name": "commissionWithoutVAT",
        "value": "html value"
    },
    {
        "name": "faultOrDefectOnEstate",
        "value": "html value"
    },
    {
        "name": "newpage",
        "value": "html value"
    },
    {
        "name": "linebreak",
        "value": "html value"
    },
    {
        "name": "underline",
        "value": "html value"
    },
    {
        "name": "underlineShort",
        "value": "html value"
    },
    {
        "name": "paragraphnumber",
        "value": "html value"
    },
    {
        "name": "mortgageList",
        "value": "html value"
    }
];