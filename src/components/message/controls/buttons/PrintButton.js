import Button from '..../generic/Button'

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

export default PrintButton
