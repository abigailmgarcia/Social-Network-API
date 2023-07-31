const { connect } = require('mongoose');
const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users, thoughts } = require("./data");

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log("connected");

    try{
        //delete colleections
        await Thought.deleteMany();
        await User.deleteMany();

        //create user
        const createdUsers = await User.insertMany(users);

        //create thoughts with associated user
        const thoughtsWithUserIds = thoughts.map((thought) => {
            const user = createdUsers.find((user) => user._id && user._id.toString() === thought.userId);
            thought.userId = user ? user._id: null;
            return thought;
        });

        //insert though
        await Thought.create(thoughtsWithUserIds);

        console.log('Data seeded succsessfullly!');
    } catch (error) {
        console.error('error seeding data:', error);
    } finally {
        connection.close();
    }
});