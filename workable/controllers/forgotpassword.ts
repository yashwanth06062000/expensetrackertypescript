const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv');
const User=require("../models/usersignup")
const uuid = require('uuid');
const Forgotpassword=require("../models/ForgotPasswordRequests")
const encript=require('bcryptjs');
const passwordchangetable=require("../models/usersignup")
const NodeMailer = require('nodemailer')



dotenv.config();


exports.forgotpassword=(async (req,res)=>{
    const email=req.body.email;
    
    const id=uuid.v4();
    await User.findAll({where:{email:email}}).then((user)=>{
 if(user){
    
       

    
    user[0].createForgotpassword({ id:id , isactive: true })
    .catch(err => {
        throw new Error(err)
    })
    
    sgMail.setApiKey(process.env.Send_Grid_Api)
    const transporter = NodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.Mail_id,
            pass: process.env.Password
        }
    })
    const msg = {
        to: email, // Change to your recipient
        from: 'developer06062000@gmail.com', // Change to your verified sender
        subject: 'Link to Your Pasword changing @expenseTracker',
        text: 'Hie please find below link for your password changing',
        html: `<a href="http://localhost:3000/resetpassword/${id}">Reset password</a>`
    }
     transporter.sendMail(msg)
    .then((response) => {
    console.log("sendmail successfully")
    return res.json({message: 'Link to reset password sent to your mail ', sucess: true})

   })
   .catch((error) => {
    console.log(error)
  })
}
else{
    throw new Error('User doesnt exist')
}
})})

exports.resetpassword = (req, res) => {
    const id =  req.params.id;
    Forgotpassword.findOne({ where : { id }}).then(forgotpasswordrequest => {
        if(forgotpasswordrequest){
            forgotpasswordrequest.update({ isactive: false});
            res.status(200).send(`<html>
                                    <form action="/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>Reset password</button>
                                    </form>
                                </html>`
                                )
            res.end()

        }
    })
}
exports.updatepassword=(async (req,res)=>{
    const { newpassword } = req.query;
    const { resetpasswordid } = req.params;
    const hashpassword= await encript.hash(newpassword,10);
    Forgotpassword.findAll({where:{id:resetpasswordid}}).then((usertochange)=>{
        passwordchangetable.findAll({where:{id:usertochange[0].dataValues.UserId}}).then((us)=>{
            console.log(us)
            us[0].update({password: hashpassword}).then(()=>{
                res.json({message:"successfully changed the password"})
            })

        }).catch(err=>console.log(err))
        

    }).catch(err=>console.log(err))

})