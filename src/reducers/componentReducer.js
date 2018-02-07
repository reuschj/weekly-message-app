import initialState from '../constants/initialState'
import { SET_AREA_VALUE, SET_YRWK_VALUE } from '../actions/types'

// Reducer

const componentReducer = (state = initialState.components, action) => {
    switch (action.type) {
        case SET_AREA_VALUE:
            return {
                ...state,
                AreaSelect: {
                    value: action.value
                }
            }
        case SET_YRWK_VALUE:
            return {
                ...state,
                YrWkSelect: {
                    value: action.value
                }
            }
        default:
            return state
    }
}

export default componentReducer
