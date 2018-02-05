import React from 'react'
import PropTypes from 'prop-types'
// Import components
import MessageHeaderBar from './bars/MessageHeaderBar'
import MessageSelectionBar from './bars/MessageSelectionBar'
import MessageStatusBar from './bars/MessageStatusBar'
import MessageBranding from './bars/MessageBranding'
import MessageEditBar from './bars/MessageEditBar'
import HomeScreen from './canvas/HomeScreen'
import NotPublishedMessage from './canvas/NotPublishedMessage'
import MessageCanvas from './canvas/MessageCanvas'
// Import constants
import config from '../config'
// Import utilities
import { lookupAreaInfo, destroyEditors } from '../utilty'

// This is the primary control center for most states and fuctions
class Message extends React.Component {
	constructor(props) {
		super(props)
	}
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
					area={this.props.area}
				/>
				<MessageStatusBar
					show={this.props.permissions.isData && this.props.permissions.allowViewStatus}
					allowEdit={this.props.permissions.isData && this.props.permissions.allowEdit}
					allowViewStatus={this.props.permissions.allowViewStatus}
					status={this.props.status}
					editable={this.props.editable}
				/>
				<MessageBrandingBar
					show={this.props.permissions.isData}
					area={this.props.area}
					areaTitle={lookupAreaInfo(this.props.area, "title", config.areaInfo)}
					areaIcon={lookupAreaInfo(this.props.area, "icon", config.areaInfo)}
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
					area={this.props.area}
                />
				<MessageCanvas
					show={this.props.permissions.isData && this.props.permissions.allowView}
					isLocked={this.props.permissions.isLocked}
					data={this.props.data}
					userType={this.props.userType}
					editable={this.props.editable}
				/>
			</div>
		)
	}
}

export default Message
