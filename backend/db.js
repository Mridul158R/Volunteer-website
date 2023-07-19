const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://mridultiwari70:Tiwari15@cluster0.kwofqad.mongodb.net/volunteer?retryWrites=true&w=majority'


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