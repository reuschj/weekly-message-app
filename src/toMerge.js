// utility =====================================================================
// =============================================================================

// index.js --------------------------------------------------------------------

// export * from './areas'
// export * from './dataIO'
// export * from './status'
// export * from './weeks'

// areas.js --------------------------------------------------------------------

// import config from '../config'

// This feeds the list for the area drowdown menu. Given an area info source, pulls a list of area names.
export const getAreas = (areaInfo) => {
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
        } else if (parseInt(i) === (areaList.length - 1) && areaList[i].name !== input) {
            return false
        }
    }
}

// dataIO.js -------------------------------------------------------------------

// import config from '../config'
// import { isValidArea } from './areas'

// This is the primary way to retreive from the data source.
// Given a primary source (and backup, which loads default starter data), it pulls a data object given area and week.
export const readDataFromSource = (primaryDataSource, backupDataObject, area, yrwk) => {
    let data = null
    if (localStorage.getItem(primaryDataSource) !== null) {
        data = JSON.parse(localStorage.getItem(primaryDataSource))
    } else {
        data = backupDataObject
        localStorage.setItem(primaryDataSource, JSON.stringify(backupDataObject))
    }
    for (let i in data) {
        let finishedWithoutMatch = (isValidArea(area, config.areaInfo) && parseInt(i) === (data.length - 1) && (data[i].area !== area || data[i].yrwk !== yrwk))
        if (data[i].area === area && data[i].yrwk === yrwk) {
            return data[i].data
        } else if (finishedWithoutMatch) {
            let returnValue = JSON.parse(JSON.stringify(config.defaults.data))
            for (let j in returnValue) {
                returnValue[j].AREA = area
                if (returnValue[j].YRWK !== "") {
                    returnValue[j].YRWK = yrwk
                }
                if (returnValue[j].FIELD === "HEADER") {
                    let initial = returnValue[j].MESSAGE
                    returnValue[j].MESSAGE = initial.replace("areaTitle", area)
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
            let finishedWithoutMatch = (isValidArea(area, config.areaInfo) && parseInt(i) === (data.length - 1) && (data[i].area !== area || data[i].yrwk !== yrwk))
            if (data[i].area === area && data[i].yrwk === yrwk) {
                data[i].data = inputData
            } else if (finishedWithoutMatch) {
                data.push({
                    "area": area,
                    "yrwk": yrwk,
                    "data": inputData
                })
            }
        }
        localStorage.setItem(dataSource, JSON.stringify(data))
    }
}

// status.js -------------------------------------------------------------------

// import config from '../config'

// Used by changeStatus. This takes a new staus as input and a data object. It changes the status in that data.
export const updateStatusinData = (input, data) => {
    let theData = null
    if (data !== null) {
        theData = data
    } else {
        theData = config.defaults.data
    }
    for (let i in theData) {
        if (theData[i].STATUS !== "") {
            theData[i].STATUS = input
        }
    }
    return theData
}
// Takes a data object and returns the status.
export const lookupStatus = (data) => {
    let theData = null
    if (data !== null) {
        theData = data
    } else {
        theData = config.defaults.data
    }
    for (let i in theData) {
        if (theData[i].STATUS !== "") {
            return theData[i].STATUS
        }
    }
}

// weeks.js --------------------------------------------------------------------

// Formats the yrwk for the menu, etc. Takes "YYYYWW" format and returns "Week WW - YYYY"
export const formatWeek = (input) => {
    return "Week " + input.substring(4, 6) + " - " + input.substring(0, 4)
}
// This feeds the list for the weeks drowdown menu. Given a week info source, pulls a list of weeks.
export const getWeeks = (weekInfo) => {
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

// actions =====================================================================
// =============================================================================

// index.js --------------------------------------------------------------------

// export * from './userActions'
// export * from './messageActions'
// export * from './appActions'

// appActions.js ---------------------------------------------------------------

// import {
//     EDIT_TOGGLE,
//     EDIT_ON,
//     EDIT_OFF
// } from './types'

// Action Creators

export const editToggle = () => ({
    type: EDIT_TOGGLE
})

export const editOn = () => ({
    type: EDIT_ON,
    editable: true
})

export const editOff = () => ({
    type: EDIT_OFF,
    editable: false
})



// messageActions.js --------------------------------------------------------------------

// import {
//     CHANGE_STATUS,
//     GO_HOME,
//     SET_AREA,
//     SET_YRWK,
//     LOAD_DATA
// } from './types'

// Action Creators

export const changeStatus = (status) => ({
    type: CHANGE_STATUS,
    status
})

export const goHome = () => ({
    type: GO_HOME,
    area: 'HomeScreen'
})

export const setArea = (area) => ({
    type: SET_AREA,
    area
})

export const setYrwk = (yrwk) => ({
    type: SET_YRWK,
    yrwk
})

export const loadData = (data) => ({
    type: LOAD_DATA,
    data
})

// userActions.js --------------------------------------------------------------------

// import {
//     SET_USER_TYPE
// } from './types'

// types.js --------------------------------------------------------------------

// Action Types

export const SET_USER_TYPE = 'SET_USER_TYPE'
export const CHANGE_STATUS = 'CHANGE_STATUS'
export const GO_HOME = 'GO_HOME'
export const SET_AREA = 'SET_AREA'
export const SET_YRWK = 'SET_YRWK'
export const EDIT_TOGGLE = 'EDIT_TOGGLE'
export const EDIT_ON = 'EDIT_ON'
export const EDIT_OFF = 'EDIT_OFF'
export const LOAD_DATA = 'LOAD_DATA'

// Action Creators

export const setUserType = (userType) => ({
    type: SET_USER_TYPE,
    userType
})

// components ==================================================================
// =============================================================================

// App.js ----------------------------------------------------------------------

const App = () => {
	return (
		<div>
			<LoginContainer
				config={config}
			/>
		</div>
	)
}

export default App

// Bar.js ----------------------------------------------------------------------

const Bar = (props) => {
	var addClass = ""
	if (props.addClass !== undefined) {
		addClass = " " + props.addClass
	}
	return (
		<div className={"Bar" + addClass} id={props.id}>
			<Container>
				{props.children}
			</Container>
		</div>
	)
}

export default Bar

// Container.js ---------------------------------------------------------

// Bootstrap container
const Container = (props) => {
	return (
		<div className={"container"}>
			{props.children}
		</div>
	)
}

export default Container

// Row.js ---------------------------------------------------

// Bootstrap row
const Row = (props) => {
	return (
		<div className={"row"}>
			{props.children}
		</div>
	)
}

export default Row

// ColumnWide.js ---------------------------------------------------

// Bootstrap column
const ColumnWide = (props) => {
	return (
		<div className={"col col-sm-7 col-md-8"}>
			{props.children}
		</div>
	)
}

export default ColumnWide

// WideColumn.js ---------------------------------------------------

// Bootstrap column
const ColumnNarrow = (props) => {
	return (
		<div className={"col col-sm-5 col-md-4"}>
			{props.children}
		</div>
	)
}

export default ColumnNarrow

// Button.js -------------------------------------------------------------------

const Button = (props) => {
	invertClass = props.invert ? " invert " : ""
	return (
		<button type="button" className={"Button " + invertClass + props.color} id={props.id} title={props.text} aria-label={props.text} onClick={props.onClick}  role="button" aria-pressed="false">
			<i className="material-icons">{props.icon}</i>
		</button>
	)
}

export default Button

// MaterialButton.js -----------------------------------------------------------

const MaterialButton = (props) => {
	return (
		<button type="button" className={"mdc-button mdc-button--raised"} id={props.id} title={props.text} aria-label={props.text} onClick={props.onClick} data-mdc-auto-init="MDCRipple" role="button" aria-pressed="false">
			<i className="material-icons mdc-button__icon">{props.icon}</i>
			{props.text}
		</button>
	)
}

export default MaterialButton

// MaterialFloatingButton.js ---------------------------------------------------

const MaterialFloatingButton = (props) => {
	return (
		<button type="button" className={"mdc-fab material-icons"} id={props.id} title={props.text} aria-label={props.text} onClick={props.onClick}>
			<span className={"mdc-fab__icon"}>
				{props.icon}
			</span>
		</button>
	)
}

export default MaterialFloatingButton

// HtmlContent.js --------------------------------------------------------------

const HtmlContent = (props) => {
	return (
		<div id={props.id} dangerouslySetInnerHTML={{__html: props.content}} />
	)
}

export default HtmlContent

// UploadImage.js --------------------------------------------------------------

const UploadImage = (props) => {
    return (
        <img id={props.id} className={props.className} src={props.fileName} />
    )
}

export default UploadImage

// FormSelect.js ---------------------------------------------------------------

class FormSelect extends React.Component {
	constructor(props) {
		super(props)
		this.generateOptions = this.generateOptions.bind(this)
	}
	// Generates a list of menu options given an input list. Optional: chose a default selected index.
	generateOptions(inputList, selectedIndex = 0) {
		const output = inputList.map((item, index) =>
			<option selected={index === selectedIndex ? "selected" : null} key={item} value={item}>{item}</option>
		)
		return output
	}
	render() {
		let inputList =  this.props.optionList
		let selectedIndex = this.props.selectedIndex
		return (
			<form className="FormSelect form-group" id={this.props.id}>
				<label>{this.props.label}</label>
				<select className="form-control" value={this.props.value} onChange={this.props.handleChange}>
					{this.generateOptions(inputList, selectedIndex)}
				</select>
			</form>
		)
	}
}

export default FormSelect

// LoginContainer.js -----------------------------------------------------------

class LoginContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userType: this.getUserType(config.savedUserType)
		}
		this.setUserType = this.setUserType.bind(this)
		this.saveUserType = this.saveUserType.bind(this)
		this.getUserType = this.getUserType.bind(this)
	}
	// Sets the userType state (toggle)
	setUserType() {
		let nextUserType = ""
		if (this.state.userType === "Viewer") {
			nextUserType = "Contributor"
		} else if (this.state.userType === "Contributor") {
			nextUserType = "Reviewer"
		} else if (this.state.userType === "Reviewer") {
			nextUserType = "Viewer"
		} else {
			nextUserType = "Viewer"
		}
		this.saveUserType(config.savedUserType, nextUserType)
		this.setState({userType: nextUserType})
	}
	// Saves the user type to local storage
	saveUserType(dataSource, input) {
		localStorage.setItem(dataSource, input)
	}
	// Retrieves the user type from local storage
	getUserType(dataSource) {
		if (localStorage.getItem(dataSource) !== null) {
			return localStorage.getItem(dataSource)
		} else {
			return config.defaults.userType
		}
	}
	render() {
		return (
			<div>
				<LoginBar
					userType={this.state.userType}
					setUserType={this.setUserType}
				/>
				<MessageContainer
					userType={this.state.userType}
					dataSource={config.dataSource}
					config={config}
				/>
			</div>
		)
	}
}

export default LoginContainer

// LoginBar.js --------------------------------------------------------------

const LoginBar = (props) => {
	return (
		<Bar id="LoginBar">
			<LoginStatus userType={props.userType} />
			<LoginControl userType={props.userType} setUserType={props.setUserType} />
		</Bar>
	)
}

export default LoginBar

// LoginStatus.js --------------------------------------------------------------

const LoginStatus = (props) => {
	return (
		<div className="LoginStatus">
			<span className="statusLabel">Type:</span>
			{props.userType}
		</div>
	)
}

export default LoginStatus

// LoginControl.js -------------------------------------------------------------

class LoginControl extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		let color = "blue"
		let icon = "remove_red_eye"
		if (this.props.userType === "Contributor") {
			color = "green"
			icon = "account_circle"
		} else if (this.props.userType === "Reviewer") {
			color = "orange"
			icon = "account_box"
		}
		return (
			<Button id="LoginControl" icon={icon} text="Change User Type" color={color} invert={true} onClick={this.props.setUserType} />
		)
	}
}

export default LoginControl

// MessageContainer.js ---------------------------------------------------------

// This is the primary control center for most states and fuctions
class MessageContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			area: null,
			yrwk: getCurrentWeek(config.weekInfo.weeks, config.weekInfo.current),
			status: null,
			isEditable: false,
			data: null
		}
		this.setArea = this.setArea.bind(this)
		// this.getAreas = this.getAreas.bind(this)
		// this.lookupAreaInfo = this.lookupAreaInfo.bind(this)
		// this.isValidArea = this.isValidArea.bind(this)
		this.setYrwk = this.setYrwk.bind(this)
		// this.formatWeek = this.formatWeek.bind(this)
		// this.getWeeks = this.getWeeks.bind(this)
		// this.getCurrentWeek = this.getCurrentWeek.bind(this)
		this.editToggle = this.editToggle.bind(this)
		// this.changeStatus = this.changeStatus.bind(this)
		// this.updateStatusinData = this.updateStatusinData.bind(this)
		// this.lookupStatus = this.lookupStatus.bind(this)
		this.getContentFromData = this.getContentFromData.bind(this)
		this.setContentFromData = this.setContentFromData.bind(this)
		// this.readDataFromSource = this.readDataFromSource.bind(this)
		// this.writeDataToSource = this.writeDataToSource.bind(this)
		this.loadCKEditors = this.loadCKEditors.bind(this)
		this.saveEditorContent = this.saveEditorContent.bind(this)
		this.destroyEditors = this.destroyEditors.bind(this)
		this.setPermissions = this.setPermissions.bind(this)
	}
	// Sets the area in the state given the new area as input.
	// This also reads data from the source and uses it to set the status and load data to the state.
	setArea(input) {
		let theData = readDataFromSource(this.props.dataSource, initialData, input, this.state.yrwk)
		this.setState({
			area: input,
			status: lookupStatus(theData),
			isEditable: false,
			data: theData
		})
	}
	// This feeds the list for the area drowdown menu. Given an area info source, pulls a list of area names.
	// getAreas(areaInfo) {
	// 	let dropdown = [config.defaults.noAreaSelected]
	// 	for (let i in areaInfo) {
	// 		dropdown.push(areaInfo[i].name)
	// 	}
	// 	return dropdown
	// }
	// Retieves area info properties (title, icon, etc.) given an area. Use returnInfo to specify the property you are looking for. Specify the area info source with areaInfo.
	// lookupAreaInfo(area, returnInfo, areaInfo) {
	// 	for (let i in areaInfo) {
	// 		if (areaInfo[i].name === area) {
	// 			return areaInfo[i][returnInfo]
	// 		}
	// 	}
	// }
	// Takes an input and a list of valid areas, then checks if the input is in that list
	// isValidArea(input, areaList) {
	// 	for (let i  in areaList) {
	// 		if (areaList[i].name === input) {
	// 			return true
	// 		} else if (parseInt(i) === (areaList.length - 1) && areaList[i].name !== input) {
	// 			return false
	// 		}
	// 	}
	// }
	// Sets the yrwk in the state given the new ytwk as input.
	// This also reads data from the source and uses it to set the status and load data to the state.
	setYrwk(input) {
		let theData =  readDataFromSource(this.props.dataSource, initialData, this.state.area, input)
		this.setState({
			yrwk: input,
			status: lookupStatus(theData),
			isEditable: false,
			data: theData
		})
	}
	// Formats the yrwk for the menu, etc. Takes "YYYYWW" format and returns "Week WW - YYYY"
	// formatWeek(input) {
	// 	return "Week " + input.substring(4,6) + " - " + input.substring(0,4)
	// }
	// This feeds the list for the weeks drowdown menu. Given a week info source, pulls a list of weeks.
	// getWeeks(weekInfo){
	// 	var dropdown = []
	// 	for (let i in weekInfo) {
	// 		dropdown.push(this.formatWeek(weekInfo[i]))
	// 	}
	// 	return dropdown
	// }
	// This uses getWeeks to return the current week. Used to set the state.
	// Default index is 2 (shows two previous weeks)
	// getCurrentWeek(weekInfo, indexOfCurrentWeek=2) {
	// 	let weeks = this.getWeeks(weekInfo)
	// 	return weeks[indexOfCurrentWeek]
	// }
	// This toggles isEditable state to turn edit mode on/off
	// This also reads data from the source and uses it to set the state for data (pulls latest saved version)
	editToggle() {
		let theData =  readDataFromSource(this.props.dataSource, initialData, this.state.area, this.state.yrwk)
		this.setState({
			isEditable: !this.state.isEditable,
			data: theData
		})
	}
	// This updates the status. It reads the latest saved data from the source, updates the status, then saves it back to the source. It then sets the status state and loads the updated data to state
	changeStatus(input) {
		let theData =  readDataFromSource(this.props.dataSource, initialData, this.state.area, this.state.yrwk)
		let newData = updateStatusinData(input, theData)
		writeDataToSource(this.props.dataSource, newData, this.state.area, this.state.yrwk)
		this.setState({
			status: input,
			isEditable: false,
			data: newData
		})
		console.log("I changed the status to", input , "and wrote", newData)
	}
	// Used by changeStatus. This takes a new staus as input and a data object. It changes the status in that data.
	// updateStatusinData(input, data) {
	// 	let theData = null
	// 	if (data !== null) {
	// 		theData = data
	// 	} else {
	// 		theData = config.defaults.data
	// 	}
	// 	for (let i in theData) {
	// 		if (theData[i].STATUS !== "") {
	// 			theData[i].STATUS = input
	// 		}
	// 	}
	// 	return theData
	// }
	// Takes a data object and returns the status.
	// lookupStatus(data) {
	// 	let theData = null
	// 	if (data !== null) {
	// 		theData = data
	// 	} else {
	// 		theData = config.defaults.data
	// 	}
	// 	for (let i in theData) {
	// 		if (theData[i].STATUS !== "") {
	// 			return theData[i].STATUS
	// 		}
	// 	}
	// }
	// Given a data object and field, returns the value (message) from that field.
	// Uses DOMPurify to validate the message for safety.
	getContentFromData(data, field) {
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
	setContentFromData(input, data, field) {
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
	// This is the primary way to retreive from the data source.
	// Given a primary source (and backup, which loads default starter data), it pulls a data object given area and week.
	// readDataFromSource(primaryDataSource, backupDataObject, area, yrwk) {
	// 	let data = null
	// 	if (localStorage.getItem(primaryDataSource) !== null) {
	// 		data = JSON.parse(localStorage.getItem(primaryDataSource))
	// 	} else {
	// 		data = backupDataObject
	// 		localStorage.setItem(primaryDataSource, JSON.stringify(backupDataObject))
	// 	}
	// 	for (let i in data) {
	// 		let finishedWithoutMatch = (isValidArea(area, config.areaInfo) && parseInt(i) === (data.length - 1) && (data[i].area !== area || data[i].yrwk !== yrwk))
	// 		if (data[i].area === area && data[i].yrwk === yrwk) {
	// 			return data[i].data
	// 		} else if (finishedWithoutMatch) {
	// 			let returnValue = JSON.parse(JSON.stringify(config.defaults.data))
	// 			for (let j in returnValue) {
	// 				returnValue[j].AREA = area
	// 				if (returnValue[j].YRWK !== "") {
	// 					returnValue[j].YRWK = yrwk
	// 				}
	// 				if (returnValue[j].FIELD === "HEADER") {
	// 					let initial = returnValue[j].MESSAGE
	// 					returnValue[j].MESSAGE = initial.replace("areaTitle", area)
	// 				}
	// 			}
	// 			console.log("Started with:", config.defaults.data)
	// 			console.log("No data, so I set to default:", returnValue)
	// 			return returnValue
	// 		}
	// 	}
	// }
	// This is the primary way to write to the data source.
	// Given a primary source and an input data object, it replaces the existing data object for the given area and week.
	// writeDataToSource(dataSource, inputData, area, yrwk) {
	// 	let data = null
	// 	if (localStorage.getItem(dataSource) !== null) {
	// 		data = JSON.parse(localStorage.getItem(dataSource))
	// 	}
	// 	if (data !== null) {
	// 		for (let i in data) {
	// 			let finishedWithoutMatch = (isValidArea(area, config.areaInfo) && parseInt(i) === (data.length - 1) && (data[i].area !== area || data[i].yrwk !== yrwk))
	// 			if (data[i].area === area && data[i].yrwk === yrwk) {
	// 				data[i].data = inputData
	// 			} else if (finishedWithoutMatch) {
	// 				data.push({
	// 					"area": area,
	// 					"yrwk": yrwk,
	// 					"data": inputData
	// 				})
	// 			}
	// 		}
	// 		localStorage.setItem(dataSource, JSON.stringify(data))
	// 		console.log("writeDataToSource: I wrote this:", JSON.parse(localStorage.getItem(dataSource)))
	// 	}
	// }
	// Loads all CKE editor instances specified in config
	loadCKEditors() {
		for (let instance in config.editorInstances) {
			let thisInstance = config.editorInstances[instance]
			if (thisInstance.enabled) {
				if (!thisInstance.loaded) {
					thisInstance.promise = InlineEditor
						.create(
							document.querySelector("#" + thisInstance.selector)
						)
						.catch( error => {
						console.error( error )
					} )
					thisInstance.loaded = true
				}
			}
		}
	}
	// Saves all CKE editor instances specified in config. Async Promise
	// Saves to the dataSource
	saveEditorContent() {
		let component = this
		return new Promise (function(resolve, reject) {
			if (component.state.isEditable) {
				let editors = {
					"selectors": [],
					"promises": []
				}
				for (let i in component.props.config.editorInstances) {
					let thisInstance = component.props.config.editorInstances[i]
					if (thisInstance.enabled && thisInstance.promise !== null) {
						editors.selectors.push(thisInstance.selector)
						editors.promises.push(
							new Promise (function(resolve, reject) {
								resolve(thisInstance.promise.then(function(editor) {
									return editor.getData()
								}))
				            })
						)
					}
				}
				resolve(
					Promise.all(editors.promises).then(function(values) {
						// let theData = readDataFromSource(component.props.dataSource, initialData, component.state.area, component.state.yrwk)
						let theData = component.state.data
						var newData
						for (let i in values) {
							newData = component.setContentFromData(values[i], theData, editors.selectors[i])
						}
						return newData
					})
					.then(function(result) {
						writeDataToSource(component.props.dataSource, result, component.state.area, component.state.yrwk)
						console.log("Saved to disk:", result)
						return true
					})
				)
			} else {
				resolve(null)
			}
		})
	}
	// Unloads all CKE editor instances specified in config. Async Promise
	destroyEditors() {
		let component = this
		return new Promise (function(resolve, reject) {
			if (component.state.isEditable) {
				var promises = []
				var complete = []
				for (let i in component.props.config.editorInstances) {
					let thisInstance = component.props.config.editorInstances[i]
					if (thisInstance.enabled && thisInstance.promise !== null) {
						promises.push(thisInstance.promise)
						thisInstance.loaded = false
						complete.push(false)
					}
				}
				resolve(
					Promise.all(promises).then(function(editor) {
						for (let i in editor) {
							editor[i].destroy()
						}
						return true
					}).then(function(results) {
						console.log("CKE editors have been unloaded.", results)
						return results
					})
				)
			} else {
				resolve(null)
			}
		})
	}
	// This returns an object with various permissions, set based on the current state/props. These are passed down to show/hide buttons based on user type / status, etc.
	setPermissions() {
		let newPermissions = {
			isData: false,
			isLocked: false,
			allowView: false,
			allowViewStatus: false,
			allowEdit: false,
			allowSave: false,
			allowSubmit: false,
			allowPublish: false,
			allowUnPublish: false
		}
		// Tells components if data is loaded to the state
		if (this.state.data !== null && this.state.data !== undefined) {
			newPermissions.isData = true
		}
		// This tells components that a message is locked (can't turn on edit mode) once it's published.
		if (this.state.status === "Published") {
			newPermissions.isLocked = true
		}
		// This sets viewability of the message depending on viewer type and state. Viewers can't see it unless it's published.
		if (this.props.userType === "Contributor" || this.props.userType === "Reviewer") {
			newPermissions.allowView = true
		} else if (this.props.userType === "Viewer" && this.state.status === "Published") {
			newPermissions.allowView = true
		}
		// This ensures that only contributors and reviewers can see the edit status bar. It will be hidden from viewers.
		if (this.props.userType === "Contributor" || this.props.userType === "Reviewer") {
			newPermissions.allowViewStatus = true
		}
		// This sets permissions to edit based on user type and status.
		// Contributors can only edit in draft status. Reviewers can only edit in review or published status. Viewers cannot edit.
		if (this.props.userType === "Contributor" && this.state.status === "Draft") {
			newPermissions.allowEdit = true
		} else if (this.props.userType === "Reviewer" && (this.state.status === "Review" || this.state.status === "Published")) {
			newPermissions.allowEdit = true
		}
		// Contributors can only save draft status. Reviewers can only save in review status.
		if (this.props.userType === "Contributor" && this.state.status === "Draft") {
			newPermissions.allowSave = true
		} else if (this.props.userType === "Reviewer" && this.state.status === "Review") {
			newPermissions.allowSave = true
		}
		// Only contributors can submit for review.
		if (this.props.userType === "Contributor" && this.state.status === "Draft") {
			newPermissions.allowSubmit = true
		}
		// Only reviewers can return a message back to draft (from review)
		if (this.props.userType === "Reviewer" && this.state.status === "Review") {
			newPermissions.allowUnSubmit = true
		}
		// Only reviewers can publish (in review status)
		if (this.props.userType === "Reviewer" && this.state.status === "Review") {
			newPermissions.allowPublish = true
		}
		// Only reviewers can unpublish (in publish status)
		if (this.props.userType === "Reviewer" && this.state.status === "Published") {
			newPermissions.allowUnPublish = true
		}
		return newPermissions
	}
	// Before component updates, this checks that if edit mode is on and will not be toggled off by the update. If not, it unloads the CKE editors and uses editToggle to enforce that edit mode is off on the update.
	componentWillUpdate(nextProps, nextState){
		if (this.state.isEditable && nextState.isEditable !== false) {
			console.log("next State:", nextState)
			this.destroyEditors()
			this.editToggle()
			console.log("Toggled edit off before update!")
		}
	}
	render() {
		let permissions = this.setPermissions()
		console.log("MessageContainer loaded with state:", this.state)
		return (
			<div id="MessageContainer">
				<MessageHeader />
				<MessageSelectionBar
					show={!this.state.isEditable}
					homeActive={!permissions.isData || this.state.area === "HomeScreen"}
					area={this.state.area}
					setArea={this.setArea}
					setYrwk={this.setYrwk}
					config={config}
				/>
				<MessageStatusBar
					show={permissions.isData && permissions.allowViewStatus}
					allowEdit={permissions.isData && permissions.allowEdit}
					allowViewStatus={permissions.allowViewStatus}
					status={this.state.status}
					isEditable={this.state.isEditable}
					editToggle={this.editToggle}
					saveEditorContent={this.saveEditorContent}
					destroyEditors={this.destroyEditors}
				/>
				<MessageBranding
					show={permissions.isData}
					area={this.state.area}
					areaTitle={lookupAreaInfo(this.state.area, "title", config.areaInfo)}
					areaIcon={lookupAreaInfo(this.state.area, "icon", config.areaInfo)}
				/>
				<MessageEditBar
					show={permissions.isData && permissions.allowEdit && this.state.isEditable}
					allowSave={permissions.allowSave}
					allowSubmit={permissions.allowSubmit}
					allowUnSubmit={permissions.allowUnSubmit}
					allowPublish={permissions.allowPublish}
					allowUnPublish={permissions.allowUnPublish}
					changeStatus={this.changeStatus}
					saveEditorContent={this.saveEditorContent}
				/>
				<HomeScreen
                    show={!permissions.isData || this.state.area === "HomeScreen"}
                />
                <NotPublishedMessage
                    show={permissions.isData && !permissions.allowView}
					area={this.state.area}
                />
				<MessageCanvas
					show={permissions.isData && permissions.allowView}
					isLocked={permissions.isLocked}
					data={this.state.data}
					userType={this.state.userType}
					isEditable={this.state.isEditable}
					getContentFromData={this.getContentFromData}
					loadCKEditors={this.loadCKEditors}
				/>
			</div>
		)
	}
}

export default MessageContainer

// MessageHeader.js -----------------------------------------------------------------

const MessageHeader = (props) => {
	return (
		<Bar id="MessageHeader">
			<h1>
				Weekly Message
				<i className="material-icons spark">message</i>
			</h1>
		</Bar>
	)
}

export default MessageHeader

// MessageSelectionBar.js ------------------------------------------------------

const MessageSelectionBar = (props) => {
    if (!this.props.show) {
        return (
            <Bar id="MessageIsBeingEdited" addClass="editable">
                <h4>You are editing {props.area}.</h4>
            </Bar>
        )
    }
    return (
        <Bar id="MessageSelectionBar">
            <HomeButton
                area={props.area}
                setArea={props.setArea}
                active={props.homeActive}
            />
            <AreaSelect
                area={props.area}
                setArea={props.setArea}
                homeActive={props.homeActive}
                config={props.config}
            />
            <YrWkSelect
                setYrwk={props.setYrwk}
                config={props.config}
            />
            <PrintButton />
        </Bar>
    )
}

export default MessageSelectionBar

// HomeButton.js ------------------------------------------------------

class HomeButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Sets area to home screen
	handleClick() {
		this.props.setArea("HomeScreen")
	}
	render() {
		// Toggles button style if home is active
		let isActive = false
		if (this.props.active) {
			isActive = true
		}
		return (
			<Button id="HomeButton" icon="home" text="Home" invert={isActive} color="blue" onClick={this.handleClick} />
		)
	}
}

export default HomeButton

// AreaSelect.js ------------------------------------------------------

class AreaSelect extends React.Component {
	constructor(props) {
		super(props)
		this.state = {value: this.props.area}
		this.handleChange = this.handleChange.bind(this)
	}
	// Calls setArea to set the selected area
	handleChange(event) {
		this.setState({value: event.target.value})
		this.props.setArea(event.target.value)
	}
	// If component will update and home becomes active, changes the selection to no area selected message.
	componentWillUpdate(nextProps, nextState) {
		if (!this.props.homeActive && nextProps.homeActive) {
			this.setState({value: config.defaults.noAreaSelected})
			console.log("Changing because Home is active.")
		}
	}
	render() {
		return (
			<FormSelect
				id={"AreaSelect"}
				label={"Area"}
				optionList={getAreas(config.areaInfo)}
				selectedIndex={0}
				handleChange={this.handleChange}
				handleExternalChange={this.handleExternalChange}
				value={this.state.value} />
		)
	}
}

export default AreaSelect

// YrWkSelect.js ------------------------------------------------------

class YrWkSelect extends React.Component {
	constructor(props) {
		super(props)
		this.state = {value: this.value}
		this.handleChange = this.handleChange.bind(this)
	}
	// Calls setYrwk to set the selected week
	handleChange(event) {
		this.setState({value: event.target.value})
		this.props.setArea(event.target.value)
	}
	render() {
		return (
			<FormSelect
				id={"YrWkSelect"}
				label={"Week"}
				optionList={getWeeks(config.weekInfo.weeks)}
				selectedIndex={config.weekInfo.current}
				handleChange={this.handleChange}
				value={this.state.value} />
		)
	}
}

export default YrWkSelect

// PrintButton.js ------------------------------------------------------

class PrintButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick() {
	}
	render() {
		return (
			<Button id="PrintButton" icon="print" text="Print" invert={false} color="darkBlue" />
		)
	}
}

export default PrintButton

// MessageStatusBar.js ------------------------------------------------------

class MessageStatusBar extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		if (!this.props.show) {
			return null
		}
		var barClass = ""
		if (this.props.isEditable) {
			var barClass = "editable"
		}
		return (
			<Bar id="MessageStatusBar" addClass={barClass}>
				<StatusIndicator
					show={this.props.allowViewStatus}
					status={this.props.status}
					allowEdit={this.props.allowEdit}
				/>
				<EditButton
					show={this.props.allowEdit}
					isEditable={this.props.isEditable}
					editToggle={this.props.editToggle}
					saveEditorContent={this.props.saveEditorContent}
					destroyEditors={this.props.destroyEditors}
				/>
				<CancelButton
					show={this.props.allowEdit}
					isEditable={this.props.isEditable}
					editToggle={this.props.editToggle}
					destroyEditors={this.props.destroyEditors}
				/>
			</Bar>
		)
	}
}

export default MessageStatusBar

// StatusIndicator.js -----------------------------------------------------------------

const StatusIndicator = (props) => {
    if (!this.props.show) {
        return null
    }
    let lockoutMessage = ""
    if (!this.props.allowEdit) {
        lockoutMessage = "(You cannot edit during this stage.)"
    }
    return (
        <div className="StatusIndicator">
            <span className="status">{this.props.status}</span>
            <span className="lockoutMessage">{lockoutMessage}</span>
        </div>
    )
}

export default StatusIndicator

// EditButton.js ------------------------------------------------------

class EditButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Toggles edit mode. First it saves the current data to source. Then calls for CKE editors to be unloaded. Then toggles edit off/on. Save/unload pass through if edit mode is off.
	handleClick() {
		let destroyEditors = this.props.destroyEditors
		let editToggle = this.props.editToggle
		this.props.saveEditorContent()
		.then(function() {
			destroyEditors()
		})
		.then(function() {
			editToggle()
		})
	}
	render() {
		if (!this.props.show) {
			return null
		}
		if (this.props.isEditable) {
			return (
				<Button id="EditButton" icon="done" text="Save and Commit Changes" color="blue" onClick={this.handleClick} />
			)
		}
		return (
			<Button id="EditButton" icon="mode_edit" text="Edit" color="orange" onClick={this.handleClick} />
		)
	}
}

export default EditButton

// CancelButton.js ------------------------------------------------------

class CancelButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Toggles edit mode off, but doesn't save. It calls for CKE editors to be unloaded. Then toggles edit off/on.
	handleClick() {
		let editToggle = this.props.editToggle
		this.props.destroyEditors()
		.then(function() {
			editToggle()
		})
	}
	render() {
		if (!this.props.show || !this.props.isEditable) {
			return null
		}
		return (
			<Button id="CancelButton" icon="cancel" text="Cancel without Saving (not working)" color="red" onClick={this.handleClick} />
		)
	}
}

export default CancelButton

// MessageBranding.js -----------------------------------------------------------------

const MessageBranding = (props) => {
	if (!props.show) {
		return null
	}
	return (
		<Bar id="MessageBranding">
			<div id="CurrentAreaTitle">
				<h3>{props.area}</h3>
				<h4>{props.areaTitle}</h4>
			</div>
			<div className="CurrentAreaIcon">
    			<div className="IconGraphic" style={{background: "url(" + props.areaIcon + ")"}}></div>
            </div>
		</Bar>
	)
}

export default MessageBranding

// MessageEditBar.js -----------------------------------------------------------------

const MessageEditBar = (props) => {
    if (!this.props.show) {
        return null
    }
    return (
        <Bar id="MessageEditBar">
            <SaveButton
                show={props.allowSave}
                saveEditorContent={props.saveEditorContent}
            />
            <SubmitButton
                show={props.allowSubmit}
                changeStatus={props.changeStatus}
            />
            <UnSubmitButton
                show={props.allowUnSubmit}
                changeStatus={props.changeStatus}
            />
            <PublishButton
                show={props.allowPublish}
                changeStatus={props.changeStatus}
            />
            <UnpublishButton
                show={props.allowUnPublish}
                changeStatus={props.changeStatus}
            />
        </Bar>
    )
}

export default MessageEditBar

// SaveButton.js ------------------------------------------------------

class SaveButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Saves to the source. Does not set the data in the state (since this would update the component). When the component updates, it will pull the latest saved data from the source into the state and load that.
	handleClick() {
		this.props.saveEditorContent(false)
	}
	render() {
		if (!this.props.show) {
			return null
		}
		return (
			<Button id="SaveButton" icon="save" text="Save and Continue Editing" invert={false} color="green" onClick={this.handleClick} />
		)
	}
}

export default SaveButton

// SubmitButton.js ------------------------------------------------------

class SubmitButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Changes status to review
	handleClick() {
		let newStatus = "Review"
		this.props.changeStatus(newStatus)
	}
	render() {
		if (!this.props.show) {
			return null
		}
		return (
			<Button id="SubmitButton" icon="send" text="Submit for Review" invert={false} color="blue" onClick={this.handleClick} />
		)
	}
}

export default SubmitButton

// UnSubmitButton.js ------------------------------------------------------

class UnSubmitButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Changes status to back to draft
	handleClick() {
		let newStatus = "Draft"
		this.props.changeStatus(newStatus)
	}
	render() {
		if (!this.props.show) {
			return null
		}
		return (
			<Button id="UnSubmitButton" icon="assignment_return" text="Return to Contributor" invert={false} color="red" onClick={this.handleClick} />
		)
	}
}

export default UnSubmitButton

// PublishButton.js ------------------------------------------------------

class PublishButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Changes status to published
	handleClick() {
		let newStatus = "Published"
		this.props.changeStatus(newStatus)
	}
	render() {
		if (!this.props.show) {
			return null
		}
		return (
			<Button id="PublishButton" icon="send" text="Publish" invert={false} color="blue" onClick={this.handleClick} />
		)
	}
}

export default PublishButton

// UnpublishButton.js ------------------------------------------------------

class UnpublishButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Changes status back to review
	handleClick() {
		let newStatus = "Review"
		this.props.changeStatus(newStatus)
	}
	render() {
		if (!this.props.show) {
			return null
		}
		return (
			<Button id="UnpublishButton" icon="assignment_return" text="Unpublish" invert={false} color="red" onClick={this.handleClick} />
		)
	}
}

export default UnpublishButton

// HomeScreen.js -----------------------------------------------------------------

const HomeScreen = (props) => {
    if (!props.show) {
        return null
    }
    return (
        <Container>
            <div id="HomeScreen">
                <Row>
                    <ColumnNarrow>
                        <p>Swimlanes will go here.</p>
                    </ColumnNarrow>
                    <ColumnWide>
                        <p>Home content will go here.</p>
                    </ColumnWide>
                </Row>
            </div>
        </Container>
    )
}

export default HomeScreen

// NotPublishedMessage.js -----------------------------------------------------------------

const NotPublishedMessage = (props) => {
	if (!props.show) {
		return null
	}
	return (
		<Container>
			<div id="NotPublishedMessage">
				<h4>Sorry! There is no message published for {props.area} this week. :(</h4>
			</div>
		</Container>
	)
}

export default NotPublishedMessage

// MessageCanvas.js -----------------------------------------------------------------

class MessageCanvas extends React.Component {
	constructor(props) {
		super(props)
	}
	// Loads the CKE editors after an update if edit mode is on and message is not locked (published)
	componentDidUpdate() {
		console.log("MessageCanvas just updated.")
		if (this.props.isEditable && !this.props.isLocked) {
			// Load CKE Editor
			this.props.loadCKEditors()
		}
	}
	render() {
		if (!this.props.show) {
			return null
		}
		return (
			<Container>
				<div id="MessageCanvas">
					<Row>
						<ColumnWide>
							<HtmlContent
								content={this.props.getContentFromData(this.props.data, "MSGBOX1")}
								id={"MSGBOX1"}
							/>
						</ColumnWide>
						<ColumnNarrow>
							<DMMArea
								image={this.props.getContentFromData(this.props.data, "IMG_FILE1")}
								imageID={"IMG_FILE1"}
								name={this.props.getContentFromData(this.props.data, "NAMEBOX1")}
								nameID={"NAMEBOX1"}
								title={this.props.getContentFromData(this.props.data, "TITLEBOX1")}
								titleID={"TITLEBOX1"}
							/>
						</ColumnNarrow>
					</Row>
					<Row>
						<ColumnWide>
							<HtmlContent
								content={this.props.getContentFromData(this.props.data, "deptMess1")}
								id={"deptMess1"}
							/>
						</ColumnWide>
						<ColumnNarrow>
							<SpotlightArea
								content={this.props.getContentFromData(this.props.data, "MSGBOX2")}
								contentID={"MSGBOX2"}
							/>
						</ColumnNarrow>
					</Row>
				</div>
				<MaterialButton id="MaterialTest" icon="home" text="Test" />
			</Container>
		)
	}
}

export default MessageCanvas

// DMMArea.js -----------------------------------------------------------------

const DMMArea = (props) => {
	return (
		<div id="DMMArea">
			<DMMPhoto
				image={props.image}
				imageID={props.imageID}
			/>
			<DMMTitle
				name={props.name}
				nameID={props.nameID}
				title={props.title}
				titleID={props.titleID}
			/>
		</div>
	)
}

// DMMPhoto.js -----------------------------------------------------------------

const DMMPhoto = (props) => {
	return (
		<div id="DMMPhoto">
			<UploadImage id={props.imageID} className="DMMPhoto" fileName={props.image} />
		</div>
	)
}

// export default DMMPhoto

// DMMTitle.js -----------------------------------------------------------------

const DMMTitle = (props) => {
	return (
		<div id="DMMTitle">
			<div id={props.nameID}>
				<h3>{props.name}</h3>
			</div>
			<div id={props.titleID}>
				<p>{props.title}</p>
			</div>
		</div>
	)
}

export default DMMTitle

// SpotlightArea.js -----------------------------------------------------------------

const SpotlightArea = (props) => {
	return (
		<div id="SpotlightArea" className="alert alert-info">
			<h2>
				<i className="material-icons">search</i>
				<span className="titleCopy">Spotlight</span>
			</h2>
			<HtmlContent
				content={props.content}
				id={props.contentID}
			/>
		</div>
	)
}

// export default SpotlightArea

// config ======================================================================
// =============================================================================

// index.js --------------------------------------------------------------------

// const config = require('./config.json')
//
// export default config

// config.json -----------------------------------------------------------------

const config = {
	"defaults": {
		"userType": "Viewer",
		"noAreaSelected": "Select your message",
		"data": [
			{
				"AREA": "areaTitle",
				"YRWK": "",
				"FIELD": "HEADER",
				"TYPE": "text",
				"MESSAGE": "Directly from your areaTitle leader to you!",
				"LAYOUT": "",
				"STATUS": ""
			},
			{
				"AREA": "areaTitle",
				"YRWK": "",
				"FIELD": "IMG_FILE1",
				"TYPE": "pic",
				"MESSAGE": "http://placekitten.com/g/1000/1000",
				"STATUS": ""
			},
			{
				"AREA": "areaTitle",
				"YRWK": "",
				"FIELD": "NAMEBOX1",
				"TYPE": "text",
				"MESSAGE": "First Last",
				"STATUS": ""
			},
			{
				"AREA": "areaTitle",
				"YRWK": "",
				"FIELD": "TITLEBOX1",
				"TYPE": "text",
				"MESSAGE": "Title Here",
				"STATUS": ""
			},
			{
				"AREA": "areaTitle",
				"YRWK": "theYrWk",
				"FIELD": "IMG_FILE2",
				"TYPE": "pic",
				"MESSAGE": "http://placekitten.com/g/1200/1200",
				"STATUS": "Draft"
			},
			{
				"AREA": "areaTitle",
				"YRWK": "theYrWk",
				"FIELD": "MSGBOX1",
				"TYPE": "text",
				"MESSAGE": "<p>Add your content here.</p>",
				"STATUS": "Draft"
			},
			{
				"AREA": "areaTitle",
				"YRWK": "theYrWk",
				"FIELD": "MSGBOX2",
				"TYPE": "text",
				"MESSAGE": "<p>Add your content here.</p><img src='http://placekitten.com/g/1200/1200' />",
				"STATUS": "Draft"
			},
			{
				"AREA": "areaTitle",
				"YRWK": "theYrWk",
				"FIELD": "deptMess1",
				"TYPE": "text",
				"MESSAGE": "<ul><li>Add your content here.</li></ul>",
				"STATUS": "Draft"
			}
		]
	},
	"dataSource": "dataSource",
	"savedUserType": "userType",
	"editorInstances": [
		{
			"name": "overview",
			"selector": "MSGBOX1",
			"enabled": true,
			"loaded": false,
			"promise": null
		},
		{
			"name": "additionalContent",
			"selector": "deptMess1",
			"enabled": true,
			"loaded": false,
			"promise": null
		},
		{
			"name": "dmmPhoto",
			"selector": "IMG_FILE1",
			"enabled": false,
			"loaded": false,
			"promise": null
		},
		{
			"name": "dmmName",
			"selector": "NAMEBOX1",
			"enabled": false,
			"loaded": false,
			"promise": null
		},
		{
			"name": "dmmTitle",
			"selector": "TITLEBOX1",
			"enabled": false,
			"loaded": false,
			"promise": null
		},
		{
			"name": "spotlight",
			"selector": "MSGBOX2",
			"enabled": true,
			"loaded": false,
			"promise": null
		}
	],
	"areaInfo": [
		{
			"name": "Area 01",
			"title": "The European Languages",
			"swimlane": "Lane 01",
			"icon": "https://images.vexels.com/media/users/3/128243/isolated/preview/a1a5b9494d50bb3754bba547f2d88487-computer-monitor-flat-icon-by-vexels.png",
			"isPublished": false
		},
		{
			"name": "Area 02",
			"title": "Gregor Samsa",
			"swimlane": "Lane 01",
			"icon": "https://images.vexels.com/media/users/3/133087/isolated/preview/8e009942bd4dea680f222a0ffce05da7-christmas-ball-flat-icon-121-by-vexels.png",
			"isPublished": false
		},
		{
			"name": "Area 03",
			"title": "The Quick Brown Fox",
			"swimlane": "Lane 02",
			"icon": "https://images.vexels.com/media/users/3/136167/isolated/preview/3635cdd51cc272ea8c61d77c5569d707-headphone-flat-icon-by-vexels.png",
			"isPublished": false
		},
		{
			"name": "Area 04",
			"title": "A Wonderful Serenity",
			"swimlane": "Lane 02",
			"icon": "https://i.pinimg.com/originals/32/e0/06/32e00686547d54e7916ff6a7ed4ca992.png",
			"isPublished": false
		},
		{
			"name": "Area 05",
			"title": "Coast of the Semantics",
			"swimlane": "Lane 02",
			"icon": "https://images.vexels.com/media/users/3/133087/isolated/preview/8e009942bd4dea680f222a0ffce05da7-christmas-ball-flat-icon-121-by-vexels.png",
			"isPublished": false
		}
	],
	"weekInfo": {
		"current": 2,
		"weeks": [
			"201751",
			"201752",
			"201801",
			"201802",
			"201803",
			"201804",
			"201805"
		]
	}
}

// initialData.js --------------------------------------------------------------
export const initialData = [
	{
		"area": "Area 01",
		"yrwk": "Week 01 - 2018",
		"data": [
			{
				"AREA": "Area 01",
				"YRWK": "",
				"FIELD": "HEADER",
				"TYPE": "text",
				"MESSAGE": "Directly from your Area 01 leader to you!",
				"LAYOUT": "",
				"STATUS": ""
			},
			{
				"AREA": "Area 01",
				"YRWK": "",
				"FIELD": "IMG_FILE1",
				"TYPE": "pic",
				"MESSAGE": "http://placekitten.com/g/1000/1000",
				"STATUS": ""
			},
			{
				"AREA": "Area 01",
				"YRWK": "",
				"FIELD": "NAMEBOX1",
				"TYPE": "text",
				"MESSAGE": "John Smith",
				"STATUS": ""
			},
			{
				"AREA": "Area 01",
				"YRWK": "",
				"FIELD": "TITLEBOX1",
				"TYPE": "text",
				"MESSAGE": "Vice President, Area 1",
				"STATUS": ""
			},
			{
				"AREA": "Area 01",
				"YRWK": "Week 01 - 2018",
				"FIELD": "IMG_FILE2",
				"TYPE": "pic",
				"MESSAGE": "http://placekitten.com/g/1200/1200",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 01",
				"YRWK": "Week 01 - 2018",
				"FIELD": "NAMEBOX1",
				"TYPE": "text",
				"MESSAGE": "John Smith",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 01",
				"YRWK": "Week 01 - 2018",
				"FIELD": "TITLEBOX1",
				"TYPE": "text",
				"MESSAGE": "Vice President, Area 1",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 01",
				"YRWK": "Week 01 - 2018",
				"FIELD": "MSGBOX1",
				"TYPE": "text",
				"MESSAGE": "<p>One morning, when Gregor Samsa woke from troubled dreams, <strong>he found himself transformed in his bed into a horrible vermin</strong>. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p><ul><li>The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.</li><li>&quot;What's happened to me?&quot; he thought. It wasnt a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</li></ul>",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 01",
				"YRWK": "Week 01 - 2018",
				"FIELD": "MSGBOX2",
				"TYPE": "text",
				"MESSAGE": "<p>However hard he threw himself onto his right, he always rolled back to where he was. He must have tried it a hundred times, shut his eyes so that he wouldn't have to look at the floundering legs, and only stopped when he began to feel a mild, dull pain there that he had never felt before.</p><img src='http://placekitten.com/g/1200/1200' />",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 01",
				"YRWK": "Week 01 - 2018",
				"FIELD": "deptMess1",
				"TYPE": "text",
				"MESSAGE": "<ul><li>The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.</li><li>&quot;What's happened to me?&quot; he thought. It wasnt a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</li><li>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.</li><li>It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.</li></ul>",
				"STATUS": "Draft"
			}
		]
	},
	{
		"area": "Area 02",
		"yrwk": "Week 01 - 2018",
		"data": [
			{
				"AREA": "Area 02",
				"YRWK": "",
				"FIELD": "HEADER",
				"TYPE": "text",
				"MESSAGE": "Directly from your Area 02 leader to you!",
				"STATUS": ""
			},
			{
				"AREA": "Area 02",
				"YRWK": "",
				"FIELD": "IMG_FILE1",
				"TYPE": "pic",
				"MESSAGE": "http://placekitten.com/g/1100/1100",
				"STATUS": ""
			},
			{
				"AREA": "Area 02",
				"YRWK": "",
				"FIELD": "NAMEBOX1",
				"TYPE": "text",
				"MESSAGE": "Bob Johnson",
				"STATUS": ""
			},
			{
				"AREA": "Area 02",
				"YRWK": "",
				"FIELD": "TITLEBOX1",
				"TYPE": "text",
				"MESSAGE": "Vice President, Area 2",
				"STATUS": ""
			},
			{
				"AREA": "Area 02",
				"YRWK": "Week 01 - 2018",
				"FIELD": "IMG_FILE2",
				"TYPE": "pic",
				"MESSAGE": "http://placekitten.com/g/1300/1300",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 02",
				"YRWK": "Week 01 - 2018",
				"FIELD": "NAMEBOX1",
				"TYPE": "text",
				"MESSAGE": "Bob Johnson",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 02",
				"YRWK": "Week 01 - 2018",
				"FIELD": "TITLEBOX1",
				"TYPE": "text",
				"MESSAGE": "Vice President, Area 2",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 02",
				"YRWK": "Week 01 - 2018",
				"FIELD": "MSGBOX1",
				"TYPE": "text",
				"MESSAGE": "<p>One morning, when Gregor Samsa woke from troubled dreams, <strong>he found himself transformed in his bed into a horrible vermin</strong>. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p><ul><li>The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.</li><li>&quot;What's happened to me?&quot; he thought. It wasnt a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</li></ul>",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 02",
				"YRWK": "Week 01 - 2018",
				"FIELD": "MSGBOX2",
				"TYPE": "text",
				"MESSAGE": "<p>However hard he threw himself onto his right, he always rolled back to where he was. He must have tried it a hundred times, shut his eyes so that he wouldn't have to look at the floundering legs, and only stopped when he began to feel a mild, dull pain there that he had never felt before.</p><img src='http://placekitten.com/g/1400/1400' />",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 02",
				"YRWK": "Week 01 - 2018",
				"FIELD": "deptMess1",
				"TYPE": "text",
				"MESSAGE": "<ul><li>The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.</li><li>&quot;What's happened to me?&quot; he thought. It wasnt a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</li><li>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.</li><li>It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.</li></ul>",
				"STATUS": "Draft"
			}
		]
	},
	{
		"area": "Area 01",
		"yrwk": "Week 02 - 2018",
		"data": [
			{
				"AREA": "Area 01",
				"YRWK": "",
				"FIELD": "HEADER",
				"TYPE": "text",
				"MESSAGE": "Directly from your Area 01 leader to you!",
				"STATUS": ""
			},
			{
				"AREA": "Area 01",
				"YRWK": "",
				"FIELD": "IMG_FILE1",
				"TYPE": "pic",
				"MESSAGE": "http://placekitten.com/g/1000/1000",
				"STATUS": ""
			},
			{
				"AREA": "Area 01",
				"YRWK": "",
				"FIELD": "NAMEBOX1",
				"TYPE": "text",
				"MESSAGE": "John Smith",
				"STATUS": ""
			},
			{
				"AREA": "Area 01",
				"YRWK": "",
				"FIELD": "TITLEBOX1",
				"TYPE": "text",
				"MESSAGE": "Vice President, Area 1",
				"STATUS": ""
			},
			{
				"AREA": "Area 01",
				"YRWK": "Week 02 - 2018",
				"FIELD": "IMG_FILE2",
				"TYPE": "pic",
				"MESSAGE": "http://placekitten.com/g/1200/1200",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 01",
				"YRWK": "Week 02 - 2018",
				"FIELD": "NAMEBOX1",
				"TYPE": "text",
				"MESSAGE": "John Smith",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 01",
				"YRWK": "Week 02 - 2018",
				"FIELD": "TITLEBOX1",
				"TYPE": "text",
				"MESSAGE": "Vice President, Area 1",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 01",
				"YRWK": "Week 02 - 2018",
				"FIELD": "MSGBOX1",
				"TYPE": "text",
				"MESSAGE": "<p>Changed.One morning, when Gregor Samsa woke from troubled dreams, <strong>he found himself transformed in his bed into a horrible vermin</strong>. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p><ul><li>The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.</li><li>&quot;What's happened to me?&quot; he thought. It wasnt a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</li></ul>",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 01",
				"YRWK": "Week 02 - 2018",
				"FIELD": "MSGBOX2",
				"TYPE": "text",
				"MESSAGE": "<p>Changed. However hard he threw himself onto his right, he always rolled back to where he was. He must have tried it a hundred times, shut his eyes so that he wouldn't have to look at the floundering legs, and only stopped when he began to feel a mild, dull pain there that he had never felt before.</p><img src='http://placekitten.com/g/1700/1700' />",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 01",
				"YRWK": "Week 02 - 2018",
				"FIELD": "deptMess1",
				"TYPE": "text",
				"MESSAGE": "<ul><li>Changed. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.</li><li>&quot;What's happened to me?&quot; he thought. It wasnt a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</li><li>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.</li><li>It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.</li></ul>",
				"STATUS": "Draft"
			}
		]
	},
	{
		"area": "Area 02",
		"yrwk": "Week 02 - 2018",
		"data": [
			{
				"AREA": "Area 02",
				"YRWK": "",
				"FIELD": "HEADER",
				"TYPE": "text",
				"MESSAGE": "Directly from your Area 02 leader to you!",
				"STATUS": ""
			},
			{
				"AREA": "Area 02",
				"YRWK": "",
				"FIELD": "IMG_FILE1",
				"TYPE": "pic",
				"MESSAGE": "http://placekitten.com/g/1100/1100",
				"STATUS": ""
			},
			{
				"AREA": "Area 02",
				"YRWK": "",
				"FIELD": "NAMEBOX1",
				"TYPE": "text",
				"MESSAGE": "Bob Johnson",
				"STATUS": ""
			},
			{
				"AREA": "Area 02",
				"YRWK": "",
				"FIELD": "TITLEBOX1",
				"TYPE": "text",
				"MESSAGE": "Vice President, Area 2",
				"STATUS": ""
			},
			{
				"AREA": "Area 02",
				"YRWK": "Week 01 - 2018",
				"FIELD": "IMG_FILE2",
				"TYPE": "pic",
				"MESSAGE": "http://placekitten.com/g/1300/1300",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 02",
				"YRWK": "Week 01 - 2018",
				"FIELD": "NAMEBOX1",
				"TYPE": "text",
				"MESSAGE": "Bob Johnson",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 02",
				"YRWK": "Week 01 - 2018",
				"FIELD": "TITLEBOX1",
				"TYPE": "text",
				"MESSAGE": "Vice President, Area 2",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 02",
				"YRWK": "Week 01 - 2018",
				"FIELD": "MSGBOX1",
				"TYPE": "text",
				"MESSAGE": "<p>Changed.One morning, when Gregor Samsa woke from troubled dreams, <strong>he found himself transformed in his bed into a horrible vermin</strong>. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p><ul><li>The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.</li><li>&quot;What's happened to me?&quot; he thought. It wasnt a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</li></ul>",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 02",
				"YRWK": "Week 01 - 2018",
				"FIELD": "MSGBOX2",
				"TYPE": "text",
				"MESSAGE": "<p>Changed.However hard he threw himself onto his right, he always rolled back to where he was. He must have tried it a hundred times, shut his eyes so that he wouldn't have to look at the floundering legs, and only stopped when he began to feel a mild, dull pain there that he had never felt before.</p><img src='http://placekitten.com/g/1600/1600' />",
				"STATUS": "Draft"
			},
			{
				"AREA": "Area 02",
				"YRWK": "Week 01 - 2018",
				"FIELD": "deptMess1",
				"TYPE": "text",
				"MESSAGE": "<ul><li>ChangedThe bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.</li><li>&quot;What's happened to me?&quot; he thought. It wasnt a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</li><li>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.</li><li>It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.</li></ul>",
				"STATUS": "Draft"
			}
		]
	},
]

// constants ===================================================================
// =============================================================================

// intialState.js --------------------------------------------------------------

// import config from '../config'
// import { getCurrentWeek } from '../utility'

const currentWeek = getCurrentWeek(config.weekInfo.weeks, config.weekInfo.current)

const initialState = {
    user: {
        userType: null
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

// export default initialState

// stateTypes.js ---------------------------------------------------------------

export const UserTypes = {
    viewer: "Viewer",
    contributor: "Contributor",
    reviewer: "Reviewer"
}

export const StatusTypes = {
    draft: "Draft",
    review: "Review",
    published: "Published"
}

// containers ==================================================================
// =============================================================================

// ChangeState.js --------------------------------------------------------------

// import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import StateButton from '../components/StateButton'

const ChangeStateMapStateToProps = (state, ownProps) => {
    let passedName = ownProps.type !== null ? ownProps.type : ownProps.name
    return {
        name: passedName,
        input: ownProps.type,
        prevUserType: state.user.type
    }
}

const ChangeStateMapDispatchTopProps = (dispatch, ownProps) => {
    return {
        onButtonClick: (value) => {
            dispatch(ownProps.action(value))
        }
    }
}

const ChangeState = connect(
    ChangeStateMapStateToProps,
    ChangeStateMapDispatchTopProps
)(StateButton)

// export default ChangeState

// DisplayState.js -------------------------------------------------------------

// import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

const bulletStyle = {
    "font-size": "1.2em",
    "top": "0.1em",
    "position": "relative"
}

const DisplayStateComponent = (props) => (
    <div>
        <p>
            <strong>{props.label}:</strong> {props.value}
            <span style={bulletStyle}>{props.value === true ? "\uD83D\uDD35" : ""}</span>
            <span style={bulletStyle}>{props.value === false ? "\u26aa" : ""}</span>
        </p>
    </div >
)

// DisplayState.propTypes = {
//   userType: PropTypes.string.isRequired
// }

const DisplayStateComponentMapStateToProps = (state, ownProps) => {
    let label = ""
    let value = ""
    switch (ownProps.type) {
        case "userType":
            label = "User type"
            value = state.user.userType
            break
        case "area":
            label = "Area"
            value = state.message.area
            break
        case "yrwk":
            label = "Week"
            value = state.message.yrwk
            break
        case "status":
            label = "Status"
            value = state.message.status
            break
        case "data":
            label = "Data"
            value = (state.message.data !== null)
            break
        case "editable":
            label = "Editable"
            value = state.app.editable
            break
        default:
            label = "Status"
            value = state.message.status
    }
    return {
        label: label,
        value: value
    }
}

const DisplayState = connect(
    DisplayStateComponentMapStateToProps
)(DisplayStateComponent)


// reducers ====================================================================
// =============================================================================

// index.js --------------------------------------------------------------------

// import { combineReducers } from 'redux'
// import user from './userReducer'
// import message from './messageReducer'
// import app from './appReducer'

const rootReducer = combineReducers({
    user,
    message,
    app
})

// export default rootReducer

// appReducer.js ---------------------------------------------------------------

// import initialState from '../constants/initialState'
// import { EDIT_TOGGLE, EDIT_ON, EDIT_OFF } from '../actions/types'

// Reducer

const appReducer = (state = initialState.app, action) => {
    switch (action.type) {
        case EDIT_TOGGLE:
            return {
                ...state,
                editable: !state.editable
            }
        case EDIT_ON:
            return {
                ...state,
                editable: action.editable
            }
        case EDIT_OFF:
            return {
                ...state,
                editable: action.editable
            }
        default:
            return {
                ...state,
                editable: false
            }
    }
}

// export default appReducer

// messageReducer.js -----------------------------------------------------------

// import initialState from '../constants/initialState'
// import { CHANGE_STATUS, GO_HOME, SET_AREA, SET_YRWK, LOAD_DATA } from '../actions/types'
// import config from '../config'
// import { readDataFromSource } from '../utility'
// import { lookupStatus } from '../utility'
// import { initialData } from '../config/initialData'

// Reducer

const messageReducer = (state = initialState.message, action) => {
    switch (action.type) {
        case CHANGE_STATUS:
            return {
                ...state,
                status: action.status
            }
        case GO_HOME:
            return {
                ...state,
                area: action.area
            }
        case SET_AREA:
            let getData = readDataFromSource(config.dataSource, initialData, action.area, state.yrwk)
            return {
                ...state,
                area: action.area,
                status: lookupStatus(getData),
                data: getData
            }
        case SET_YRWK:
            return {
                ...state,
                yrwk: action.yrwk
            }
        case LOAD_DATA:
            return {
                ...state,
                data: action.data
            }
        default:
            return state
    }
}

// export default messageReducer

// userReducer.js --------------------------------------------------------------

// import initialState from '../constants/initialState'
// import { SET_USER_TYPE } from '../actions/types'

// Reducer

const userMessage = (state = initialState.user, action) => {
    switch (action.type) {
        case SET_USER_TYPE:
            return {
                ...state,
                userType: action.userType
            }
        default:
            return state
    }
}

// export default userMessage

// Main ========================================================================
// =============================================================================

// index.js ------------------------------------------------------------------

// import React from 'react'
// import ReactDOM from 'react-dom'
// import { render } from 'react-dom'
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'
// import App from './components/App'
// import rootReducer from './reducers'

// Import actions
// import {
//     setUserType, changeStatus, goHome, setArea, setYrwk, editToggle, editOn, editOff, loadData
// } from './actions/'
// import { UserTypes, StatusTypes } from './constants/stateTypes'
const { viewer, contributor, reviewer } = UserTypes
const { draft, review, published } = StatusTypes

// Create the store
const store = createStore(rootReducer)

// Log the initial state
console.log(store.getState())

// Log all changes to the state
const unsubscribe = store.subscribe( () => {
    console.log(store.getState())
})

// Actions
// store.dispatch(setUserType(contributor))
// store.dispatch(changeStatus(draft))
// store.dispatch(setArea("Area 01"))
// store.dispatch(setYrwk("Week 01 - 2018"))
// store.dispatch(loadData(StatusTypes))
// store.dispatch(editToggle())
// store.dispatch(editToggle())

// unsubscribe()

//Call to run the app
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

// index.html --------------------------------------------------------------------

// <!doctype html>
// <html lang="en">
//     <head>
// 		<meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1">
//         <title>Weekly Message</title>
//         <link rel="stylesheet" href="styles/style.css" />
//     </head>
//
//     <body>
//         <div id="root"></div>
//     </body>
// </html>
