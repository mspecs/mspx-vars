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

describe('COMMISSION', () => {
    var commission = new Classes.Commission();
    it('shall test commission', (done) => {
        var format = commission.formatMoney(5);
        assert.equal(format, 'hello world');
        done();
    });
});



describe('CONTACT', () => {
    var contact = new Classes.Contact();
    describe('templates', ()=> {
        it('should get templates and return full list of templates and aliases', () => {
            assert.equal(contact.templates.length > 7);
        });
    })
});