import Button from '..../generic/Button'
import changeStatus from '...../actions'

class SubmitButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Changes status to review
	handleClick() {
		let newStatus = "Review"
		changeStatus(newStatus)
	}
	render() {
		if (!this.props.show) {
			return null
		}
		return (
			<Button id="SubmitButton" icon="send" text="Submit for Review" invert={false} color="blue" onClick={this.handleClick} />
		)
	}
}

export default SubmitButton
