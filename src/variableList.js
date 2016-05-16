


module.exports = [
    {
        name : 'deal.broker',
        path :'deals.mainBrokerContactId',
        templateClass:'contacts'
    },

    {
        name : 'deal.sellers',
        path : 'deals.collections.sellers.contacts'
    },

    {
        name : 'deal.seller.account',
        path :''
    },

    {
        name : 'deal.collections.buyers',
        path :'deals.buyerGroupId.collections.buyers.contacts',
    }
];