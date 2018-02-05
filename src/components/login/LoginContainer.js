import React from 'react'
import PropTypes from 'prop-types'
import LoginBar from './LoginBar'
import MessageContainer from '../message/MessageContainer'

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
