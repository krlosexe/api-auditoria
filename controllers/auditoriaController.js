const express         = require('express')
const app             = express()
const bcrypt          = require("bcrypt");
const client_mongo    = require('../config/database.js')
const jwt             = require('jsonwebtoken')
const config          = require('../config/config')
const mongo           = client_mongo()

app.set('key', config.key);




exports.Store = async function(request, response) {
    const dbo = mongo.db("medical");

    const environmentObject = await config.environments.find( env => env.token == request.body.environment )
    if(environmentObject){
        await dbo.collection("auditoria").insertOne(request.body, function(err, res) {
            console.log("auditoria Register");
        });
        response.status(200).json({"data" : request.body})
    }else{
        response.status(403).json("environment incorrecto")
    }

};


exports.GetData = async function(request, response) {
    const dbo   = mongo.db("medical");
    const where = {
        "record_id" : `${request.params.record_id}`,
        "instance"  : request.params.instance,
        "table"     : request.params.table
    }
    const result = dbo.collection("auditoria").find(where).toArray()

    await result.then((data) => {
        response.status(200).json(data)
    })
};
