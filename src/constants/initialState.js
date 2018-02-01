import config from '../config'
import { getCurrentWeek } from '../utility'

const currentWeek = getCurrentWeek(
    config.weekInfo.weeks,
    config.weekInfo.current
)

// Import actions
import {
    setUserType,
    changeStatus,
    goHome,
    setArea,
    setYrwk,
    editToggle,
    editOn,
    editOff,
    loadData
} from '../actions'
import { UserTypes, StatusTypes } from '../constants/stateTypes'
const { viewer, contributor, reviewer } = UserTypes
const { draft, review, published } = StatusTypes

const initialState = {
    user: {
        userType: viewer
    },
    message: {
        area: null,
        yrwk: currentWeek,
        status: null,
        data: null
    },
    app: {
        editable: false
    },
    components: {
        AreaSelect: {
            value: null
        },
        YrWkSelect: {
            value: null
        }
    }
}

export default initialState
