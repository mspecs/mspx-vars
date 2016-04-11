/**
 * Created by rasulniyazimbetov on 11/04/16.
 */

var assert = require('chai').assert;
//var Commission = new require('../src/templateModels/commission');
var Classes = new require('../src/templateModels');
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
    "updatedDate": "2014-12-29T15:25:59.000Z"
};

describe('COMMISSION', () => {
    var commission = new Classes.Commission(data);
    it('shall get formatted money', (done) => {
        var format = commission.formatMoney(5);
        assert.equal(format, '5~');
        done();
    });

    it('shall test printing values', (done) => {
        var printString = commission.sum + commission.soldWithoutVAT + commission.broker;

        assert.equal(printString, 'Arvode kommer att utgå med 50000~\n\nArvodet är ,exklusive moms.\n\nArvodet kan överlåtas på juridisk person under vilken fastighetsmäklaren arbetar.\n');
        done();
    });
});