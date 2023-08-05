const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.REACT_APP_DATABASE;


const connectToMongo = ()=>{
    mongoose.set('strictQuery', false);
    console.log(process.env.REACT_APP_DATABASE);
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
       }).then(() => console.log("Database connected!",process.env.REACT_APP_DATABASE)).catch(err => console.log(err));
}
 
module.exports = connectToMongo;   