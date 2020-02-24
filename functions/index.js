const functions = require('firebase-functions');
const express = require('express')
const admin = require('firebase-admin')
admin.initializeApp();
const request = require('request');
const app = express();
const cors = require('cors')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

app.use(cors({origin:true}))
app.get('/stocks', (req,res) => {
    const options = {
        method: 'GET',
        url: `https://financialmodelingprep.com/api/v3/company/profile/AAPL`
    };
    request(options, (error, response) => {
        if(error) throw new Error(error);
        const data = JSON.parse(response.body)
        console.log(data.profile.image);
        res.send({data})
    })
})

app.get('/stock', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error:'You must provide a search symbol'
        })
    }  
    console.log(req.query.search)
    const options = {
        method: 'Get',
        url:`https://financialmodelingprep.com/api/v3/search?query=${req.query.search}&limit=10`
    }
    request(options, (error, response) => {
        if(error) throw new Error(error);
        const data = JSON.parse(response.body)
        res.send({data})
    })
})

app.get('/events', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error:'You must provide a search symbol'
        })
    }  
    console.log(req.query.search)
    const options = {
        method: 'Get',
        url:`https://cloud.iexapis.com/stable/stock/${req.query.search}/news?token=${functions.config().iod.key}`
    }
    request(options, (error, response) => {
        if(error) throw new Error(error);
        const data = JSON.parse(response.body)
        res.send({data})
    })
})

app.get('/income-statement', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error:'You must provide a search symbol'
        })
    }  
    console.log(req.query.search)
    const options = {
        method: 'Get',
        url:`https://cloud.iexapis.com/stable/stock/${req.query.search}/income?period=annual&last=12&token=${functions.config().iod.key}`
    }
    request(options, (error, response) => {
        if(error) throw new Error(error);
        const data = JSON.parse(response.body)
        res.send({data})
    })
})

app.get('/cash-flow', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error:'You must provide a search symbol'
        })
    }  
    console.log(req.query.search)
    const options = {
        method: 'Get',
        url:`https://cloud.iexapis.com/stable/stock/${req.query.search}/cash-flow?period=annual&last=12&token=${functions.config().iod.key}`
    }
    request(options, (error, response) => {
        if(error) throw new Error(error);
        const data = JSON.parse(response.body)
        res.send({data})
    })
})



function justName(data){
    return data.profile.companyName;
}

exports.api = functions.https.onRequest(app)