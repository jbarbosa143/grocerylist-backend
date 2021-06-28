let Grocery = require("../model/Grocery")

async function getAllGroceries(req,res){
    try {
        if(Object.keys(req.query).length === 0){
            let foundGroceries = await Grocery.find({})
            res.json({message:"success", payload:foundGroceries})
        } else {
            let sortedGroceries = await Grocery.find({}).sort({date: req.query.date});
            // console.log(sortedGroceries)
            res.json({message:"success", payload:sortedGroceries})
        }
    } catch (error) {
        res.status(500).json({message:"error", error:error.message})
    }
}

async function createGrocery(req, res){
    try {
        let createGrocery = new Grocery({
            grocery: req.body.grocery,
            purchased:false,
            date: Date.now()
        })

        let savedGroceries = await createGrocery.save()
        res.json({message:"success", payload:savedGroceries})
    } catch (error) {
        res.status(500).json({message:"error", error:error.message})
    }
}

async function updateGrocery(req,res){
    try {
        let updatedGroceries = await Grocery.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.json({message:"success", payload:updatedGroceries})
    } catch (error) {
        res.status(500).json({message:"error", error:error.message})
    }
}

async function deleteGrocery(req,res){
    try {
        let deletedGrocery = await Grocery.findByIdAndDelete(req.params.id)
        res.json({message:"success", payload:deletedGrocery})
    } catch (error) {
        res.status(500).json({message:"error", error:error.message})
    }
}

async function sortByPurchased(req,res){
    try {
        let purchased = req.query.purchased
        let isPurchasedOrder = purchased ==="true" ?true:false
        let sortByPurchased = req.query.sort?req.query.sort:null
        let finalSort
        if(!sortByPurchased){
            finalSort = null
        } else{
            finalSort = sortByPurchased === "asc" ?1 :-1
        }
        let sortedGroceries = await Grocery.find({purchased:isPurchasedOrder}).sort({purchased:finalSort})
        console.log(sortedGroceries)
        res.json({message:"success", payload:sortedGroceries})
    } catch (error) {
        res.status(500).json({message:"error", error:error.message})
    }
}

module.exports = {
    getAllGroceries,
    createGrocery,
    updateGrocery,
    deleteGrocery,
    sortByPurchased
};