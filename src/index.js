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
});

app.get('/totalDeath',async(req,res)=>{
    const user = await collection_Model.find();
    let totalDeath = 0;
    await user.map((item)=>{
        totalDeath += item.death;
        
    });
    
    res.send(
        {
            _id:"total",
            "death":totalDeath
        });
});

app.get('/hotspotStates',async(req,res)=>{
    const user = await collection_Model.find();
    let infected = 0;
    let recovered = 0;
    let hotSpot = [];
    await user.map((item)=>{
        infected  = item.infected;
        recovered = item.recovered;
        let ans = (infected-recovered)/infected; 
        ans = ans.toFixed(5);

        if(ans>0.1) {
            hotSpot = [...hotSpot,{state:item.state,rate:ans}];
        } 
    });

    res.send(hotSpot);  
});


app.get('/healthyStates',async(req,res)=>{
    const user = await collection_Model.find();
    let mortallity = 0;
    let death = 0;
    let infected = 0;
    let array = [];
    await user.map((item)=>{
        death  = item.death;
        infected = item.infected;
        let mortallity = death/infected; 
        mortallity = mortallity.toFixed(5);

        if(mortallity<0.005) {
            array = [...array,{state:item.state,rate:mortallity}];
        } 
    });

    res.send(array);  
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;