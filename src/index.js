const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector');
const {createDatabase} = require("./createDatabase");
const collection_Model = require("./schema");



app.get('/totalRecovered',async   (req,res)=>{
    const user = await collection_Model.find();
    let totalRecovered = 0;
    await user.map(item=>totalRecovered += item.recovered);
    res.send({_id:"total",
    "recovered":totalRecovered});
});

app.get('/totalActive',async(req,res)=>{
    const user = await collection_Model.find();
    let recovered = 0;
    let infected = 0;
    await user.map((item)=>{
        recovered += item.recovered;
        infected  += item.infected;
    });
    const totalActive = (infected-recovered);
    res.send(
        {
            _id:"total",
            "recovered":totalActive
        });
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;