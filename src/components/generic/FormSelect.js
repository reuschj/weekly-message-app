import React from 'react'
import PropTypes from 'prop-types'

class FormSelect extends React.Component {
	constructor(props) {
		super(props)
		this.generateOptions = this.generateOptions.bind(this)
	}
	// Generates a list of menu options given an input list. Optional: chose a default selected index.
	generateOptions(inputList, selectedIndex = 0) {
		const output = inputList.map((item, index) =>
			<option selected={index === selectedIndex ? "selected" : null} key={item} value={item}>{item}</option>
		)
		return output
	}
	render() {
		let inputList =  this.props.optionList
		let selectedIndex = this.props.selectedIndex
		return (
			<form className="FormSelect form-group" id={this.props.id}>
				<label>{this.props.label}</label>
				<select className="form-control" value={this.props.value} onChange={this.props.handleChange}>
					{this.generateOptions(inputList, selectedIndex)}
				</select>
			</form>
		)
	}
}

export default FormSelect
