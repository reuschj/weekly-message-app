import Button from '..../generic/Button'
import changeStatus from '...../actions'

class UnpublishButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Changes status back to review
	handleClick() {
		let newStatus = "Review"
		changeStatus(newStatus)
	}
	render() {
		if (!this.props.show) {
			return null
		}
		return (
			<Button id="UnpublishButton" icon="assignment_return" text="Unpublish" invert={false} color="red" onClick={this.handleClick} />
		)
	}
}

export default UnpublishButton
