import { combineReducers } from 'redux'
import user from './userReducer'
import message from './messageReducer'
import app from './appReducer'
import component from './componentReducer'

const rootReducer = combineReducers({
    user,
    message,
    app,
    component
})

export default rootReducer
