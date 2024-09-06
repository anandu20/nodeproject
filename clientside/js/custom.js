    let arr=[]
    async function getDonors(){
    const res=fetch("http://localhost:3001/getdonors");
    const data=await (await res).json();
    str=``
    data.map((dt)=>{
        str+=`<div class="inp">
            <input type="text" disabled=true value=${dt.name} name="name" id="name-${dt._id}" placeholder="name" class="in"> 
            <input type="text" disabled=true value=${dt.email} name="email" id="email-${dt._id}" placeholder="mail" class="in">
            <input type="text" disabled=true value=${dt.phone} name="phone" id="phone-${dt._id}" placeholder="phone" class="in">
            <input type="text" disabled=true value=${dt.bgp} name="bgp" id="bgp-${dt._id}" placeholder="Blood Group" class="in">
            <input type="text" disabled=true value=${dt.gender} name="gender" id="gender-${dt._id}" placeholder="gender" class="in">
            <button class="btnn" id="edit" onclick=handleEdit('${dt._id}')>Edit</button>
            <button class="btnn" id="save" onclick=handleSave('${dt._id}')>Save</button>
            <button class="btnn" id="delete" onclick=handleDelete('${dt._id}')>Delete</button>
        </div> `
        arr.push(dt);
    })
    document.getElementById("main").innerHTML=str
    console.log(arr);
    
    
}
getDonors();

async function handleEdit(id) {
    let name=document.getElementById(`name-${id}`)
    name.disabled=false
    let email=document.getElementById(`email-${id}`)
    email.disabled=false
    let phone=document.getElementById(`phone-${id}`)
    phone.disabled=false
    let bgp=document.getElementById(`bgp-${id}`)
    bgp.disabled=false
    let gender=document.getElementById(`gender-${id}`)
    gender.disabled=false
}

async function handleSave(id) {
    let name=document.getElementById(`name-${id}`).value
    let email=document.getElementById(`email-${id}`).value
    let phone=document.getElementById(`phone-${id}`).value
    let bgp=document.getElementById(`bgp-${id}`).value
    let gender=document.getElementById(`gender-${id}`).value
    console.log(name,email,phone,bgp,gender);
    let data = {id,name,email,phone,bgp,gender}
    console.log(data);
    const jsonData=JSON.stringify(data);
    const res=await fetch("http://localhost:3001/update",{
        "method":"put",
        "content-type":"text/json",
        "body":jsonData

    });
    console.log(data);
    
    console.log(res);
    const result=await res.text();
    console.log(result);
    if(result=="success"){
        alert("updated successfully");
        getDonors()
    }
     else{
        alert("not updated")
     }
}


async function handleDelete(id){
    const res=await fetch("http://localhost:3001/delete",{
        method:"DELETE",
        headers:{"content-Type":"text/plain"},
        "body":id
    })
    console.log(res);
    const data=await res.text()
    if(data=="success"){
        alert("Successfully Deleted ");
        getDonors()
    }
    else{
        alert("Failed")
    }
    
}


document.getElementById("filter").addEventListener('keyup',(e)=>{
    str=``;
    arr.filter((i)=>i.name.toLowerCase().includes(e.target.value.toLowerCase())).map((dt)=>{
        str+=`<div class="inp">
            <input type="text" disabled=true value=${dt.name} name="name" id="name-${dt._id}" placeholder="name" class="in"> 
            <input type="text" disabled=true value=${dt.email} name="email" id="email-${dt._id}" placeholder="mail" class="in">
            <input type="text" disabled=true value=${dt.phone} name="phone" id="phone-${dt._id}" placeholder="phone" class="in">
            <input type="text" disabled=true value=${dt.bgp} name="bgp" id="bgp-${dt._id}" placeholder="Blood Group" class="in">
            <input type="text" disabled=true value=${dt.gender} name="gender" id="gender-${dt._id}" placeholder="gender" class="in">
            <button class="btnn" id="edit" onclick=handleEdit('${dt._id}')>Edit</button>
            <button class="btnn" id="save" onclick=handleSave('${dt._id}')>Save</button>
            <button class="btnn" id="delete" onclick=handleDelete('${dt._id}')>Delete</button>
        </div>`
    })
    document.getElementById("main").innerHTML=str;

})