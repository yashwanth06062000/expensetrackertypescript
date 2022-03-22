

const period=document.getElementById("period")
const expensecontainer=document.getElementById("reportexpenses")



period.addEventListener("change",async ()=>{
    console.log(document.getElementById("period").value)
    let obj={
        period:document.getElementById("period").value
    };
    const token=await localStorage.getItem("token");
   console.log(token)
    axios
    .get(`http://localhost:3000/report`,{headers:{"Authorization":token}}).then((res)=>{
        const user2=res.data.re
        expensecontainer.innerHTML="";

        for(let i=0;i<user2.length;i++)
                {
                  const expensediv=document.createElement("div")
                  expensediv.classList.add('expensediv')
                  expensediv.innerHTML=`
                  <span>.</span>
                  <span class="desc1">${user2[i].description}</span>
                  <span class="category">${user2[i].ctegory}</span>
                  <span class="money">${user2[i].money}</span>
                  `
        
                  expensecontainer.appendChild(expensediv)
                }
    })



})
const back=document.getElementById('back')
back.addEventListener("click",()=>{
    window.location.replace('./expensefeautres.html')

})


const downloadreport=document.getElementById("download")
downloadreport.addEventListener("click",async ()=>{
    console.log("yes i am clicked download report")
    const token=localStorage.getItem("token");
    axios
    .get(`http://localhost:3000/downloadreport`,{headers:{"Authorization":token}})
    .then((result)=>{
        if(result.status===200){
            var a=document.createElement("a");
            a.href=result.data.fileurl;
            a.download=`myexpenses.csv`;
            a.click();
        }

    })
    .catch(err=>console.log(err))

})