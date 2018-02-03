import FormSelect from '.../generic'
import getWeeks from '..../utility'
import config from '..../config'
import setArea from '..../actions'

class YrWkSelect extends React.Component {
	constructor(props) {
		super(props)
		this.state = {value: this.value}
		this.handleChange = this.handleChange.bind(this)
	}
	// Calls setYrwk to set the selected week
	handleChange(event) {
		this.setState({value: event.target.value})
		setArea(event.target.value)
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

export default YrWkSelect
