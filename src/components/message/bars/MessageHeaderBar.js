import React from 'react'
import PropTypes from 'prop-types'
import Bar from '../generic/Bar'

const MessageHeaderBar = (props) => {
	return (
		<Bar id="MessageHeaderBar">
			<h1>
				Weekly Message
				<i className="material-icons spark">message</i>
			</h1>
		</Bar>
	)
}

export default MessageHeader
