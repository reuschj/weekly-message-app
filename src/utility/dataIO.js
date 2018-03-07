import config from '../config'
import { isValidArea } from './areas'

// This is the primary way to retreive from the data source.
// Given a primary source (and backup, which loads default starter data), it pulls a data object given area and week.
export const readDataFromSource = (
    primaryDataSource,
    backupDataObject,
    area,
    yrwk
) => {
    let data = null
    if (localStorage.getItem(primaryDataSource) !== null) {
        data = JSON.parse(localStorage.getItem(primaryDataSource))
    } else {
        data = backupDataObject
        localStorage.setItem(
            primaryDataSource,
            JSON.stringify(backupDataObject)
        )
    }
    for (let i in data) {
        let finishedWithoutMatch =
            isValidArea(area, config.areaInfo) &&
            parseInt(i,10) === data.length - 1 &&
            (data[i].area !== area || data[i].yrwk !== yrwk)
        if (data[i].area === area && data[i].yrwk === yrwk) {
            return data[i].data
        } else if (finishedWithoutMatch) {
            let returnValue = JSON.parse(JSON.stringify(config.defaults.data))
            for (let j in returnValue) {
                returnValue[j].AREA = area
                if (returnValue[j].YRWK !== '') {
                    returnValue[j].YRWK = yrwk
                }
                if (returnValue[j].FIELD === 'HEADER') {
                    let initial = returnValue[j].MESSAGE
                    returnValue[j].MESSAGE = initial.replace('areaTitle', area)
                }
            }
            return returnValue
        }
    }
}
// This is the primary way to write to the data source.
// Given a primary source and an input data object, it replaces the existing data object for the given area and week.
export const writeDataToSource = (dataSource, inputData, area, yrwk) => {
    let data = null
    if (localStorage.getItem(dataSource) !== null) {
        data = JSON.parse(localStorage.getItem(dataSource))
    }
    if (data !== null) {
        for (let i in data) {
            let finishedWithoutMatch =
                isValidArea(area, config.areaInfo) &&
                parseInt(i,10) === data.length - 1 &&
                (data[i].area !== area || data[i].yrwk !== yrwk)
            if (data[i].area === area && data[i].yrwk === yrwk) {
                data[i].data = inputData
            } else if (finishedWithoutMatch) {
                data.push({
                    area: area,
                    yrwk: yrwk,
                    data: inputData
                })
            }
        }
        localStorage.setItem(dataSource, JSON.stringify(data))
    }
}
