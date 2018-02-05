import React from 'react'
import PropTypes from 'prop-types'
import Container from './Container'

const Bar = (props) => {
	var addClass = ""
	if (props.addClass !== undefined) {
		addClass = " " + props.addClass
	}
	return (
		<div className={"Bar" + addClass} id={props.id}>
			<Container>
				{props.children}
			</Container>
		</div>
	)
}

export default Bar
