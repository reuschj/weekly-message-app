import Button from '..../generic/Button'
import saveEditorContent from '...../utility'
import destroyEditors from '...../utility'
import editToggle from '...../actions'

class EditButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	// Toggles edit mode. First it saves the current data to source. Then calls for CKE editors to be unloaded. Then toggles edit off/on. Save/unload pass through if edit mode is off.
	handleClick() {
		saveEditorContent()
		.then(function() {
			destroyEditors()
		})
		.then(function() {
			editToggle()
		})
	}
	render() {
		if (!this.props.show) {
			return null
		}
		if (this.props.isEditable) {
			return (
				<Button id="EditButton" icon="done" text="Save and Commit Changes" color="blue" onClick={this.handleClick} />
			)
		}
		return (
			<Button id="EditButton" icon="mode_edit" text="Edit" color="orange" onClick={this.handleClick} />
		)
	}
}

export default EditButton
