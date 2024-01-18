require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PVT_SECRET);

app.use(express.json());
app.use(cors());



//public key api
app.get("/api/config",async(req,res)=>{
    // console.log("hello")
    res.json({pkey :  process.env.STRIPE_PUBLIC_SECRET})
 
})

// checkout api
app.post("/api/create-checkout-session",async(req,res)=>{
    const lineItems = [{
        quantity:1,
        price_data:{
            product_data:{
                name:"donation",
                
            },
            currency: req.body.currency,
            unit_amount: parseInt(req.body.amount)*100,
        }
    }];

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"https://donation-app.pages.dev/",
        cancel_url:"https://donation-app.pages.dev/",
    });
    res.json({id:session.id})
})


app.listen(7000,()=>{
    console.log("server start")
})
