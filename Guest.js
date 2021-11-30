// window.onload(); 

const http = require("http");
const express = require("express"); 
const app = http.createServer(function(req,res){
    res.end("Hejsan NodeJS!"); 
}); 
app.listen(3000)
console.log("Kör servern på localhost 3000")

let fs = require("fs"); 
app.get("/besokare", (req, res) => {
    fs.readFile("besokare.txt", (err, data) => {
        
    })
})