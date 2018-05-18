const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')

const accounts = require('./routes').accounts;

// Define the application characteristics
let app = express()
app.set('port', process.env.PORT || 3000); 
app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/accounts', accounts.getAccounts);
app.post('/accounts', accounts.addAccount);
app.put('/accounts/:id', accounts.updateAccount);
app.delete('/accounts/:id', accounts.removeAccount);

app.use(errorhandler())

app.listen(app.get("port"));