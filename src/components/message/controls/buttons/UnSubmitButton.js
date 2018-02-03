import Button from '..../generic/Button'
import changeStatus from '...../actions'

class UnSubmitButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Changes status to back to draft
	handleClick() {
		let newStatus = "Draft"
		changeStatus(newStatus)
	}
	render() {
		if (!this.props.show) {
			return null
		}
		return (
			<Button id="UnSubmitButton" icon="assignment_return" text="Return to Contributor" invert={false} color="red" onClick={this.handleClick} />
		)
	}
}

export default UnSubmitButton
