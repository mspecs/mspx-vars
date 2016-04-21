'use strict';

var assert = require('chai').assert;

let data = [
    {
        logEntryId: 'GHSDD',
        description: 'lorem ipsum',
        easementType:'ENUMS_EASEMENTTYPE_COMMUNITYFACILITIES'
    }, {
        logEntryId: 'AAA',
        description: 'descibe this mang!',
        easementType:'ENUMS_EASEMENTTYPE_COMMUNITYFACILITIES'
    }, {
        logEntryId: 'BBB',
        description: 'describe this mang!',
        easementType:'ENUMS_EASEMENTTYPE_PLANSANDREGULATIONS'
    }, {
        logEntryId: 'CCC',
        description: 'describe this mang!',
        easementType:'ENUMS_EASEMENTTYPE_PLANSANDREGULATIONS'
    }];

describe('EASMENT TEMPLATE CLASS', () => {
    var EasmentTemplates = require('../src/templateModels/easement');

    describe('easementTypeIsCOMMUNITYFACILITIES', () => {
        it('should generate the correct template', () => {
            var expected = '\\\\vbox{\\n}\\nfastigheten har del i följande samfälligheter eller gemensamhetsanläggningar:\\nGHSDD(lorem ipsum)\\nAAA(descibe this mang!)\\n';

            var result = EasmentTemplates.getTemplateString(data, 'easementTypeIsCOMMUNITYFACILITIES', true);
            assert.equal(result, expected);
        });
    });
});