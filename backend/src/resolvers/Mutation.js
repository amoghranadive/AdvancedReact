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
    }
};

module.exports = Mutations;
