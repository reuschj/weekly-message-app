import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// Import components
import Button from '../../generic/Button'
// Import actions
import { goHome } from '../../../actions'

class HomeButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Sets area to home screen
	handleClick() {
		this.props.goHome()
	}
	render() {
		return (
			<Button id="HomeButton" icon="home" text="Home" invert={this.props.active} color="blue" onClick={this.handleClick} />
		)
	}
}

const mapStateToProps = (state) => {
    return {
        editable: state.app.editable
	}
}

const mapDispatchTopProps = (dispatch) => {
    return {
        goHome: () => {
            dispatch(goHome())
        }
    }
}

export default connect(mapStateToProps, mapDispatchTopProps)(HomeButton)
