import React from 'react'
import PropTypes from 'prop-types'
import Bar from '.../generic/Bar'

const MessageBrandingBar = (props) => {
	if (!props.show) {
		return null
	}
	return (
		<Bar id="MessageBrandingBar">
			<div id="CurrentAreaTitle">
				<h3>{props.area}</h3>
				<h4>{props.areaTitle}</h4>
			</div>
			<div className="CurrentAreaIcon">
    			<div className="IconGraphic" style={{background: "url(" + props.areaIcon + ")"}}></div>
            </div>
		</Bar>
	)
}

export default MessageBrandingBar
