
const express = require('express');
const fs = require('fs');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8081;
const filename = __dirname + '/jokes.json';

//Funktion um POST durzuführen in express freischalten (Middleware)
app.use(express.json());
app.use(cors());

//Gibt alle jokes aus
app.get('/jokes', (req, res)=> {
    fs.readFile(filename, "utf8", (err,data)=>{
        if(err){
            res.send("Error:" + err);
        }else{
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(data);
           
        }
    });
});

//Gibt joke mit entsprechender Id aus
app.get('/jokes/:id', (req, res) => {
    fs.readFile(filename,"utf8", (err,data)=>{
        if(err){
            res.send("Error:"+ err);
        }else{
            const jokes = JSON.parse(data)[req.params.id];
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(jokes));  
        }      
    });
});

// Fügt einen Witz Hinzu
app.post('/jokes', (req, res)=>{
    fs.readFile(filename,"utf8", (err,data)=>{
      if(err){
        res.send("Error:"+ err);
      }else{
        let newJoke = JSON.parse(data);
        newJoke.push({
            id: newJoke.length,
            title: req.body.title,
            text: req.body.text,
            rating: req.body.rating
        });
        fs.writeFile(filename, JSON.stringify(newJoke), ()=> {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(newJoke));
        });
      }  
    });
});

//Löscht einen Witz über die Id
app.delete("/jokes/:id", (req, res)=> {
    fs.readFile(filename, "utf8", (err, data)=> {
        let joke = JSON.parse(data);
        joke.splice(req.params.id, 1);
        fs.writeFile(filename, JSON.stringify(joke), () => {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(joke));
        });
    });
});

app.listen(port, ()=> console.log(`Server is listening on port ${port}...`));




