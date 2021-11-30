const { json } = require("express");
const express = require("express");
const app = express();

app.listen(3000);   // lyssnar på port 3000
console.log("Kör servern på localhost:3000");
app.use(express.static("public"));
let fs = require("fs"); 
const guest = (JSON.parse(fs.readFileSync('guestbook.json')));
console.log(guest); 
app.get("/form", (req, res) => {
    res.sendFile(__dirname + "/form.html"); // liknande som ovan
});
app.use(express.urlencoded());
app.post("/skriva-fil", (req, res) => {

    let newUser = {
    meddelande: req.body.meddelande, 
    name: req.body.nameInput,
    family: req.body.familyInput,
    phoneInput: req.body.phoneInput,
    email: req.body.email}
   guest.push(newUser); 
   console.log(guest); 
   fs.writeFileSync('guestbook.json', JSON.stringify(guest, null, 4))
   res.redirect('/skapa'); 
 });
 app.get('/skapa', function (req, res) {   // request sidan när de vill komma åt /skapa

    res.send(guest); // annars tillbaks till inloggning sidan.
});


  