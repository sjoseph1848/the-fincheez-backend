const functions = require('firebase-functions');
const express = require('express')
const admin = require('firebase-admin')
const request = require('request');
const app = express();
const cors = require('cors')

admin.initializeApp();

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
        url:`https://cloud.iexapis.com/stable/stock/${req.query.search}/company?token=${functions.config().iod.key}`
    }
    request(options, (error, response) => {
        if(error) throw new Error(error);
        const data = JSON.parse(response.body)
        res.send({data})
    })
})



//https://us-central1-fincheez-55527.cloudfunctions.net/events?search=aapl
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

//https://us-central1-fincheez-55527.cloudfunctions.net/income-statement?search=aapl
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

//https://us-central1-fincheez-55527.cloudfunctions.net/cash-flow?search=aapl
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

//https://us-central1-fincheez-55527.cloudfunctions.net/api/news
app.get('/news', (req,res) => {
    const options = {
        method: 'GET',
        url: `http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${functions.config().news.key}`
    };
    request(options, (error, response) => {
        if(error) throw new Error(error);
        const data = JSON.parse(response.body)
        console.log(data)
        res.send({data})
    })
})


exports.api = functions.https.onRequest(app)