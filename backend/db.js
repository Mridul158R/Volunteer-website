const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.REACT_APP_DATABASEURL;


const connectToMongo = ()=>{
    console.log("connected");
    mongoose.set('strictQuery', false);
    mongoose.connect(mongoURI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
       }).then(() => console.log("Database connected!")).catch(err => console.log(err));
}
 
module.exports = connectToMongo;   
