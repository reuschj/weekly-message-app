import React from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
// Import components
import Bar from '../../generic/Bar';
import EditButton from '../buttons/EditButton';
import CancelButton from '../buttons/CancelButton';

class MessageStatusBar extends React.Component {
	render() {
		if (!this.props.show) {
			return null;
		}
		let barClass = '';
		if (this.props.editable) {
			barClass = 'editable';
		}
		return (
			<Bar id="MessageStatusBar" addClass={barClass}>
				<StatusIndicator
					show={this.props.allowViewStatus}
					allowEdit={this.props.allowEdit}
					status={this.props.status}
				/>
				<EditButton
					show={this.props.allowEdit}
				/>
				<CancelButton
					show={this.props.allowEdit}
				/>
			</Bar>
		);
	}
}

const StatusIndicator = (props) => {
    if (!props.show) {
        return null;
    }
    let lockoutMessage = '';
    if (!props.allowEdit) {
        lockoutMessage = '(You cannot edit during this stage.)';
    }
    return (
        <div className="StatusIndicator">
            <span className="status">{props.status}</span>
            <span className="lockoutMessage">{lockoutMessage}</span>
        </div>
    );
};

const mapStateToProps = (state) => ({
	status: state.message.status,
	editable: state.app.editable
});

export default connect(mapStateToProps)(MessageStatusBar);
