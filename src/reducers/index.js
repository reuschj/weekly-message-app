import { combineReducers } from "redux"
import user from "./userReducer"
import message from "./messageReducer"
import app from "./appReducer"

const rootReducer = combineReducers({
    user,
    message,
    app
})

export default rootReducer
