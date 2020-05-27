
//ACTIONS WITH SHIP STATE
export const getShips = (data) => {
    return {
        type: "GETSHIP",
        payload: data

    }
}

export const addCargoShip = (id, cargo) => {
    return {
        type: "ADDCARGO",
        shipId: id,
        payload: cargo
    }

}

export const deleteCargoShip = (_id) => {
    return {
        type: "DELETECARGO",
        id: _id
    }
}

// ACTIONS WITH CARGO

export const getDock = (data) =>{
    return {
        type: "LOAD",
        payload: data
    }
}

export const deleteCargo = (id) => {
    return {
        type: "DELETE",
        payload: id
    }
}

export const modifyCargo = (_id, cargoData) => {
    return {
        type: "MODIFY",
        id: _id,
        data: cargoData
    }
}

export const addCargoDock = (data) => {
    return {
        type: "ADD",
        payload: data
    }
}

// ACTIONS TO CREATE NEW CARGO ITEM

export const openCreateDialog = () => {
    return {
        type: "INIT"
    }
}

export const closeCreateDialog = () => {
    return {
        type: "QUIT"
    }
}

//ACTION FOR ERROR

export const openErrorWindow = (errorMessage) => {
    return {
        type: "ERROR",
        payload: errorMessage
    }
}

export const closeErrorWindow = () => {
    return {
        type: "CLOSE_ERROR"
    }
}