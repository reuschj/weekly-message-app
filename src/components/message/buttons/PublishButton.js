import React from 'react'
import PropTypes from 'prop-types'
import Button from '.../generic/Button'
import changeStatus from '..../actions'

class PublishButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Changes status to published
	handleClick() {
		let newStatus = "Published"
		changeStatus(newStatus)
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
