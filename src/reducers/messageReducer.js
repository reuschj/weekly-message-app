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
                area: action.area,
                status: null,
                data: null
            }
        case SET_AREA:
            let getDataWithArea = readDataFromSource(
                config.dataSource,
                initialData,
                action.area,
                state.yrwk
            )
            return {
                ...state,
                area: action.area,
                status: lookupStatus(getDataWithArea),
                data: getDataWithArea
            }
        case SET_YRWK:
            let getDataWithYrwk = readDataFromSource(
                config.dataSource,
                initialData,
                state.area,
                action.yrwk
            )
            return {
                ...state,
                yrwk: action.yrwk,
                status: lookupStatus(getDataWithYrwk),
                data: getDataWithYrwk
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
