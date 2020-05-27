const mongoose = require("mongoose");

// For the purpose of this task all database queries are based on a hard coded name
const USER_NAME = "Demo";

mongoose.set('useFindAndModify', false);

mongoose.connect("mongodb+srv://admin-fretke:test.123@cluster0-hncei.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    companyName: String,
    ships: [],
    dock: {}
});

const User = mongoose.model("user", userSchema);

exports.addCargoItem = (userId, cargoWeight, cargoVolume, callback) => {
    const cargoId = mongoose.Types.ObjectId()
    const cargo = {
        _id: cargoId.toString(),
        weight: cargoWeight,
        volume: cargoVolume
    }

    User.findOneAndUpdate({companyName: USER_NAME}, {$push:  {"dock.cargoItems": cargo}}, (err) => {
        if (!err){
            callback(cargoId);
        } else {
            console.log("Error while adding cargo to dock " + err);
        }
    });
}

exports.editCargoItem = (userId, cargoId, weight, volume, callback) => {

    User.updateOne({companyName: USER_NAME, "dock.cargoItems._id":  cargoId}, {$set: {"dock.cargoItems.$.weight": weight, "dock.cargoItems.$.volume": volume}}, (err, cargo) => {
        if (!err){
            callback(cargo);
        } else {
            callback(err);
            
        }
    })
}

async function addCargoToShip(userId, shipId, cargo, callback){
    try{
        const insertedItem = await User.updateOne({companyName: USER_NAME, "ships._id": shipId}, {$push:  {"ships.$.cargoItems": cargo}});
        const removedItem = await User.updateOne({companyName: USER_NAME}, {$pull : {"dock.cargoItems":{_id:cargo._id}}});
    } catch (err) {
        callback(err);
    }
}

exports.addToShip = (userId, cargoId, shipId, callback) => {
    User.findOne({companyName: USER_NAME}, (err, items) => {
        if (!err){
            const cargo = items.dock.cargoItems;
            for (var i = 0; i < cargo.length; i++){
                if (cargo[i]._id === cargoId){
                    const shipItem = {
                        _id: cargoId,
                        weight: cargo[i].weight,
                        volume: cargo[i].volume
                    }
                    addCargoToShip(userId, shipId, shipItem, callback);
                    break;
                }
            }
            
        } else {
           console.log("Error while adding cargo from dock to ship " + err);
        }
    });
}

exports.addToDock = async (userId, cargoId, callback) => {

    try{
        const item = await User.findOne({companyName: USER_NAME});
        const ships = item.ships;
        loop1: 
        for (var i = 0; i < ships.length; i++){
            for (var j = 0; j < ships[i].cargoItems.length; j++){
                if (ships[i].cargoItems[j]._id === cargoId){
                    const shipItem = {
                        _id: cargoId,
                        weight: ships[i].cargoItems[j].weight,
                        volume: ships[i].cargoItems[j].volume
                    }
                    const toDock = await User.updateOne({companyName: USER_NAME}, {$push: {"dock.cargoItems": shipItem}});
                    break loop1;
                }
            }
        }
        const removedItem = await User.updateOne({companyName: USER_NAME, "ships.cargoItems._id": cargoId}, 
        {$pull : {"ships.$.cargoItems": {_id:cargoId}}});
        
        callback("successfuly removed cargo item from ship and placed it to dock");
        console.log("removedItem: " + removedItem);
    } catch (err) {
        callback("error while placing cargo from ship to dock");
    }
}


exports.getUserData = (userId, callback) => {
    User.findOne({companyName: USER_NAME}, (err, user) => {
        if (!err){
            if (user === null){
                this.addUser(callback);
            } else {
                console.log(user);
                callback(user);
            }
        } else {
            callback("Not able to get userData " + err);
        }
    });
}

exports.addUser = (callback) => {
    const user = new User({
        companyName: USER_NAME,
        ships: [{
            _id: mongoose.Types.ObjectId().toString(),
            name: "Kintai",
            maxWeight: 1000,
            maxVolume: 100,
            cargoItems: []
        }],
        dock: {
            cargoItems: []
        }
    });
    user.save((err, document) => {
        if (!err){
            callback(document);
            console.log("created entry " + document)
        }
    });
}