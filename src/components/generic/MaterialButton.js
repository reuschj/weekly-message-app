const MaterialButton = (props) => {
	return (
		<button type="button" className={"mdc-button mdc-button--raised"} id={props.id} title={props.text} aria-label={props.text} onClick={props.onClick} data-mdc-auto-init="MDCRipple" role="button" aria-pressed="false">
			<i className="material-icons mdc-button__icon">{props.icon}</i>
			{props.text}
		</button>
	)
}

export default MaterialButton
