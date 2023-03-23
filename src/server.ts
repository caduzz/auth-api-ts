import express from "express";
import routes from "./routes";
var bodyParser = require('body-parser')
    
const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(routes)

app.listen(3000, () => {
    console.log('oi 😎')
})