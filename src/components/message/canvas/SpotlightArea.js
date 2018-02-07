import React from 'react'
import PropTypes from 'prop-types'
// Import components
import HtmlContent from '../../generic/HtmlContent'

const SpotlightArea = (props) => {
	return (
		<div id="SpotlightArea" className="alert alert-info">
			<h2>
				<i className="material-icons">search</i>
				<span className="titleCopy">Spotlight</span>
			</h2>
			<HtmlContent
				content={props.content}
				id={props.contentID}
			/>
		</div>
	)
}

export default SpotlightArea
