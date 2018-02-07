import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) => {
	let invertClass = props.invert ? " invert " : ""
	return (
		<button type="button" className={"Button " + invertClass + props.color} id={props.id} title={props.text} aria-label={props.text} onClick={props.onClick}  role="button" aria-pressed="false">
			<i className="material-icons">{props.icon}</i>
		</button>
	)
}

export default Button
