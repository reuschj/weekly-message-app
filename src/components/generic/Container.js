import React from 'react'
import PropTypes from 'prop-types'

// Bootstrap container
const Container = (props) => {
	return (
		<div className={"container"}>
			{props.children}
		</div>
	)
}

export default Container
