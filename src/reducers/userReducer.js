import initialState from "../constants/initialState"
import { SET_USER_TYPE } from "../actions/types"

// Reducer

const userMessage = (state = initialState.user, action) => {
    switch (action.type) {
        case SET_USER_TYPE:
            return {
                ...state,
                userType: action.userType
            }
        default:
            return state
    }
}

export default userMessage
