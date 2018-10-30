const Mutations = {
    createDog(parent, args, context, info) {
        global.dogs = global.dogs || [];

        var newDog = { name: args.name };
        global.dogs.push(newDog);
        return newDog;
    }
};

module.exports = Mutations;
