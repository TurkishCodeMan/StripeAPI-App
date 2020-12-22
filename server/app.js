const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser")


//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/api", (req, res, next) => {
    return res.json({ message: "Stripe Using App" })
})

app.post("/api/checkout", (req, res, next) => {
    console.log(req.body)
    try {

        let token = req.body.token;

        if (token.type == "card") {
            stripe.charges.create({
                amount: 1000, //10 dolar demek
                source: token.id,
                currency: 'usd',
                description: "Order Computer"
            }).then(() => {
                return res.json({ message: "Payment Succesfully" })
            }).catch(err => {
                console.log(err);
                return res.json({ message: "Payment Failed !" })
            })
        }
    } catch (error) {
        res.json({message:req.body.error.message})
    }
})


const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (err) throw err;
    console.log("Listening on port " + port);
})