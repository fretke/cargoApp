import React from "react";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

import ShipDetails from "./ShipDetails";
import CargoItem from "./CargoItem"
import { ShipType, DockType } from "../utils/items"
import { deleteCargo, addCargoShip, openErrorWindow } from "../actions";

import { SERVICE_NOT_AVAILABLE } from "../utils/errorMessages"

function Ship(props){

    const dispatch = useDispatch();
    const ship = props.currentShip;
    
    const [{isOver}, drop] = useDrop({
        accept: DockType.Cargo,
        drop: (item, monitor) => {
            if (canDrop(item.cargo)){
                dispatch(addCargoShip(ship._id, item.cargo));
                dispatch(deleteCargo(item.cargo._id));
                updateServer(item.cargo._id, ship._id); 
                return {name: ship.name}
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    async function updateServer(cargoId, shipId){
        try{
            const res = await fetch("http://localhost:5000/AddToShip", {
                method: "POST",
                credentials: 'same-origin',
                headers:{
                "Content-Type": "application/json"
                },
                 body: JSON.stringify({
                     userGuid:"5ec53a5e06c11b3540b03cec",
                     cargoId: cargoId,
                     shipId: shipId
                    })
            });
    
            if (res.status === 503){
                dispatch(openErrorWindow(SERVICE_NOT_AVAILABLE));
                return;
            }
            const data = await res.json();
        } catch (err){
            console.log("there was an error adding to ship " + err)
        } 
       
    }

    function canDrop(cargo){
        const {weight, volume} = cargo;
        let currentWeight = 0;
        let currentVolume = 0;
        ship.cargoItems.forEach((item) => {
            currentWeight+=parseInt(item.weight);
            currentVolume+=parseInt(item.volume);
        });

        if (parseInt(weight) + currentWeight > ship.maxWeight || parseInt(volume) + currentVolume > ship.maxVolume) return false;
        return true;
    }

    return (
        <div ref = {drop} className = "col-6 col-lg-4">
            <div className="card text-white bg-secondary mb-3">
                <ShipDetails ship={props.currentShip}/>
                    <div className="card-body ship-cargo">
                            <div className = "container">
                                <div className = "row">
                                    {ship.cargoItems.map((cargoItem, index) => {
                                        return <CargoItem key={cargoItem._id} id = {"b" + index} cargo = {cargoItem} type={ShipType.Cargo}/>
                                    } )}
                                </div>
                            </div>
                    </div>
            </div>
        </div>
    );
}

export default Ship;