document.getElementById("sendreset").addEventListener("click",(e)=>{
    e.preventDefault()
    const email=document.getElementById("email").value
    console.log(email)
    let obj={
        email:email
    }
    axios
    .post("http://localhost:3000/forgotpassword",obj)
    .then((res)=>{
        alert(res.data.message);
        window.location.replace('./Login.html')

    })
})