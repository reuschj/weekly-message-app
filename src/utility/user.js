// Import config
import config from '../config'

// Saves the user type to local storage
export const saveUserType = (dataSource, input) => {
    localStorage.setItem(dataSource, input)
}
// Retrieves the user type from local storage
export const getUserType = (dataSource) => {
    if (localStorage.getItem(dataSource) !== null) {
        return localStorage.getItem(dataSource)
    } else {
        return config.defaults.userType
    }
}
