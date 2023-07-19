import express from "express";
import path from "path"
import cors from "cors"

import routes from "./routes";
var bodyParser = require('body-parser')
    
const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(cors())

app.use(routes)

//images
app.use('/image', express.static(path.resolve(__dirname, '..', 'uploads')))

const port = 2525;

app.listen(port, () => {
  console.log(port)
  console.log('oi 😎')
})