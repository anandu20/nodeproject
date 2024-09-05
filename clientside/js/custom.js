async function getDonors(){
    const res=fetch("http://localhost:3000/getdonors");
    const data=await (await res).json();
    str=``
    data.map((dt)=>{
        str+=`<div class="inp">
            <input type="text" disabled=true value=${dt.name} name="name" id="name-${dt._id}" placeholder="name" class="in"> 
            <input type="text" disabled=true value=${dt.email} name="mail" id="mail-${dt._id}" placeholder="mail" class="in">
            <input type="text" disabled=true value=${dt.phone} name="phone" id="phone-${dt._id}" placeholder="phone" class="in">
            <input type="text" disabled=true value=${dt.bgp} name="bgroup" id="bgroup-${dt._id}" placeholder="Blood Group" class="in">
            <input type="text" disabled=true value=${dt.gender} name="gender" id="gender-${dt._id}" placeholder="gender" class="in">
            <button class="btnn" id="edit" onclick=handleEdit('${dt._id}')>Edit</button>
            <button class="btnn" id="save" onclick=handleSave('${dt._id}')>Save</button>
            <button class="btnn" id="delete" onclick=handleDelete('${dt._id}')>Delete</button>
        </div>
    `
    })
    document.getElementById("main").innerHTML=str
    
}
getDonors();

async function handleEdit(id) {
    let name=document.getElementById(`name-${id}`)
    name.disabled=false
    let email=document.getElementById(`mail-${id}`)
    email.disabled=false
    let phone=document.getElementById(`phone-${id}`)
    phone.disabled=false
    let bgroup=document.getElementById(`bgroup-${id}`)
    bgroup.disabled=false
    let gender=document.getElementById(`gender-${id}`)
    gender.disabled=false
}

async function handleSave(id) {
    let name=document.getElementById(`name-${id}`).value
    let email=document.getElementById(`email-${id}`).value
    let phone=document.getElementById(`phone-${id}`).value
    let bgroup=document.getElementById(`bgp-${id}`).value
    let gender=document.getElementById(`gender-${id}`).value
    console.log(name,email,phone,bgp,gender);
    let data ={name,email,phone,bgp,gender}
    console.log(data);
    const jsonData=JSON.stringify(data);
    const res=await fetch("http://localhost:3000/update",{
        "method":"put",
        "content-type":"text/json",
        "body":jsonData

    });
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
    const res=await fetch("http://localhost:3000/delete",{
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