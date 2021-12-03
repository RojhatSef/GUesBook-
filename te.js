const express = require("express");
const app = express();
const XMLHttpRequest = require('xhr2'); 
const xhr = new XMLHttpRequest();
//open the server at localhost/3000 
app.listen(3000);   // lyssnar på port 3000
console.log("Kör servern på localhost:3000");
// open a public map for a global reach
app.use(express.static("public"));
let fs = require("fs"); 
const { response } = require("express");
const { parse } = require("path/posix");
// we parse our guest input and make it readble with json.parse instead of machine code
const guest = (JSON.parse(fs.readFileSync('guestbook.json')));
console.log(guest); 
// to be able to reach ra, we use get and where the file is with send 
app.get("/ra", (req, res) => {
    res.sendFile(__dirname + "/ra.html"); 
});
// we need express.urlendecoded for post 
app.use(express.urlencoded());
// forminput is used from action in html to get our inputs
app.post("/formInput", (req, res) => {

    // we make an object with all inputs from the users. 
    let newUser = {
    name: req.body.nameInput,
    family: req.body.familyInput,
    phoneInput: req.body.phoneInput,
    email: req.body.email,
    meddelande: req.body.meddelande }
    // we give guest the inputs from users with guest.push
   guest.push(newUser); 
   console.log(guest); 
   fs.writeFileSync('guestbook.json', JSON.stringify(guest, null, 4))
   res.redirect('/'); 
 });

 
//app.post('./formInput')
app.get("/", (req, res) => {

    const guest = (JSON.parse(fs.readFileSync('guestbook.json')));

    fs.writeFileSync('guestbook.json', JSON.stringify(guest, null, 4));

    let randomsträng ="";
    for(i in guest){
        randomsträng += "<br>"
        randomsträng += 'name:' + guest[i].name;
        randomsträng += "<br>"
        randomsträng += 'family name: ' + guest[i].family;
        randomsträng += "<br>"
      randomsträng += 'phone: ' + guest[i].phoneInput;
      randomsträng += "<br>"
       randomsträng  += 'email: ' + guest[i].email;
       randomsträng += "<br>"
        randomsträng  += 'Meddelande: ' + guest[i].meddelande;
        randomsträng += "<br>"
        randomsträng += "----------------------------------------"
        randomsträng += "<br>"
        
    }
    res.send(randomsträng); 
    //res.send(guest[0].name); // ersätt "attribut.value" med vad du nu har för data

});