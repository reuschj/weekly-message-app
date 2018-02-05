import React from 'react'
import PropTypes from 'prop-types'
import Button from '.../generic/Button'
import saveEditorContent from '..../utility'

class SaveButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Saves to the source. Does not set the data in the state (since this would update the component). When the component updates, it will pull the latest saved data from the source into the state and load that.
	handleClick() {
		saveEditorContent()
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
