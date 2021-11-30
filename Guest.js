const express = require("express");
const app = express();

app.listen(3000);   // lyssnar på port 3000
console.log("Kör servern på localhost:3000");
app.use(express.static("public"));
let fs = require("fs"); 
app.get("/besokare", (req, res) => {
    fs.readFile("besokare.txt", (err, data) => {    // första argumentet är filnamnet, andra argumentet är en funktion (callback)
        // callback-funktionen har i sin tur två argument: ett objekt med information om eventuella fel och ett objekt med data som lästs in
        if (err) throw err; // avbryt exekveringen om fel
        //else console.log(err);  // null om inget fel inträffat
        let antal = Number(data.toString());
        antal++;
        fs.writeFile("besokare.txt", antal, (err) => {
            if (err) throw err;
        });
        res.send(`Denna sida har laddats ${antal} gånger`);
    });
});

app.get("/form", (req, res) => {
    res.sendFile(__dirname + "/form.html"); // liknande som ovan
});
app.use(express.urlencoded());
app.post("/skriva-fil", (req, res) => {

    let meddelande = req.body.meddelande;
    let name = req.body.nameInput
let family = req.body.familyInput 
let phoneInput = req.body.phoneInput
let email = req.body.emailInput

    meddelande += "\n<br>";

    fs.appendFile("meddelanden.txt", meddelande, name, family, phoneInput, email, (err)=> {

        if (err) throw err;
        fs.readFile("meddelanden.txt",(err, data) =>{

            if (err) throw err;

            console.log(data.toString());

            let content = data.toString();

            res.send(`Innehåll av filen: <br> ${content}`);    

        });

    });

});
   

/*
app.post("/skriva-fil", (req, res) => {
    let meddelande = req.body.meddelande;
    meddelande += "\n"; // lägg till en radbrytning mellan varje meddelande
    fs.appendFile("meddelanden.txt", meddelande, (err) => { // OBS - skapar filen om den inte redan finns, lägger annars till befintlig text
        if(err) throw err;
    });
    res.send(`Skrev till fil: ${meddelande}`);
    fs.readFile("meddelanden.txt", "utf8", (err, data) =>{
        console.log(data); 
    }); 
    fs.readFile("meddelanden.txt",(err, data) =>{

        if (err) throw err;

        console.log(data.toString());

        let content = data.toString();

        res.send(`Innehåll av ${content}`);

    });

});/*
app.get("meddelanden.txt", (req, res) => {
    fs.readFile("meddelanden.txt", (err, data) =>{
        if(err) throw err;
        let fullstring =(data.toString());
        fullstring +="\n";
        fullstring = fullstring.toString();
        fs.writeFile("meddelanden.txt", fullstring, (err) =>{
            if (err) throw err;

        });
        res.send(`Let ${fullstring}`)
    })
    
}) */
