export const errorMessageReducer = (state = {isError: false, message: ""}, action) => {

    switch(action.type){
        case "ERROR": 
            return {
                ...state,
                isError: true,
                message: action.payload
            };
        case "CLOSE_ERROR":
            return {
                ...state,
                isError: false,
            }
        default:
            return state;
    }
}