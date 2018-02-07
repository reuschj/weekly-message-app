import React from 'react'
// import PropTypes from 'prop-types'
// Import components
import MessageHeaderBar from './bars/MessageHeaderBar'
import MessageSelectionBar from './bars/MessageSelectionBar'
import MessageStatusBar from './bars/MessageStatusBar'
import MessageBrandingBar from './bars/MessageBrandingBar'
import MessageEditBar from './bars/MessageEditBar'
import HomeScreen from './canvas/HomeScreen'
import NotPublishedMessage from './canvas/NotPublishedMessage'
import MessageCanvas from './canvas/MessageCanvas'
// Import utilities
import { destroyEditors } from '../../utility'

// This is the primary control center for most states and fuctions
class Message extends React.Component {
	// Before component updates, this checks that if edit mode is on and will not be toggled off by the update. If not, it unloads the CKE editors and uses editToggle to enforce that edit mode is off on the update.
	componentWillUpdate(nextProps) {
		if (this.props.editable && nextProps.editable) {
			destroyEditors(this.props.editable)
			this.props.editOff()
			console.log("Toggled edit off before update!")
		}
	}
	render() {
		return (
			<div id="MessageContainer">
				<MessageHeaderBar />
				<MessageSelectionBar
					show={!this.props.editable}
					homeActive={!this.props.permissions.isData || this.props.area === "HomeScreen"}
				/>
				<MessageStatusBar
					show={this.props.permissions.isData && this.props.permissions.allowViewStatus}
					allowEdit={this.props.permissions.isData && this.props.permissions.allowEdit}
					allowViewStatus={this.props.permissions.allowViewStatus}
				/>
				<MessageBrandingBar
					show={this.props.permissions.isData}
				/>
				<MessageEditBar
					show={this.props.permissions.isData && this.props.permissions.allowEdit && this.props.editable}
					allowSave={this.props.permissions.allowSave}
					allowSubmit={this.props.permissions.allowSubmit}
					allowUnSubmit={this.props.permissions.allowUnSubmit}
					allowPublish={this.props.permissions.allowPublish}
					allowUnPublish={this.props.permissions.allowUnPublish}
				/>
				<HomeScreen
                    show={!this.props.permissions.isData || this.props.area === "HomeScreen"}
                />
                <NotPublishedMessage
                    show={this.props.permissions.isData && !this.props.permissions.allowView}
                />
				<MessageCanvas
					show={this.props.permissions.isData && this.props.permissions.allowView}
					isLocked={this.props.permissions.isLocked}
				/>
			</div>
		)
	}
}

export default Message
