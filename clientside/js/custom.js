async function getDonors(){
    const res=fetch("http://localhost:3000/getdonors");
    const data=await (await res).json();
    str=``
    data.map((dt)=>{
        str+=`<div class="inp">
            <input type="text" disabled=true value=${dt.name} name="name" id="name" placeholder="name" class="in"> 
            <input type="text" disabled=true value=${dt.email}name="mail" id="mail" placeholder="mail" class="in">
            <input type="text" disabled=true value=${dt.phone}name="phone" id="phone" placeholder="phone" class="in">
            <input type="text" disabled=true value=${dt.bgp}name="bgroup" id="bgroup" placeholder="Blood Group" class="in">
            <input type="text" disabled=true value=${dt.gender} name="gender" id="gender" placeholder="gender" class="in">
        </div>
        <div class="bttn">
            <button class="btnn" id="edit">Edit</button>
            <button class="btnn" id="save">Save</button>
            <button class="btnn" id="delete">Delete</button>
        </div>
    `
    })
    document.getElementById("main").innerHTML=str
    
}
getDonors();