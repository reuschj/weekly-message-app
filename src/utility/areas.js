import config from '../config'

// This feeds the list for the area drowdown menu. Given an area info source, pulls a list of area names.
export const getAreas = areaInfo => {
    let dropdown = [config.defaults.noAreaSelected]
    for (let i in areaInfo) {
        dropdown.push(areaInfo[i].name)
    }
    return dropdown
}
// Retieves area info properties (title, icon, etc.) given an area. Use returnInfo to specify the property you are looking for. Specify the area info source with areaInfo.
export const lookupAreaInfo = (area, returnInfo, areaInfo) => {
    for (let i in areaInfo) {
        if (areaInfo[i].name === area) {
            return areaInfo[i][returnInfo]
        }
    }
}
// Takes an input and a list of valid areas, then checks if the input is in that list
export const isValidArea = (input, areaList) => {
    for (let i in areaList) {
        if (areaList[i].name === input) {
            return true
        } else if (
            parseInt(i) === areaList.length - 1 &&
            areaList[i].name !== input
        ) {
            return false
        }
    }
}
