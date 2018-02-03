const HtmlContent = (props) => {
	return (
		<div id={props.id} dangerouslySetInnerHTML={{__html: props.content}} />
	)
}

export default HtmlContent
