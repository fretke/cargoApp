export const cargoItemReducer = (state = [], action) => {
    switch(action.type){
        case "LOAD":
            return action.payload;
        case "DELETE":
            return state.filter((item) => {
                return item._id !== action.payload
            });
        case "ADD":
            return [...state, action.payload];
        case "MODIFY":
            return state.map((item) => {
                if (item._id !== action.id){
                    return item;
                } else {
                    return {
                        _id: item._id,
                        weight: action.data.weight,
                        volume: action.data.volume
                    }
                }
            });
        default:
            return state;
    }
}