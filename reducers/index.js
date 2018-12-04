import { combineReducers } from 'redux';
import { DataReducer } from "./DataReducer";

// used to sync reducer with redux store
export const reducer = combineReducers({
    userData: DataReducer
})