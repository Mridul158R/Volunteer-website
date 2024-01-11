const mongoose = require('mongoose');
<<<<<<< HEAD
const DB = process.env.MONGO_URI; 
const connectDB= ()=>{
mongoose
  .connect(DB)
  .then(() => {
    console.log("Successfully connected ");
  })
  .catch((error) => {
    console.log(`can not connect to database, ${error}`);
  });
}
module.exports= connectDB
=======
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
>>>>>>> fa98bb2d84ac6f2f43d175bbb799ae0a3b3641aa
