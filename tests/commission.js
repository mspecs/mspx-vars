/**
 * Created by rasulniyazimbetov on 11/04/16.
 */

var assert = require('chai').assert;

var _ = require('lodash');
//var Commission = new require('../src/templateModels/commission');
var Classes = require('../src/templateModels');

var variableHandler = require('../src/variableHandler');
/*var user = new require('../src/templateModels/').User;

 describe('USER', function() {
 it('shall test users', function(done) {
 console.log('hello world');
 done();
 });
 });*/

var data = {
    "id": "MDAwMnwwMDAwMDAwMDAwMXw4OA..",
    "minimumCommissionFee": null,
    "maximumCommissionFee": null,
    "paymentDate": null,
    "discountPercentage": null,
    "discountAmount": null,
    "isDiscountInPercentage": false,
    "isIncludeInSettlement": false,
    "commissionSum": 50000,
    "commissionBaseFee": null,
    "commissionType": "ENUM_COMMISSION_TYPE_PERCENTAGE",
    "showBrokerAccountInSettlement": false,
    "showDealTokenInSettlement": false,
    "commissionReportedDate": null,
    "companyCutPercentage": null,
    "showCutInReports": false,
    "isCommissionSumSetManually": false,
    "minimumRepresentsFixedPrice": false,
    "isSoldWithoutVAT": false,
    "updatedDate": "2014-12-29T15:25:59.000Z",
    currency: 'SEK',
};

//describe('COMMISSION TEMPLATE CLASS', () => {
//    var testData = {
//        commission: data
//    };
//
//    var CommissionTemplateClass = require('../src/templateModels/commission').CommissionTemplate;
//
//    it('shall test commission template class', (done) => {
//
//        var result = CommissionTemplateClass.getTemplateString(testData, 'commissionWithoutVAT');
//        console.log(result);
//        assert.equal(result, 'hello world');
//        done();
//    });
//});

describe('COMMISSION', () => {
    var commissionVariable = 'deal.commission';
    var commissionTemplate = 'commissionWithoutVAT';

    it('shall get template for commission', function() {
        var template = variableHandler.getHtmlTemplate(commissionVariable, commissionTemplate, data);
        console.log(template);
    });

    it('shall get template for commission', function() {
        var templateList = variableHandler.getTemplateList(commissionVariable);
        console.log(templateList);
    });

    it('shall get variable dependency list', function() {
        var dependencies = variableHandler.getVariableDependencies(commissionVariable);
        console.log(dependencies);
    });

    it('shall return template classes', function() {
        var classes = variableHandler.getTemplateClasses(commissionVariable);
        console.log(classes);
    });

    it('shall return active class', function() {
        var template = variableHandler.getActiveTemplate(commissionVariable, commissionTemplate);
        console.log(template);
    });
});