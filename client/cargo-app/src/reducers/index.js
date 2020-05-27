
import { cargoItemReducer } from "./cargoItemReducer"
import { combineReducers } from "redux";
import { createDialogReducer } from "./createDialogReducer"
import { errorMessageReducer } from "./errorReducer"
import shipReducer from "./shipReducer";

const rootReducer = combineReducers({
    ships: shipReducer,
    dock: cargoItemReducer,
    create: createDialogReducer,
    error: errorMessageReducer
})

export default rootReducer;