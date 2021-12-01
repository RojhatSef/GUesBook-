
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
   res.redirect('/java'); 
 });
 app.get('/java', function (req, res) {   
    res.send(guest); 
});


  