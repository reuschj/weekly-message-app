import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// Import components
import Button from '../generic/Button'
// Import actions
import { setUserType } from '../../actions'
// Import config
import config from '../../config'
// Import utility
import { saveUserType } from '../../utility'
// Import user/status types
import { UserTypes } from '../../constants/stateTypes'
const { viewer, contributor, reviewer } = UserTypes

class LoginButton extends React.Component {
	constructor(props) {
		super(props)
        this.styleButton = this.styleButton.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}
	// Sets area to home screen
	handleClick() {
        let nextUserType = ""
        if (this.props.userType === viewer) {
            nextUserType = contributor
        } else if (this.props.userType === contributor) {
            nextUserType = reviewer
        } else if (this.props.userType === reviewer) {
            nextUserType = viewer
        } else {
            nextUserType = viewer
        }
        saveUserType(config.savedUserType, nextUserType)
        this.props.setUserType(nextUserType)
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
				onClick={this.handleClick}
			/>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        userType: state.user.userType
	}
}

const mapDispatchTopProps = (dispatch) => {
    return {
        setUserType: value => {
            dispatch(setUserType(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchTopProps)(LoginButton)
