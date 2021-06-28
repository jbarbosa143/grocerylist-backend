const mongoose = require("mongoose")
let grocerySchema = new mongoose.Schema({
    grocery:{
        type: String
    },
    purchased:{
        type: Boolean
    },
    date:{
        type: Date,
        default: ()=>Date.now()
    }
})

module.exports = mongoose.model("grocery", grocerySchema)