const express = require('express')
const bodyParser = require('body-parser')
const schedule = require('node-schedule');
const multer=require('multer')
const mailer = require('./mailer')
const path = require("path");
const dotenv=require("dotenv")
dotenv.config({ path: "./.env" })
var cors = require('cors')
const connectDB =require ('./db.js')
const app = express();
const port=5000
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors()) 
app.use(express.json())

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
     cb(null,path.join(__dirname, "../src/Images"))
  },
  filename:(req,file,cb)=>{
    
     cb(null,file.originalname)
  }
})
const upload=multer({
  storage:storage
})
schedule.scheduleJob('15 20 * * *', async ()=>{
  console.log('The answer to life, the universe, and everything!');
  try {
    await mailer();
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
});


app.post("/upload-image",upload.single('image'),async(req,res)=>{
    

})
app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));
app.listen(port, () => {
  console.log(`backend listening at http://localhost:${port}`)
}) 
connectDB();

 
