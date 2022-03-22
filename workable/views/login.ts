const form=document.getElementById('Signupdiv')
form.addEventListener('click',(e)=>{
    e.preventDefault();
    

    if(e.target.className=="signupbut"){
        window.location.replace('./Signup.html')
        // window.location= "http://localhost:3000/Views/Signup.html";
    }
    if(e.target.className=="forgotbutton"){
        window.location.replace('./forgotpassword.html')

    }
    if(e.target.className=="loginbutton"){
        const email=document.getElementById("email").value
        const password=document.getElementById("password").value
       
        const obj={
            email:email,
            password:password
        }
        axios
        .post("http://localhost:3000/login",obj)
        .then((res)=>{
            localStorage.setItem("token",res.data.token);
            window.location.replace('./expensefeautres.html')
            // window.location= "http://localhost:3000/Views/expensefeautres.html";
        })
        .catch(err=>console.log(err))    
    
        }

})