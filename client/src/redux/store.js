import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from "redux-thunk"; // Đúng cách để import `thunk` làm middleware
import { carsReducer } from "./reducers/carsReducer";
import {alertsReducer} from "./reducers/alertsReducer";

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
    carsReducer,
    alertsReducer,
});

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export default store;
