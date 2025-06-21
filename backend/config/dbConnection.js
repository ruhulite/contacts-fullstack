const mongoose = require('mongoose');

const connectDb = async () => {
    console.log('Connected to DB...');
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_DB);
        console.log('Connected to DB...>> ', connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDb;