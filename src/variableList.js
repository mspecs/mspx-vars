

/*
* Variable meta data.
* templateClasses lists all valid template classes and should be compatible with the "templateModels/index.js" naming scheme
*
*/
module.exports = [
    {
        name : 'deal.broker',
        path :'deals.mainBrokerContactId',
        templateClasses:['Contact']
    },
    {
        name : 'deal.sellers',
        path : 'deals.collections.sellers.contacts',
        templateClasses:['Contact']
    },
    {
        name : 'deal.collections.buyers',
        path :'deals.buyerGroupId.collections.buyers.contacts',
        templateClasses:['Contact']
    }
];