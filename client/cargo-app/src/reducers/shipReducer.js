const shipReducer = (state={}, action) => {

    switch (action.type) {
        case "GETSHIP":
            return action.payload;
        case "ADDCARGO":
            return state.map((ship) => {
                if (ship._id === action.shipId){
                    ship.cargoItems.push(action.payload);
                    return ship;
                } else {
                    return ship;
                }
            });
        case "DELETECARGO":
            return state.map((ship) => {
                for (var i = 0; i < ship.cargoItems.length; i++){
                    if (ship.cargoItems[i]._id === action.id){
                        ship.cargoItems.splice(i, 1);
                        return ship;
                    }
                }
                return ship;
            })
        default:
            return state;
    }

}

export default shipReducer;