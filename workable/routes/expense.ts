const express=require('express')
const router=express.Router()


const expense=require("../controllers/expense")





router.post("/addexpense",expense.addexpense);
router.get("/getexpenses",expense.getexpenses)
router.post("/deleteexpense",expense.deleteexpense)



module.exports=router