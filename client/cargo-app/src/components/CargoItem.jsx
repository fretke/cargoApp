import React, { useState } from "react";

import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import IconButton from '@material-ui/core/IconButton';

import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { modifyCargo, deleteCargo } from "../actions";

import { checkInput } from "../utils/checkUserInput"

import gsap from "gsap";

async function updateServer(id, cargo){
    try {
        const res = await fetch("http://localhost:5000/EditCargo", {
            method: "POST",
            credentials: "same-origin",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userGuid: "5ec53a5e06c11b3540b03cec",
                cargoId: id,
                weight: cargo.weight,
                volume: cargo.volume
            })
        });
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.log("error in while posting EditCargo : " + err)
    }
   
}

function CargoItem(props){
    const dispatch = useDispatch();
    const cargo = props.cargo;
    const [isClicked, setIsClicked] = useState(false);
    const [currentCargo, setCurrentCargo] = useState({
        weight: cargo.weight,
        volume: cargo.volume
    });

    const [{isDragging}, drag] = useDrag({
        item: {
            type: props.type,
            cargo: cargo
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        }),
        begin: monitor => {
           dragInit();
        },
        end: (item, monitor) =>{
          dragStop();
        }
    });

    let isValidInput = false;

    isClicked && (isValidInput = checkInput(currentCargo));
    

    function handleChange(event){
        const {name, value} = event.target
        setCurrentCargo(prev => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    function modify(){
        dispatch(modifyCargo(cargo._id, currentCargo));
        setIsClicked(false);
        updateServer(cargo._id, currentCargo)
    }

    function dragInit () {
        if (props.type === "dock-cargo"){
            document.querySelectorAll(".card-body").forEach((element) => {
                element.classList.add("ship-drop-zone");
            })
            document.querySelector(`#${props.id}`).classList.add("make-invisible");
        } else {
            document.querySelector(".dock-cargo").classList.add("dock-drop-zone");
        }
    }

    function dragStop(){
        if (props.type === "dock-cargo"){
            document.querySelectorAll(".card-body").forEach((element) => {
                element.classList.remove("ship-drop-zone");
            });
            document.querySelector(`#${props.id}`).classList.remove("make-invisible");
        } else {
            document.querySelector(".dock-cargo").classList.remove("dock-drop-zone");
        }
    }

    function animateInModifyDialog(){
        setIsClicked(true);
        setTimeout(()=>{
            gsap.fromTo(`#${props.id}1`, 0.5, {scale:0.1}, {scale: 1, ease: "back"})
        }, 1);
    }
    function animateOutModifyDialog(){
       gsap.fromTo(`#${props.id}1`, 0.3, {scale:1}, {scale: 0.1, ease: "back"});
       setTimeout(()=>{
        setIsClicked(false);
    }, 200);
    }
    
    return (
        <div id={props.id} className={props.type === "ship-cargo" ? "col-12 col-sm-6 col-md-6 col-lg-6 cargo-item": "col-6 col-lg-2 col-md-3 col-sm-4 cargo-item"}>
            
        {(!isClicked || props.type === "ship-cargo") && (
            <div ref = {drag} onClick={animateInModifyDialog} className = "container">
                <div className = "row cargo-item-container">
                    <div className = "col-6">
                        <h6>{cargo.volume + " m3"}</h6>
                    </div>
                    <div className = "col-6">
                      
                        <h6>{cargo.weight + " kg"}</h6>
                    </div>
                </div>
            </div>
        ) }
       
        {(isClicked && props.type === "dock-cargo") && (
            <div id={props.id + "1"}  className="form-group col-lg-12">
                <h5>Modify</h5>
                <input className="form-control" onChange = {handleChange} type="text" value = {currentCargo.weight} name = "weight" autoComplete = "off"/>
                <input className="form-control" onChange = {handleChange} type="text" value = {currentCargo.volume} name = "volume" autoComplete = "off"/>
                
                {isValidInput && (
                    <IconButton onClick = {modify}>
                     <DoneIcon />
                    </IconButton>
                )}
               
                <IconButton onClick = {animateOutModifyDialog}>
                    <CloseIcon />
                </IconButton>
            </div>
          
            )}
        </div>
    );
}

export default CargoItem;