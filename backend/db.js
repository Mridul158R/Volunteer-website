const mongoose = require('mongoose');
const mongoURI = process.env.REACT_APP_mongo;


const connectToMongo = ()=>{
    mongoose.set('strictQuery', false);
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
       }).then(() => console.log("Database connected!")).catch(err => console.log(err));
}

module.exports = connectToMongo; 