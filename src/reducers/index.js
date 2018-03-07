import { combineReducers } from 'redux'
import user from './userReducer'
import message from './messageReducer'
import app from './appReducer'
import components from './componentReducer'

const rootReducer = combineReducers({
    user,
    message,
    app,
    components
})

export default rootReducer
