import React from 'react';
// import PropTypes from 'prop-types'
// Import components
import MessageHeaderBar from './bars/MessageHeaderBar';
import MessageSelectionBar from './bars/MessageSelectionBar';
import MessageStatusBar from './bars/MessageStatusBar';
import MessageBrandingBar from './bars/MessageBrandingBar';
import MessageEditBar from './bars/MessageEditBar';
import HomeScreen from './canvas/HomeScreen';
import NotPublishedMessage from './canvas/NotPublishedMessage';
import MessageCanvas from './canvas/MessageCanvas';
// Import utilities
import { destroyEditors } from '../../utility';

// This is the primary control center for most states and fuctions
class Message extends React.Component {
	// Before component updates, this checks that if edit mode is on and
	// will not be toggled off by the update.
	// If not, it unloads the CKE editors and uses editToggle
	// to enforce that edit mode is off on the update.
	async componentWillUpdate(nextProps) {
		if (this.props.editable && nextProps.editable) {
			await destroyEditors(this.props.editable);
			this.props.editOff();
			console.log('Toggled edit off before update!');
		}
	}
	render() {
		const permissions = this.props.permissions;
		return (
			<div id="MessageContainer">
				<MessageHeaderBar />
				<MessageSelectionBar
					show={!this.props.editable}
					homeActive={!permissions.isData || this.props.area === 'HomeScreen'}
				/>
				<MessageStatusBar
					show={permissions.isData && permissions.allowViewStatus}
					allowEdit={permissions.isData && permissions.allowEdit}
					allowViewStatus={permissions.allowViewStatus}
				/>
				<MessageBrandingBar
					show={permissions.isData}
				/>
				<MessageEditBar
					show={permissions.isData && permissions.allowEdit && this.props.editable}
					allowSave={permissions.allowSave}
					allowSubmit={permissions.allowSubmit}
					allowUnSubmit={permissions.allowUnSubmit}
					allowPublish={permissions.allowPublish}
					allowUnPublish={permissions.allowUnPublish}
				/>
				<HomeScreen
                    show={!permissions.isData || this.props.area === 'HomeScreen'}
				/>
                <NotPublishedMessage
                    show={permissions.isData && !permissions.allowView}
                />
				<MessageCanvas
					show={permissions.isData && permissions.allowView}
					isLocked={permissions.isLocked}
				/>
			</div>
		);
	}
}

export default Message;
