import config from '../config'
import { getCurrentWeek, getUserType } from '../utility'
// Import actions
import { setUserType, changeStatus, goHome, setArea, setYrwk, editToggle, editOn, editOff, loadData } from '../actions'
// Import user/status types
import { UserTypes, StatusTypes } from '../constants/stateTypes'
const { viewer, contributor, reviewer } = UserTypes
const { draft, review, published } = StatusTypes

const currentWeek = getCurrentWeek(
    config.weekInfo.weeks,
    config.weekInfo.current
)

const initialState = {
    user: {
        userType: getUserType(config.savedUserType)
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
            value: 'undefinded'
        },
        YrWkSelect: {
            value: 'undefinded'
        }
    }
}

export default initialState
