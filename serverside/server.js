const http=require("http");
const fs=require("fs");
const url=require("url");
const queryString=require("querystring");
const {MongoClient}=require("mongodb");
//connect database
const client =new MongoClient("mongodb://127.0.0.1:27017//");
const app=http.createServer((req,res)=>{

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
        res.writeHead(200,{"Content-type":"text/html"});
        res.end(fs.readFileSync("../clientside/index.html"));
        
    });
 
    }

 });


app.listen(3000);
