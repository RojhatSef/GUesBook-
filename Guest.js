const express = require("express");
const app = express();
app.get("/", (req, res) => {    // likvärdigt som "app.get("/", function(req, res) {"
  
    res.write("Hallå ");
    res.write("på ");
    res.write("dig ");
    // funkar, men header-information funkar inte
    //res.write(" Hej igen?");    // 'ERR_STREAM_WRITE_AFTER_END'
    res.send(" Hej igen?");       // Cannot set headers after they are sent to the client
  
   // serva statisk html-sida, notera att filnamnet "exempel.html" inte syns i URL:en; __dirname hänvisar till sökvägen som serverskriptet index.js finns i
});
app.listen(3000);   // lyssnar på port 3000
console.log("Kör servern på localhost:3000");
app.use(express.static("public"));
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

app.get("/form", (req, res) => {
    res.sendFile(__dirname + "/form.html"); // liknande som ovan
});
app.use(express.urlencoded());

app.post("/skriva-fil", (req, res) => {

    let meddelande = req.body.meddelande;

    meddelande += "\n";

    fs.appendFile("meddelanden.txt", meddelande, (err)=> {

        if (err) throw err;

    });




    fs.readFile("meddelanden.txt",(err, data) =>{

        if (err) throw err;

        console.log(data.toString());

        let content = data.toString();

        res.send(`Innehåll av ${content}`);

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
