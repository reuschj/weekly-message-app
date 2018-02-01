import { CHANGE_STATUS, GO_HOME, SET_AREA, SET_YRWK, LOAD_DATA } from './types'

// Action Creators

export const changeStatus = status => ({
    type: CHANGE_STATUS,
    status
})

export const goHome = () => ({
    type: GO_HOME,
    area: 'HomeScreen'
})

export const setArea = area => ({
    type: SET_AREA,
    area
})

export const setYrwk = yrwk => ({
    type: SET_YRWK,
    yrwk
})

export const loadData = data => ({
    type: LOAD_DATA,
    data
})
