import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

import CargoItem from "./CargoItem";
import AddCargo from "./AddCargo";
import {DockType, ShipType} from "../utils/items";
import { addCargoDock, deleteCargoShip, openCreateDialog, openErrorWindow } from "../actions";
import { SERVICE_NOT_AVAILABLE } from "../utils/errorMessages"

import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

import gsap from "gsap";



function DockArea(){
   
    const cargoItems = useSelector(state => state.dock);
    const createDialog = useSelector(state => state.create);
    const dispatch = useDispatch();

    const [collectedProps, drop] = useDrop({
        accept: ShipType.Cargo,
        drop: (item, monitor) => {
            dispatch(addCargoDock(item.cargo));
            dispatch(deleteCargoShip(item.cargo._id));
            updateServer(item.cargo._id);
            return {name: "docking - area"}
        }
    });

    async function updateServer(cargoId){
        try{
            const res = await fetch("http://localhost:5000/AddToDock", {
                method: "POST",
                credentials: 'same-origin',
                headers:{
                "Content-Type": "application/json"
                },
                 body: JSON.stringify({
                     userGuid:"5ec53a5e06c11b3540b03cec",
                     cargoId: cargoId
                    })
            });
            if (res.status === 503){
                dispatch(openErrorWindow(SERVICE_NOT_AVAILABLE));
                return;
            }
            const data = await res.json();
        } catch (err){
            console.log("Error while adding cargo item from ship to dock " + err);
        }
       
    }

    return (
        <div ref= {drop} className = "container-fluid dock-area">
            <h1>DOCK</h1>
            <div className = "row"> 
                <div className = "col-lg-2 controls">
                {!createDialog && (
                    <IconButton onClick = {() =>{ 
                        dispatch(openCreateDialog());
                        setTimeout(()=>{
                            gsap.fromTo("#addCargo", 0.5, {scale:0.1}, {scale: 1, ease: "back"});
                        }, 1)
                        
                        }}>
                        <AddIcon />
                     </IconButton>
                )}
                   
                {createDialog && (
                    <AddCargo />)}

                </div>

                <div className = "col-lg-10 dock-cargo">
                    <div className = "container">
                        <div className = "row">
                            {cargoItems.map((cargoItem, index) => {
                                 return <CargoItem key={cargoItem._id} id = {"a" + index} cargo = {cargoItem} type={DockType.Cargo}/>
                              })}
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default DockArea;