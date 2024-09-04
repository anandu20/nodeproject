const PORT=3000;
const http=require("http");
const fs=require("fs");
const url=require("url");
const queryString=require("querystring");
const {MongoClient, ObjectId}=require("mongodb");
const { log } = require("console");
//connect database
const client =new MongoClient("mongodb://127.0.0.1:27017//");
const app=http.createServer(async(req,res)=>{

    //create database
    const db=client.db("Blood_bank");
    //create collections
    const collection=db.collection("donors");

    const path=url.parse(req.url);
    console.log(path);
    console.log(req.method);

    if (path.pathname=="/"){
        res.writeHead(200,{"Content-type":"text/html"});
        res.end(fs.readFileSync("../clientside/index.html"));
    }
    else if(path.pathname=="/clientside/js/custom.js"){

        res.writeHead(200,{"Content-type":"text/html"});
        res.end(fs.readFileSync("../clientside/js/custom.js"));

    }
    else if(path.pathname=="/adddonar"){

        res.writeHead(200,{"Content-type":"text/html"});
        res.end(fs.readFileSync("../clientside/pages/add.html"));
    
    }

    //fetch data from donor

if(path.pathname=="/submit" && req.method=="POST"){
    let body="";
    req.on("data",(chunks)=>{
        body+=chunks.toString();
        console.log(body);

    });
    req.on("end",async()=>{
        //convert query strng to object 
        const formData=queryString.parse(body)
        console.log(formData);
        //insert into collection
        collection.insertOne(formData).then(()=>{
            console.log("success");
            

        })
        .catch((error)=>{
            console.log(error);
            
        });
     
        
    });
    res.writeHead(200,{"Content-type":"text/html"});
    res.end(fs.readFileSync("../clientside/index.html"));
 
    }
    if(path.pathname=="/getdonors" && req.method=="GET"){
        const data=await collection.find().toArray();
        const jsonData=JSON.stringify(data);
        console.log(jsonData);
        res.writeHead(200,{"Content-type":"text/json"});
        res.end(jsonData);
        
    }
    if(path.pathname=="/delete"&&req.method=="DELETE"){
        console.log("reached delete route");
        let body=""
        req.on("data",(chunks)=>{
            body+=chunks.toString();
            console.log(body); 
        })     
        req.on("end",async()=>{
            let _id=new ObjectId(body)
            console.log(_id);
            collection.deleteOne({_id}).then(()=>{
                res.writeHead(200,{"content-Type":"text/plain"});
                res.end("success")
            }).catch(()=>{
                res.writeHead(200,{"content-Type":"text/plain"});
                res.end("fail")
                
            })
            

        })  

    }

 });
client.connect().then(()=>{
    console.log("database connected");
    app.listen(PORT,()=>{
        console.log(`server created at http://localhost:${PORT}`);     
    });    
}).catch((error)=>{
    console.log(error);
})

