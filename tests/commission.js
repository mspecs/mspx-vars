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
    "updatedDate": "2014-12-29T15:25:59.000Z",
    currency: 'SEK',
};

describe('COMMISSION LATEX', () => {
    var commission = new Classes.Commission(data);
    it('shall get formatted money', (done) => {
        var format = commission.formatMoney(5);
        assert.equal(format, '5~');
        done();
    });

    it('shall test printing values', (done) => {
        var printString = commission.sum + commission.soldWithoutVAT + commission.broker + commission.baseFee;

        var compareValue = `rvode kommer att utgå med 50000~\n\nArvodet är ,exklusive moms.\n\n
        Arvodet kan överlåtas på juridisk person under vilken fastighetsmäklaren arbetar.\n\n
        Arvode kommer att utgå med null~. Därutöver kommer provision utgå`;
        assert.equal(printString, compareValue);
        done();
    });

    it('shall print fixed commission price', (done) => {
        var printString = `${commission.sum}
                            ${commission.soldWithoutVAT}
                            ${commission.broker}`;

        var equalValue = `Arvode kommer att utgå med 50000~
                            Arvodet är ,exklusive moms.
                            Arvodet kan överlåtas på juridisk person under vilken fastighetsmäklaren arbetar.`;

        assert.equal(printString, equalValue);
        done();
    });

    it('shall test default pass', (done) => {
        var value = commission.provisionPaid;
        assert.equal(value, 'Provision ska utgå');
        done();
    });
});

describe('COMMISSION HTML', () => {
    var commission = new Classes.Commission(data, null, true);

    it('shall get formatted money', (done) => {
        var format = commission.formatMoney(5);
        assert.equal(format, '5&nbsp;');
        done();
    });
});