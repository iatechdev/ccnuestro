const db = require('./lib/dbconnet');
const https = require('https');
const fs = require('fs');

const express = require('express');
const morgan = require('morgan');

//Initialization
const app = express();

//Setting
app.set('port', process.env.PORT || 4002);

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const key = fs.readFileSync('/etc/ssl/iatech.key');
const cert = fs.readFileSync('/etc/ssl/certs/iatech.crt'); 
const options = {
    key:key,    
    cert:cert
};

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With, Content-Type, Accept,Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATH,DELETE,GET')
        return res.status(200).json({});
    }
    next(); 
});

//routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/themes',require('./routes/api/themes'));
app.use('/api/personalData',require('./routes/api/personalData'));
//start the server

https.createServer(options, app).listen(4002);

/*app.listen(app.get('port'), () => {
    console.log(`Server On Port ${app.get('port')}`);
});*/