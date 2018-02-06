import React from 'react'
import PropTypes from 'prop-types'
// Import components
import Button from '.../generic/Button'
// Import utilities
import destroyEditors from '..../utility'
// Import actions
import editToggle from '..../actions'

class CancelButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Toggles edit mode off, but doesn't save. It calls for CKE editors to be unloaded. Then toggles edit off/on.
	handleClick() {
		destroyEditors(this)
		.then(function() {
			editToggle()
		})
	}
	render() {
		if (!this.props.show || !this.props.isEditable) {
			return null
		}
		return (
			<Button id="CancelButton" icon="cancel" text="Cancel without Saving (not working)" color="red" onClick={this.handleClick} />
		)
	}
}

const mapStateToProps = (state) => {
    return {
        area: state.message.area,
		value: state.components.AreaSelect.value
    }
}

const mapDispatchTopProps = (dispatch) => {
    return {
        setArea: value => {
            dispatch(setArea(value))
        },
		setAreaValue: value => {
            dispatch(setAreaValue(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchTopProps)(AreaSelect)
