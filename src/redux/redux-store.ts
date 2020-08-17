import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
// import createSagaMiddleware from 'redux-saga';
// import { watchLoadData } from "./Redux-Saga/saga-repositories-page";
import toolPageReducer from "./reducers/tool-page-reducer";

const reducers = combineReducers({
    toolPage: toolPageReducer
});

// const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// sagaMiddleware.run(watchLoadData)

// window.store = store;

export default store;