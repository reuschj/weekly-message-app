import React from 'react'
import PropTypes from 'prop-types'
// Import components
import Bar from '.../generic/Bar'
import EditButton from '../buttons/EditButton'
import CancelButton from '../buttons/CancelButton'

class MessageStatusBar extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		if (!this.props.show) {
			return null
		}
		var barClass = ""
		if (this.props.editable) {
			var barClass = "editable"
		}
		return (
			<Bar id="MessageStatusBar" addClass={barClass}>
				<StatusIndicator
					show={this.props.allowViewStatus}
					allowEdit={this.props.allowEdit}
				/>
				<EditButton
					show={this.props.allowEdit}
				/>
				<CancelButton
					show={this.props.allowEdit}
				/>
			</Bar>
		)
	}
}

const StatusIndicator = (props) => {
    if (!this.props.show) {
        return null
    }
    let lockoutMessage = ""
    if (!this.props.allowEdit) {
        lockoutMessage = "(You cannot edit during this stage.)"
    }
    return (
        <div className="StatusIndicator">
            <span className="status">{this.props.status}</span>
            <span className="lockoutMessage">{lockoutMessage}</span>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
		status: state.message.status,
		editable: state.app.editable
	}
}

export default connect(mapStateToProps)(MessageStatusBar)
