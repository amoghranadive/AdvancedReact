const Mutations = {
    async createItem(parent, args, context, info) {
        // TODO: authenticate

        const item = await context.db.mutation.createItem({
            data: {
                ...args
            }
        }, info);

        return item;
    },

    async updateItem(parent, args, context, info) {
        // first take a copy of the args
        const updates = { ... args }
        // remove id from the args
        delete updates.id;
        // run the update method
        const item = await context.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id            
            }
        }, info);
        
        return item;
    },

    async deleteItem(parent, args, context, info) {

        const where = { id: args.id };

        // 1. find the id
        const item = await context.db.query.item({ where }, `{ id title }`);

        // 2. check if the user owns the item

        // 3. Delete
        const deleted = await context.db.mutation.deleteItem( { where }, info);       
        return deleted;
    }
};

module.exports = Mutations;
