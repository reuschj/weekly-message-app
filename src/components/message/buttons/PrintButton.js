import React from 'react'
import PropTypes from 'prop-types'
import Button from '.../generic/Button'

class PrintButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick() {
	}
	render() {
		return (
			<Button id="PrintButton" icon="print" text="Print" invert={false} color="darkBlue" />
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
        editToggle: () => {
            dispatch(editToggle())
        },
		editOff: () => {
            dispatch(editOff())
        }
    }
}

export default connect(mapStateToProps, mapDispatchTopProps)(PrintButton)
