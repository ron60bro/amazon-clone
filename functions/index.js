const functions = require("firebase-functions");

const express= require("express");
const cors=require("cors");
const { response } = require("express");

const stripe = require("stripe")
("sk_test_51MGHjDSAVOIzWBre6vzsujuqpHnopv4CnIzFLZxX5iJIqGgaH9xMx0sMChaSD1UtYdvqMscm4qpBYO02Oamv6Mbz006vMEJZln");

// API

// App config
    const app =express()
//Middlewares
app.use(cors({origin:true}));
app.use(express.json());
//API routes
app.get("/",(req,res)=>{
    res.status(200).send('Hello World')
})


app.post("/payments/create",async(req,res)=>{
    const total=req.query.total;
    console.log('Payment Request Received BOOM !!',total)

    const paymentIntent=await stripe.paymentIntents.create({
        amount:total,
        currency:"usd"
    })
    response.status(201).send({
        clientSecret:paymentIntent.client_secret
    })
})
//Listen command
exports.api=functions.https.onRequest(app)


// http://127.0.0.1:5001/challenge-5cff0/us-central1/api