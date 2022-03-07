import{applyMiddleware, createStore} from "redux"
import thunk from "redux-thunk"
import Reducer from "../Reducers"
let store;
export  function storeCreater(){

    store=createStore(Reducer,applyMiddleware(thunk))
    return store
}