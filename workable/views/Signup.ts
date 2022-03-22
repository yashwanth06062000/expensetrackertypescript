const form=document.getElementById('Signupdiv')
form.addEventListener('click',(e)=>{
    if(e.target.className=="signupbutton"){
        const name=document.getElementById("name").value
        const email=document.getElementById("email").value
        const phone=document.getElementById("phone").value
        const password=document.getElementById("password").value
        e.preventDefault();
        const obj={
            name:name,
            email:email,
            phone:phone,
            password:password
        }
        axios
        .post("http://localhost:3000/signup",obj)
        .then((res)=>{
            console.log(res)
            alert(res.data.message)
            window.location.replace('./Login.html')
            
        })
        .catch(err=>console.log(err))    
    
    }

})



