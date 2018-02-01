import initialState from "../constants/initialState"
import {
    CHANGE_STATUS,
    GO_HOME,
    SET_AREA,
    SET_YRWK,
    LOAD_DATA
} from "../actions/types"
import config from "../config"
import { readDataFromSource } from "../utility"
import { lookupStatus } from "../utility"
import { initialData } from "../config/initialData"

// Reducer

const messageReducer = (state = initialState.message, action) => {
    switch (action.type) {
        case CHANGE_STATUS:
            return {
                ...state,
                status: action.status
            }
        case GO_HOME:
            return {
                ...state,
                area: action.area
            }
        case SET_AREA:
            let getData = readDataFromSource(
                config.dataSource,
                initialData,
                action.area,
                state.yrwk
            )
            return {
                ...state,
                area: action.area,
                status: lookupStatus(getData),
                data: getData
            }
        case SET_YRWK:
            return {
                ...state,
                yrwk: action.yrwk
            }
        case LOAD_DATA:
            return {
                ...state,
                data: action.data
            }
        default:
            return state
    }
}

export default messageReducer
