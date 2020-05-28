import React, { useState } from "react";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import gsap from "gsap";

import {useDispatch} from "react-redux";
import { addCargoDock, closeCreateDialog } from "../actions"
import { checkInput } from "../utils/checkUserInput"
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    button: {
        margin: "10px"
    }
})

export default function AddCargo(){
    const classes = useStyles();

    const dispatch = useDispatch();
    const [newCargo, setNewCargo] = useState({
        weight: "",
        volume: ""
    });
    const [dialogOpen, setDialogOpen] = useState(true)

    const validInput = checkInput(newCargo);

    function updateInput(event){
        const {name, value} = event.target;

        setNewCargo(prev => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    async function addNewToApi(cargo){
        try{
            const res = await fetch("http://localhost:5000/CreateCargo", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userGuid: "5ec53a5e06c11b3540b03cec",
                    weight: cargo.weight,
                    volume: cargo.volume
                })
            });
            const id = await res.json();
            dispatch(addCargoDock({
                    _id: id,
                    ...cargo
            }));
            setNewCargo({
                weight: "",
                volume: ""
            });
        } catch (err){
            console.log("Error while updating cargo item " + err);
        }
    }

    function closeDialog(){
        setDialogOpen(false);
        gsap.fromTo("#addCargo", 0.3, {scale:1}, {scale: 0.1, ease: "back"});
        setTimeout(()=>{
            dispatch(closeCreateDialog());
        }, 200);
    
           
    }

    return (
        <div id="addCargo">
            <h5>Add New</h5>
            <div className="form-group col-md-12">
                <input onChange = {updateInput} type="text" className="form-control" placeholder = "weight" name = "weight" value = {newCargo.weight} autoComplete = "off"/>
                <input onChange = {updateInput} type="text" className="form-control" placeholder = "volume" name = "volume" value = {newCargo.volume} autoComplete = "off"/>
            </div>

            <Zoom in={validInput}>
                    <Fab className={classes.button} size="small" color="primary">
                        <IconButton  onClick = {() => addNewToApi(newCargo)}>
                            <DoneIcon />
                        </IconButton>
                    </Fab>
                </Zoom>
            
            <Zoom in={dialogOpen}>
                <Fab className={classes.button} size="small" color="primary">
                    <IconButton  onClick = {closeDialog}>
                        <CloseIcon />
                    </IconButton>
                </Fab>
            </Zoom>
           
            
        </div>
    )
}