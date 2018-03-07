import config from '../config'
import { getCurrentWeek, getUserType } from '../utility'

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
