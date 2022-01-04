var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routerUser = require('./routes/user');
const routerDashboard = require('./routes/dashboard');


// connection 
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/driver', {useNewUrlParser : true, useUnifiedTopology : true});


// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use('/api/v1/users', routerUser);
app.use('/api/v1/dashboard', routerDashboard);

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);
    res.status(500).json({
        message : 'warnning'
    })
})




app.listen(3000, () => {
    console.log(`Server Running`);
})
