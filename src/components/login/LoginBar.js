import React from 'react'
import PropTypes from 'prop-types'
import Bar from '../generic/Bar'
import Button from '../generic/Button'
// import LoginControl from '.LoginControl'

import { UserTypes, StatusTypes } from '.../constants/stateTypes'
const { viewer, contributor, reviewer } = UserTypes
const { draft, review, published } = StatusTypes

const LoginBar = (props) => {
	return (
		<Bar id="LoginBar">
			<LoginStatus userType={props.userType} />
			<LoginButton userType={props.userType} setUserType={props.setUserType} />
		</Bar>
	)
}

const LoginStatus = (props) => {
	return (
		<div className="LoginStatus">
			<span className="statusLabel">Type:</span>
			{props.userType}
		</div>
	)
}

class LoginButton extends React.Component {
	constructor(props) {
		super(props)
		this.styleButton = this.styleButton.bind(this)
	}
	styleButton() {
		switch (this.props.userType) {
			case contributor:
				return {
					color: "green",
					icon: "account_circle"
				}
			case reviewer:
				return {
					color: "orange",
					icon: "account_box"
				}
			default:
				return {
					color: "blue",
					icon: "remove_red_eye"
				}
		}
	}
	render() {
		let conditionalProps = this.styleButton();
		return (
			<Button
				id="LoginButton"
				icon={conditionalProps.icon}
				text="Change User Type"
				color={conditionalProps.color}
				invert={true}
				onClick={this.props.setUserType}
			/>
		)
	}
}

export default LoginBar
