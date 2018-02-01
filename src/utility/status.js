import config from '../config'

// Used by changeStatus. This takes a new staus as input and a data object. It changes the status in that data.
export const updateStatusinData = (input, data) => {
    let theData = null
    if (data !== null) {
        theData = data
    } else {
        theData = config.defaults.data
    }
    for (let i in theData) {
        if (theData[i].STATUS !== '') {
            theData[i].STATUS = input
        }
    }
    return theData
}
// Takes a data object and returns the status.
export const lookupStatus = data => {
    let theData = null
    if (data !== null) {
        theData = data
    } else {
        theData = config.defaults.data
    }
    for (let i in theData) {
        if (theData[i].STATUS !== '') {
            return theData[i].STATUS
        }
    }
}
