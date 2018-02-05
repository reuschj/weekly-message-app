import React from 'react'
import PropTypes from 'prop-types'
import Button from '.../generic/Button'
import destroyEditors from '..../utility'
import editToggle from '..../actions'

class CancelButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Toggles edit mode off, but doesn't save. It calls for CKE editors to be unloaded. Then toggles edit off/on.
	handleClick() {
		destroyEditors(this)
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
