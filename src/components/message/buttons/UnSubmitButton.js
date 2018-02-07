import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// Import components
import Button from '../../generic/Button'
// Import actions
import { changeStatus } from '../../../actions'
// Import user/status types
import { StatusTypes } from '../../../constants/stateTypes'
const { draft, review, published } = StatusTypes

class UnSubmitButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Changes status to back to draft
	handleClick() {
		changeStatus(draft)
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

const mapStateToProps = (state) => {
    return {
        status: state.message.status
	}
}

const mapDispatchTopProps = (dispatch) => {
    return {
        changeStatus: value => {
            dispatch(changeStatus(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchTopProps)(UnSubmitButton)
