import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// Import components
import Bar from '../generic/Bar'
import LoginButton from './LoginButton'

const LoginBar = (props) => {
	return (
		<Bar id="LoginBar">
			<LoginStatus userType={props.userType} />
			<LoginButton />
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

const mapStateToProps = (state) => {
    return {
        userType: state.user.userType
	}
}

export default connect(mapStateToProps)(LoginBar)
