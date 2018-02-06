import React from 'react'
import PropTypes from 'prop-types'
// Import components
import FormSelect from '../generic/FormSelect'
// Import config
import config from '.../config'
// Import utilities
import { getAreas } from '.../utility'

class YrWkSelect extends React.Component {
	constructor(props) {
		super(props)
		this.state = {value: this.value}
		this.handleChange = this.handleChange.bind(this)
	}
	// Calls setYrwk to set the selected week
	handleChange(event) {
		this.setState({value: event.target.value})
		this.props.setYrwkValue(event.target.value)
		this.props.setYrwk(event.target.value)
	}
	render() {
		return (
			<FormSelect
				id={"YrWkSelect"}
				label={"Week"}
				optionList={getWeeks(config.weekInfo.weeks)}
				selectedIndex={config.weekInfo.current}
				handleChange={this.handleChange}
				value={this.state.value} />
		)
	}
}

const mapStateToProps = (state) => {
    return {
        yrwk: state.message.yrwk,
		value: state.components.YrWkSelect.value
    }
}

const mapDispatchTopProps = (dispatch) => {
    return {
        setYrwk: value => {
            dispatch(setYrwk(value))
        },
		setYrwkValue: value => {
            dispatch(setYrwkValue(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchTopProps)(YrWkSelect)
