const fs = require('fs');
const express = require("express");
const { urlencoded } = require('express');
const app = express();
app.listen(3000);

function jsonReader(filepath, cb){
    fs.readFile(filepath, 'utf-8', (err, filedata)=>{
        if(err){
            return cb && cb(err);
        }try{
            const object = JSON.parse(filedata);  
            return cb && cb(null, object); 
        }catch(err){
            return cb&& cb(err); 

        }
    }); 
} 

jsonReader('./box.json',(err, data) =>{
if(err){
    console.log(err);
    
}else{

    fs.writeFile('./box.json', JSON.stringify(data), err =>{
        if(err){
            console.log(err);
        
        }
    }); 
}
}); 


const readingGuest = (JSON.parse(fs.readFileSync('box.json')))
app.use(express.urlencoded);
app.post("/new", (req, res)=>{

    object = {
        new: 'Newbie corp',
    order_counter: 83,
    adress: 'Po box city'
    }
    readingGuest.push(object); 
    console.log(readingGuest); 
    fs.writeFile('./box.json', JSON.stringify(readingGuest, null, 4), err =>{
        if(err){
            console.log(err);
        }
        else{  
            console.log('sucessfully written');
        }
    });  console.log(readingGuest);

})

