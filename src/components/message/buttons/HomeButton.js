import React from 'react'
import PropTypes from 'prop-types'
import Button from '.../generic/Button'
import goHome from '..../actions'

class HomeButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Sets area to home screen
	handleClick() {
		goHome()
	}
	render() {
		// Toggles button style if home is active
		let isActive = false
		if (this.props.active) {
			isActive = true
		}
		return (
			<Button id="HomeButton" icon="home" text="Home" invert={isActive} color="blue" onClick={this.handleClick} />
		)
	}
}

export default HomeButton
