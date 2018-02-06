import React from 'react'
import PropTypes from 'prop-types'
// Import components
import LoginContainer from './login/LoginContainer'
import LoginBar from './login/LoginBar'
import MessageContainer from './message/MessageContainer'

const App = () => {
	return (
		<div>
			<LoginBar />
			<MessageContainer />
		</div>
	)
}
