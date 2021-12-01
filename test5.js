const { json } = require("express");
const express = require("express");
const app = express();
//open the server at localhost/3000 
app.listen(3000);   // lyssnar på port 3000
console.log("Kör servern på localhost:3000");
// open a public map for a global reach
app.use(express.static("public"));
let fs = require("fs"); 
// we parse our guest input and make it readble with json.parse instead of machine code
const guest = (JSON.parse(fs.readFileSync('guestbook.json')));
console.log(guest); 
// we get our data from form 
app.get("/form", (req, res) => {
    res.sendFile(__dirname + "/form.html"); 
});
// we need express.urlendecoded for post 
app.use(express.urlencoded());
app.post("/skriva-fil", (req, res) => {

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
   res.redirect('/skapa'); 
 });
 app.get('/skapa', function (req, res) {   

    res.send(guest); 
});



  