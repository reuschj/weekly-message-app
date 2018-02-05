import React from 'react'
import PropTypes from 'prop-types'
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
		if (this.props.isEditable) {
			var barClass = "editable"
		}
		return (
			<Bar id="MessageStatusBar" addClass={barClass}>
				<StatusIndicator
					show={this.props.allowViewStatus}
					status={this.props.status}
					allowEdit={this.props.allowEdit}
				/>
				<EditButton
					show={this.props.allowEdit}
					isEditable={this.props.isEditable}
					editToggle={this.props.editToggle}
					saveEditorContent={this.props.saveEditorContent}
					destroyEditors={this.props.destroyEditors}
				/>
				<CancelButton
					show={this.props.allowEdit}
					isEditable={this.props.isEditable}
					editToggle={this.props.editToggle}
					destroyEditors={this.props.destroyEditors}
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

export default MessageStatusBar
