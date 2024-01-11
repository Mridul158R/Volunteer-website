const mongoose = require('mongoose');
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