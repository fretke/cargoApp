export const createDialogReducer = (state = false, action) => {
    switch(action.type){
        case "INIT": 
            return true;
        case "QUIT":
            return false;
        default:
            return state;
    }
}