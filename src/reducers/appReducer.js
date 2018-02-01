import initialState from '../constants/initialState'
import { EDIT_TOGGLE, EDIT_ON, EDIT_OFF } from '../actions/types'

// Reducer

const appReducer = (state = initialState.app, action) => {
    switch (action.type) {
        case EDIT_TOGGLE:
            return {
                ...state,
                editable: !state.editable
            }
        case EDIT_ON:
            return {
                ...state,
                editable: action.editable
            }
        case EDIT_OFF:
            return {
                ...state,
                editable: action.editable
            }
        default:
            return {
                ...state,
                editable: false
            }
    }
}

export default appReducer
