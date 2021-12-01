const { json } = require("express");
const express = require("express");
const app = express();
//open the server at localhost/3000 
app.listen(3000);   // listen/start port on 3000
console.log("Just testing if it works");
// open a public map for a global reach
app.use(express.static("public"));
let fs = require("fs"); 
// we parse our guest input and make it readble with json.parse instead of machine code
const guest = (JSON.parse(fs.readFileSync('meddelanden.json')));
console.log(guest); 
// we get our data from form 
app.get("/html/form", (req, res) => {
    res.sendFile(__dirname + "/html/form.html"); 
});
// we need express.urlendecoded for post 
app.use(express.urlencoded());
app.post("/formInput", (req, res) => {

    // we make an object with all inputs from the users. 
    let newUser = {
    name: req.body.nameInput,
    family: req.body.familyInput,
    child: req.body.child,
    reason: req.body.reason,
    phoneInput: req.body.phoneInput,
    email: req.body.email,
    meddelande: req.body.meddelande }
    // we give guest the inputs from users with guest.push
   guest.push(newUser); 
   console.log(guest);  // addes a block of string to the guestbook.json name,family,phone, and email.
   fs.writeFileSync('meddelanden.json', JSON.stringify(guest, null, 4))
   // sends us to an empty page of whatever we want it to be called. 
   res.redirect('/create'); 
 });
 // after we redirect user to create, we then post our block of strings into the webpage.
 app.get('/create', function (req, res) {   
// after we've been sent to create we print our object and it's task to the website. 
    res.send(guest); 
});


  