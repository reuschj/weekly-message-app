import React from 'react'
import PropTypes from 'prop-types'

const MaterialFloatingButton = (props) => {
	return (
		<button type="button" className={"mdc-fab material-icons"} id={props.id} title={props.text} aria-label={props.text} onClick={props.onClick}>
			<span className={"mdc-fab__icon"}>
				{props.icon}
			</span>
		</button>
	)
}

export default MaterialFloatingButton
