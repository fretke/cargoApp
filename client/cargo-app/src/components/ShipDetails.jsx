import React from "react";

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
        let style = "progress-bar";
            if (percentage >= 90){
                style+=" bg-danger";
            } else if (percentage >= 50){
                style+=" bg-warning";
            } else {
                style+=" bg-success";
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
                            <p>{getName()}</p>
                        </div>
                        <div className = "col-12 col-sm-7 col-md-7 col-lg-7">

                            <p>{remainder.volume + " | " + ship.maxVolume + " m3" }</p>
                                <div className="progress">
                                    <div className={getIndicatorColor(remainder.volPercent)} role="progressbar" style={{width: remainder.volPercent + "%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>

                                <p>{remainder.weight + " | " + ship.maxWeight + " kg"}</p>

                                <div className="progress">
                                    <div className={getIndicatorColor(remainder.weightPercent)} role="progressbar" style={{width: remainder.weightPercent + "%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                        </div>
                    </div>
                </div>
                <h5>CARGO</h5>
        </div>
    )
}

export default ShipDetails;