

/*
* Variable meta data.
* templateClasses lists all valid template classes and should be compatible with the "templateModels/index.js" naming scheme
*
*/
module.exports = [
    {
        name : 'deal.broker',
        dependencies:['deals.mainBrokerContactId'],
        templateClasses:['Contact', 'Signature']
    },
    {
        name : 'deal.sellers',
        dependencies: ['deals.collections.sellers.contactId',
                        'deals.collections.sellers'],
        templateClasses:['Contact', 'Signature']
    },
    {
        name: 'deal.collections.buyers',
        dependencies:['deals.buyerGroupId',
                        'deals.buyerGroupId.collections.buyers',
                        'deals.buyerGroupId.collections.buyers.contactId'],
        templateClasses:['Contact', 'Signature']
    },
    {
        name: 'deal.housingAssociation',
        dependencies:['deals.housingAssociationId'],
        templateClasses: ['Contact']
    },
    {
        name: 'deal.commission',
        dependencies:['deals.commissionId'],
        templateClasses: ['Commission']
    },
    {
        name: 'deal.easement',
        dependencies:['deals.housingAssociationId'],
        templateClasses: ['Easement']
    }
];