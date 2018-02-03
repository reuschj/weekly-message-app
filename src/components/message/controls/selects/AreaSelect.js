import FormSelect from '.../generic'
import getAreas from '..../utility'
import config from '..../config'

class AreaSelect extends React.Component {
	constructor(props) {
		super(props)
		this.state = {value: this.props.area}
		this.handleChange = this.handleChange.bind(this)
	}
	// Calls setArea to set the selected area
	handleChange(event) {
		this.setState({value: event.target.value})
		this.props.setArea(event.target.value)
	}
	// If component will update and home becomes active, changes the selection to no area selected message.
	componentWillUpdate(nextProps) {
		if (!this.props.homeActive && nextProps.homeActive) {
			this.setState({value: config.defaults.noAreaSelected})
			console.log("Changing because Home is active.")
		}
	}
	render() {
		return (
			<FormSelect
				id={"AreaSelect"}
				label={"Area"}
				optionList={getAreas(config.areaInfo)}
				selectedIndex={0}
				handleChange={this.handleChange}
				value={this.state.value} />
		)
	}
}

export default AreaSelect
