// Formats the yrwk for the menu, etc. Takes "YYYYWW" format and returns "Week WW - YYYY"
export const formatWeek = input => {
    return 'Week ' + input.substring(4, 6) + ' - ' + input.substring(0, 4)
}
// This feeds the list for the weeks drowdown menu. Given a week info source, pulls a list of weeks.
export const getWeeks = weekInfo => {
    var dropdown = []
    for (let i in weekInfo) {
        dropdown.push(formatWeek(weekInfo[i]))
    }
    return dropdown
}
// This uses getWeeks to return the current week. Used to set the state.
// Default index is 2 (shows two previous weeks)
export const getCurrentWeek = (weekInfo, indexOfCurrentWeek = 2) => {
    let weeks = getWeeks(weekInfo)
    return weeks[indexOfCurrentWeek]
}
