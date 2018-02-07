import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// Import components
import Button from '../../generic/Button'
// Import utilities
import { saveEditorContent, destroyEditors } from '../../../utility'
// Import actions
import { editToggle, editOff } from '../../../actions'

class EditButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Toggles edit mode. First it saves the current data to source. Then calls for CKE editors to be unloaded. Then toggles edit off/on. Save/unload pass through if edit mode is off.
	handleClick() {
		let editable = this.props.editable
		let editToggle = this.props.editToggle
		saveEditorContent(this.props.editable, this.props.data, this.props.area, this.props.yrwk)
		.then(function() {
			destroyEditors(editable)
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

const mapStateToProps = (state) => {
    return {
		area: state.message.area,
		yrwk: state.message.yrwk,
		data: state.message.data,
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

export default connect(mapStateToProps, mapDispatchTopProps)(EditButton)
