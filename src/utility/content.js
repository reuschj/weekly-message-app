import DOMPurify from 'dompurify'
// Import config
import config from '../config'

// const createDOMPurify = require('dompurify')
// const { JSDOM } = require('jsdom')
// const window = (new JSDOM('')).window
// const DOMPurify = createDOMPurify(window)


// Given a data object and field, returns the value (message) from that field.
// Uses DOMPurify to validate the message for safety.
export const getContentFromData = (data, field) => {
    let theData = null
    if (data !== null) {
        theData = data
    } else {
        theData = config.defaults.data
    }
    for (let i in theData) {
        if (theData[i].FIELD === field) {
            return DOMPurify.sanitize(theData[i].MESSAGE)
        }
    }
}
// Given an input, a data object and field, updates the value (message) with the input.
// Uses DOMPurify to validate the input for safety.
export const setContentFromData = (input, data, field) => {
    if (data !== null) {
        let returnValue = data
        for (let i in data) {
            if (data[i].FIELD === field) {
                returnValue[i].MESSAGE = DOMPurify.sanitize(input)
            }
        }
        return returnValue
    }
}
