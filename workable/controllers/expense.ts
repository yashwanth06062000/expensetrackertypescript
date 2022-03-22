
const expense=require('../models/expense')
const ledb=require("../models/leaderboard")
const items_perpage=2;

exports.addexpense=(async (req,res,next)=>{
    const money=req.body.money;
    const description=req.body.description;
    const category=req.body.category
    
    req.user.createExpense({
        ctegory:category,
        money:money,
        description:description
    }).then(  ()=>{
        console.log(req.user)
      req.user.getLeaderboard().then(async (e)=>{
         var value= e.dataValues.totalexpense
         value +=Number(money)
         await e.update({totalexpense: value}).then((e1)=>{console.log(e1)}).catch(err=>console.log(err))
        
        
    }).catch(err=>console.log(err))
    res.json({message:"successfully added"})
       
    
})})


exports.getexpenses=(async (req,res,next)=>{
    console.log("i am in expenses")
  const page= req.query.page || 1 ;
  let totalitems=0
  const userId=req.user.id;
  const expcount=await expense.count({where:{UserId:userId}})
  const hasnextpage=items_perpage*page<expcount;
  const haspreviouspage=page>1;
  const nextpage=Number(page)+1;
  const previouspage=Number(page)-1;
  const lastpage=Math.ceil(expcount/items_perpage)
  let obj={
      currentpage:Number(req.query.page),
      hasnextpage:hasnextpage,
      haspreviouspage:haspreviouspage,
      nextpage:nextpage,
      previouspage:previouspage,
      lastpage:lastpage
  }



req.user.getExpenses({offset:(page-1)*items_perpage,limit:items_perpage}).then((expenses)=>{
        res.json({expenses,success:true,obj})

    }).catch(err=>console.log(err))
})

exports.deleteexpense=(async (req,res,next)=>{
    const dltid=req.body.id;
    expense.findByPk(dltid).then((expensed)=>{
        req.user.getLeaderboard().then(async (e)=>{
            // console.log(e,"i am e boy u are searching for")
            var value= e.dataValues.totalexpense
            value -=Number(expensed.money)
            await e.update({totalexpense: value})})

         expensed.destroy();
         res.sendStatus(201)



    }).catch(err=>console.log(err))
    

})
