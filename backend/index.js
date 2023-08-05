const connectToMongo = require('./db');
const express = require('express')
const bodyParser = require('body-parser')
const schedule = require('node-schedule');
require('dotenv').config();
const mailer = require('./mailer')
var cors = require('cors')
// const dotenv = require('dotenv')
connectToMongo();
// dotenv.config()
const app = express();
const port = 5000;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors())
app.use(express.json())


schedule.scheduleJob('0 0 * * *', async ()=>{
  console.log('The answer to life, the universe, and everything!');
  try {
    await mailer();
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
});

app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
}) 