const express             = require('express')
const authController      = require('../controllers/authController.js')
const auditoriaController = require('../controllers/auditoriaController.js')
const middlewareJwt       = require('../middlewares/middlewareAuth.js');
var   multer              = require('multer');


var storage = multer.diskStorage ({ 
    destination: function (req, file, cb) { 
        cb (null, './public/upload'); 
     }, 
    filename: function (req, file, cb) { 
        cb (null, file.originalname ); 
        console.log("saved image")
    } 
});
var upload = multer({ storage: storage })


const Routes = express.Router();

Routes.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-token");
    res.header("Access-Control-Allow-Origin", "*"); 
    next();
});

Routes.post('/api/auth', authController.auth);
Routes.get('/api/valid/token', middlewareJwt, authController.ValidToken);
Routes.post('/api/auditoria', middlewareJwt, auditoriaController.Store);
Routes.get('/api/auditoria/:instance/:table/:record_id', middlewareJwt,auditoriaController.GetData);
module.exports = Routes;


