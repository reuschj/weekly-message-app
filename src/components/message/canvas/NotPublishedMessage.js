import React from 'react'
import PropTypes from 'prop-types'
import Container from '.../generic/Container'

const NotPublishedMessage = (props) => {
	if (!props.show) {
		return null
	}
	return (
		<Container>
			<div id="NotPublishedMessage">
				<h4>Sorry! There is no message published for {props.area} this week. :(</h4>
			</div>
		</Container>
	)
}

export default NotPublishedMessage
