import React from "react";

import theme from "./Material-UI/theme";

import { Typography, LinearProgress } from '@material-ui/core';

function ShipDetails(props){

    const ship = props.ship;
    const remainder = getRemainingSpace();
    
    function getRemainingSpace(){
        let currentVolume = 0;
        let currentWeight = 0;
        ship.cargoItems.forEach((item) => {
            currentVolume += parseInt(item.volume);
            currentWeight += parseInt(item.weight);
        });
        return {
            volume: currentVolume,
            volPercent: currentVolume/ship.maxVolume * 100,
            weight: currentWeight,
            weightPercent: currentWeight/ship.maxWeight * 100
        }
    }

    function getIndicatorColor(percentage){
        let style = "";
            if (percentage >= 80){
                style+="secondary";
            } else {
                style+="primary";
            }
            return style;
    }

    function getName(){
        return ship.name.toUpperCase();
    }

    return (
        <div className="card-header ship-details">
                <div className = "container">
                    <div className = "row">
                        <div className = "col-12 col-sm-5 col-md-5 col-lg-5 ship-name">
                        <Typography variant="h6">
                            {getName()}
                        </Typography>
                        </div>
                        <div className = "col-12 col-sm-7 col-md-7 col-lg-7">

                        <Typography variant="body1">
                            {remainder.volume + " | " + ship.maxVolume + " m3" }
                        </Typography>
                        <LinearProgress color={getIndicatorColor(remainder.volPercent)} variant="determinate" value={remainder.volPercent} />
                                {/* <div className="progress">
                                    <div className={getIndicatorColor(remainder.volPercent)} role="progressbar" style={{width: remainder.volPercent + "%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div> */}
                                <Typography variant="body1">
                                {remainder.weight + " | " + ship.maxWeight + " kg"}
                                </Typography>
                                <LinearProgress color={getIndicatorColor(remainder.weightPercent)} variant="determinate" value={remainder.weightPercent} />

                                {/* <div className="progress">
                                    <div className={getIndicatorColor(remainder.weightPercent)} role="progressbar" style={{width: remainder.weightPercent + "%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div> */}
                        </div>
                    </div>
                </div>
                <Typography variant="subtitle1">
                    Cargo
                </Typography>
        </div>
    )
}

export default ShipDetails;