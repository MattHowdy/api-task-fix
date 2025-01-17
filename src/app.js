
const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const routes = require('./routes')
const mongoose = require('mongoose')


dotenv.config()
const PORT = process.env.PORT || 4001

mongoose.set('useFindAndModify', false)
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection

connection.once("open", ()=>{
    console.log("Database is connected")
})


app.use(bodyParser.json({}))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
const whitelist = [
    'http://localhost:4001', 'https://web-task-fix.herokuapp.com/'
]

const corsOptions = {
    origin: function (origin, callback) {
      try {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          console.log('Bad cors')
          callback(null, true)
        }
      } catch (error) {
        console.log('error in cors')
      }
    },
    credentials: true,
  }
  
app.use(cors(corsOptions))

  
app.use('/', routes)


app.listen(PORT, () => {
 console.log(`server started on port ${PORT}`);
});
