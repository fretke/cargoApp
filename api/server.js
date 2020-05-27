const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json({limit:"1mb"}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

const dataBase = require(__dirname + "/data.js");

app.listen(5000, () => {
    console.log("server is working on port 5000");
});

app.post("/GetInitData", (req, res) => {

    if (getRandomNumber() === 5){
        res.status(500);
        res.send();
        return;
    }
    dataBase.getUserData(req.body.userGuid, (response) => {
        res.send(JSON.stringify(response));
    });
});

app.post("/CreateCargo", (req, res) => {
    const {userGuid, weight, volume} = req.body;
    console.log(userGuid + " " + weight + " " + volume);
    dataBase.addCargoItem(userGuid, weight, volume, (id) => {
        res.send(JSON.stringify(id));
    });
});

app.post("/EditCargo", (req, res) => {
    
    const {userGuid, cargoId, weight, volume} = req.body;;
    dataBase.editCargoItem(userGuid, cargoId, weight, volume, (message) => {
        res.send(JSON.stringify(message));
    });
});


app.post("/AddToShip", (req, res) => {

    if (getRandomNumber() === 5){
        res.status(503);
        res.send();
        return;
    }

    const {userGuid, cargoId, shipId} = req.body;
    dataBase.addToShip(userGuid, cargoId, shipId, (message) =>{
        res.send(JSON.stringify(message));
    });
});

app.post("/AddToDock", (req, res) => {
    if (getRandomNumber() === 5){
        res.status(503);
        res.send();
        return;
    }
    const {userGuid, cargoId} = req.body;
    dataBase.addToDock(userGuid, cargoId, (message) => {
        res.send(JSON.stringify(message));
    });
});

function getRandomNumber(){
    return Math.round(Math.random() * 10);
}
