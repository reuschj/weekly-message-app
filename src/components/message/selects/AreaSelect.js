import React from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
// Import components
import FormSelect from '../../generic/FormSelect';
// Import config
import config from '../../../config';
// Import actions
import { setArea, setAreaValue } from '../../../actions';
// Import utilities
import { getAreas } from '../../../utility';

class AreaSelect extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	// If component will update and home becomes active,
	// changes the selection to no area selected message.
	componentWillUpdate(nextProps) {
		if (!this.props.homeActive && nextProps.homeActive) {
			this.props.setAreaValue(config.defaults.noAreaSelected);
		}
	}

	// Calls setArea to set the selected area
	handleChange(event) {
		this.props.setAreaValue(event.target.value);
		this.props.setArea(event.target.value);
	}

	render() {
		return (
			<FormSelect
				id={'AreaSelect'}
				label={'Area'}
				optionList={getAreas(config.areaInfo)}
				selectedIndex={0}
				handleChange={this.handleChange}
				value={this.props.value}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
    area: state.message.area,
	value: state.components.AreaSelect.value
});

const mapDispatchTopProps = (dispatch) => ({
	setArea: value => {
		dispatch(setArea(value));
	},
	setAreaValue: value => {
		dispatch(setAreaValue(value));
	}
});

export default connect(mapStateToProps, mapDispatchTopProps)(AreaSelect);
