const path            = require('path')
const express         = require('express')
const app             = express()
const SocketIO        = require('socket.io')
const client_mongo    = require('./config/database.js')
const bodyParser      = require('body-parser');

const mongo = client_mongo()
require('events').EventEmitter.prototype._maxListeners = 0;



// settings
app.set('port', process.env.PORT || 3050 )

// static files
app.use(express.static(path.join(__dirname,'public')))

const server = app.listen(app.get('port'), ()=>{ 
    console.log('server on port', app.get('port'))
})



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(require('./api/api.js'));
