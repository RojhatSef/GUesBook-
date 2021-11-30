// liknande som igår, glöm inte att köra npm install express (om denna inte är globalt installerad med "npm install -g express")
const express = require("express");
const app = express();
app.get("/", (req, res) => {    // likvärdigt som "app.get("/", function(req, res) {"
    /*
    res.write("Hallå ");
    res.write("på ");
    res.write("dig ");
    res.send(); // funkar, men header-information funkar inte
    //res.write(" Hej igen?");    // 'ERR_STREAM_WRITE_AFTER_END'
    res.send(" Hej igen?");       // Cannot set headers after they are sent to the client
    */
    res.sendFile(__dirname + "/exempel.html");  // serva statisk html-sida, notera att filnamnet "exempel.html" inte syns i URL:en; __dirname hänvisar till sökvägen som serverskriptet index.js finns i
});
app.listen(3000);   // lyssnar på port 3000
console.log("Kör servern på localhost:3000");

// för att servern ska kunna hitta filer som klientsidesskript, css-filer eller bildfiler måste man serva en publik mapp
app.use(express.static("public"));

// filhantering: en enkel besöksräknare
let fs = require("fs"); // installera med "npm install fs" ifall ni får felmeddelanden här
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

// använda req-argumentet och hantera GET-förfrågningar
app.get("/processa-forfragan", (req, res) => {
    let nr1 = Number(req.query.nr1); // nr1 kan vara vilket variabelnamn vi vill
    let nr2 = Number(req.query.nr2);
    let summa = nr1+nr2;
    res.send(`${nr1}+${nr2}=${summa}`);
    // pröva att anropa t.ex. http://localhost:3000/processa-forfragan?nr1=2&nr2=3
    // pröva att skicka det första formuläret (med absolut länk)
});

// serva en statisk HTML-sida
app.get("/form", (req, res) => {
    res.sendFile(__dirname + "/form.html"); // liknande som ovan
});
// pröva att skicka det andra formuläret (med relativ länk)

// hantera POST-förfrågningar
app.use(express.urlencoded());  // OBS - behövs för att läsa data som skickas med POST
app.post("/processa-forfragan", (req, res) => {
    let nr1 = Number(req.body.nr1); // OBS - body istället för query
    let nr2 = Number(req.body.nr2);
    let summa = nr1+nr2;
    if (isNaN(summa)) {
        res.send(`Något gick fel. Du angav nr1=${nr1} och nr2=${nr2}. Du får bara ange tal!`);
    }
    else {
        res.send(`${nr1}+${nr2}=${summa}`);
    }
});

// skriva till fil från formulär
app.post("/skriva-fil", (req, res) => {
    let meddelande = req.body.meddelande;
    meddelande += "\n"; // lägg till en radbrytning mellan varje meddelande
    fs.appendFile("meddelanden.txt", meddelande, (err) => { // OBS - skapar filen om den inte redan finns, lägger annars till befintlig text
        if(err) throw err;
    });
    res.send(`Skrev till fil: ${meddelande}`);
});