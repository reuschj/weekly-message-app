import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// Import components
import Bar from '../../generic/Bar'
// Import constants
import config from '../../../config'
// Import utilities
import { lookupAreaInfo } from '../../../utility'

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

const mapStateToProps = (state) => {
    return {
        area: state.message.area,
		areaTitle: lookupAreaInfo(state.message.area, "title", config.areaInfo),
		areaIcon: lookupAreaInfo(state.message.area, "icon", config.areaInfo)
	}
}

export default connect(mapStateToProps)(MessageBrandingBar)
