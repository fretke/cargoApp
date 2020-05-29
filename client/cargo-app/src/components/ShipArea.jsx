import React from "react";
import Ship from "./Ship";
import { Typography } from '@material-ui/core';

import { useSelector } from "react-redux";

function ShipArea(props){

    const ships = useSelector(state => state.ships)

    return (
        <div className="container-fluid ship-area">
            <Typography className = "m-ui-heading" variant="h2"> 
                SHIPS
            </Typography>
            {/* <h1>SHIPS</h1> */}
            <div className = "container">
                <div className = "row">
                    {ships.map((ship => {
                    return <Ship key={ship._id} currentShip = {ship}/>
                        }))}
                </div>

            </div>
            
        </div>
    );
}

export default ShipArea;