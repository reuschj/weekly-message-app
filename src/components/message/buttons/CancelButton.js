import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// Import components
import Button from '../../generic/Button'
// Import utilities
import { destroyEditors } from '../../../utility'
// Import actions
import { editToggle, editOff } from '../../../actions'

class CancelButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Toggles edit mode off, but doesn't save. It calls for CKE editors to be unloaded. Then toggles edit off/on.
	handleClick() {
		let editOff = this.props.editOff
		destroyEditors(this.props.editable)
		.then(function() {
			editOff()
		})
	}
	render() {
		if (!this.props.show || !this.props.editable) {
			return null
		}
		return (
			<Button id="CancelButton" icon="cancel" text="Cancel without Saving (not working)" color="red" onClick={this.handleClick} />
		)
	}
}

const mapStateToProps = (state) => {
    return {
        editable: state.app.editable
	}
}

const mapDispatchTopProps = (dispatch) => {
    return {
        editToggle: () => {
            dispatch(editToggle())
        },
		editOff: () => {
            dispatch(editOff())
        }
    }
}

export default connect(mapStateToProps, mapDispatchTopProps)(CancelButton)
