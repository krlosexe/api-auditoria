const express         = require('express')
const app             = express()
const bcrypt          = require("bcrypt");
const client_mongo    = require('../config/database.js')
const jwt             = require('jsonwebtoken')
const config          = require('../config/config')
const mongo           = client_mongo()

app.set('key', config.key);


exports.auth = async function(request, response) {

    const environmentObject = await config.environments.find( env => env.token == request.body.environment )

    if(environmentObject){
        const payload = {
            check:  true
        };
    
        const token = jwt.sign(payload, app.get('key'), {
            expiresIn: '365d' 
        });
        response.status(200).json({
            "acces-token" : token
        })
    }else{
        console.log("Credenciales Incorrectas")
        response.status(400).json("Credenciales Incorrectas")
    }
    
};


exports.ValidToken = function(request, response) {
    response.status(200).json({
        "acces-token" : "Token Valido"
    })
};


