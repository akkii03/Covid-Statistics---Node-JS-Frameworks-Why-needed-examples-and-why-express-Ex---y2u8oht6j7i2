const mongoose  = require('mongoose');

// const tallySchema = new Schema({
//     state: Schema.Types.String,
//     infected: Schema.Types.Number,
//     recovered: Schema.Types.Number,
//     death: Schema.Types.Number,
// })

const tallySchema = new mongoose.Schema({
    state:{
        type:String
    },
    infected:{
        type:Number
    },

    recovered:{
        type:Number
    },

    death:{
        type:Number
    }

});

const collection_Model = mongoose.model('covidtally', tallySchema)


module.exports = collection_Model;