/**
 * Created by rasulniyazimbetov on 11/04/16.
 */

var assert = require('chai').assert;
//var Commission = new require('../src/templateModels/commission');
var Classes = require('../src/templateModels');
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

describe('COMMISSION TEMPLATE CLASS', () => {
    var testData = {
        commission: data
    };

    var CommissionTemplateClass = require('../src/templateModels/commission').CommissionTemplate;

    it('shall test commission template class', (done) => {
        var result = CommissionTemplateClass.getTemplateString(testData, 'commissionWithoutVAT');
        console.log(result);
        assert.equal(result, 'hello world');
        done();
    });

    it('shall test commission html', function() {
        var result = CommissionTemplateClass.getTemplateString(testData, 'commissionWithoutVAT', true);
        assert.equal(result, 'hello world');
    });

    it('shall get object class reference', function() {
        var baseClass = CommissionTemplateClass.getBaseClass();

        //assert.equal(baseClass, 'hello world');
    });
});