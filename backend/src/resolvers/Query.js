const { forwardTo } = require('prisma-binding');

const Query = {
   /*async items(parent, args, context, info) {

        var items = await context.db.query.items({}, info);

        return items;
    },*/

    items: forwardTo('db'),
    item: forwardTo('db')
};

module.exports = Query;
