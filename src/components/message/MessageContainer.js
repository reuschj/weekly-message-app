// Import components
import MessageHeaderBar from './controls/bars/MessageHeaderBar'
import MessageSelectionBar from './controls/bars/MessageSelectionBar'
import MessageStatusBar from './controls/bars/MessageStatusBar'
import MessageBranding from './controls/bars/MessageBranding'
import MessageEditBar from './controls/bars/MessageEditBar'
import HomeScreen from './canvas/HomeScreen'
import NotPublishedMessage from './canvas/NotPublishedMessage'
import MessageCanvas from './canvas/MessageCanvas'
// Import constants
import config from '../config'
// Import actions
import setArea from '../actions'
import setYrwk from '../actions'
import goHome from '../actions'
import changeStatus from '../actions'
import loadData from '../actions'
import editToggle from '../actions'
import editOn from '../actions'
import editOff from '../actions'
// Import utilities
import lookupAreaInfo from '../utility'
import destroyEditors from '../utilty'
import readDataFromSource from '../utilty'
import writeDataToSource from '../utilty'
import lookupStatus from '../utilty'
import updateStatusinData from '../utilty'

// This is the primary control center for most states and fuctions
class MessageContainer extends React.Component {
	constructor(props) {
		super(props)
		this.setArea = this.setArea.bind(this)
		this.setYrwk = this.setYrwk.bind(this)
		this.editToggle = this.editToggle.bind(this)
		this.changeStatus = this.changeStatus.bind(this)
		this.setPermissions = this.setPermissions.bind(this)
	}
	// This returns an object with various permissions, set based on the current state/props. These are passed down to show/hide buttons based on user type / status, etc.
	setPermissions() {
		let newPermissions = {
			isData: false,
			isLocked: false,
			allowView: false,
			allowViewStatus: false,
			allowEdit: false,
			allowSave: false,
			allowSubmit: false,
			allowPublish: false,
			allowUnPublish: false
		}
		// Tells components if data is loaded to the state
		if (this.props.data !== null && this.props.data !== undefined) {
			newPermissions.isData = true
		}
		// This tells components that a message is locked (can't turn on edit mode) once it's published.
		if (this.props.status === "Published") {
			newPermissions.isLocked = true
		}
		// This sets viewability of the message depending on viewer type and state. Viewers can't see it unless it's published.
		if (this.props.userType === "Contributor" || this.props.userType === "Reviewer") {
			newPermissions.allowView = true
		} else if (this.props.userType === "Viewer" && this.props.status === "Published") {
			newPermissions.allowView = true
		}
		// This ensures that only contributors and reviewers can see the edit status bar. It will be hidden from viewers.
		if (this.props.userType === "Contributor" || this.props.userType === "Reviewer") {
			newPermissions.allowViewStatus = true
		}
		// This sets permissions to edit based on user type and status.
		// Contributors can only edit in draft status. Reviewers can only edit in review or published status. Viewers cannot edit.
		if (this.props.userType === "Contributor" && this.props.status === "Draft") {
			newPermissions.allowEdit = true
		} else if (this.props.userType === "Reviewer" && (this.props.status === "Review" || this.props.status === "Published")) {
			newPermissions.allowEdit = true
		}
		// Contributors can only save draft status. Reviewers can only save in review status.
		if (this.props.userType === "Contributor" && this.props.status === "Draft") {
			newPermissions.allowSave = true
		} else if (this.props.userType === "Reviewer" && this.props.status === "Review") {
			newPermissions.allowSave = true
		}
		// Only contributors can submit for review.
		if (this.props.userType === "Contributor" && this.props.status === "Draft") {
			newPermissions.allowSubmit = true
		}
		// Only reviewers can return a message back to draft (from review)
		if (this.props.userType === "Reviewer" && this.props.status === "Review") {
			newPermissions.allowUnSubmit = true
		}
		// Only reviewers can publish (in review status)
		if (this.props.userType === "Reviewer" && this.props.status === "Review") {
			newPermissions.allowPublish = true
		}
		// Only reviewers can unpublish (in publish status)
		if (this.props.userType === "Reviewer" && this.props.status === "Published") {
			newPermissions.allowUnPublish = true
		}
		return newPermissions
	}
	// Before component updates, this checks that if edit mode is on and will not be toggled off by the update. If not, it unloads the CKE editors and uses editToggle to enforce that edit mode is off on the update.
	componentWillUpdate(nextProps{
		if (this.props.editable && nextProps.editable) {
			destroyEditors(this)
			editOff()
			console.log("Toggled edit off before update!")
		}
	}
	render() {
		let permissions = this.setPermissions()
		return (
			<div id="MessageContainer">
				<MessageHeaderBar />
				<MessageSelectionBar
					show={!this.props.editable}
					homeActive={!permissions.isData || this.props.area === "HomeScreen"}
					area={this.props.area}
				/>
				<MessageStatusBar
					show={permissions.isData && permissions.allowViewStatus}
					allowEdit={permissions.isData && permissions.allowEdit}
					allowViewStatus={permissions.allowViewStatus}
					status={this.props.status}
					editable={this.props.editable}
				/>
				<MessageBrandingBar
					show={permissions.isData}
					area={this.props.area}
					areaTitle={lookupAreaInfo(this.props.area, "title", config.areaInfo)}
					areaIcon={lookupAreaInfo(this.props.area, "icon", config.areaInfo)}
				/>
				<MessageEditBar
					show={permissions.isData && permissions.allowEdit && this.props.editable}
					allowSave={permissions.allowSave}
					allowSubmit={permissions.allowSubmit}
					allowUnSubmit={permissions.allowUnSubmit}
					allowPublish={permissions.allowPublish}
					allowUnPublish={permissions.allowUnPublish}
				/>
				<HomeScreen
                    show={!permissions.isData || this.props.area === "HomeScreen"}
                />
                <NotPublishedMessage
                    show={permissions.isData && !permissions.allowView}
					area={this.props.area}
                />
				<MessageCanvas
					show={permissions.isData && permissions.allowView}
					isLocked={permissions.isLocked}
					data={this.props.data}
					userType={this.props.userType}
					editable={this.props.editable}
				/>
			</div>
		)
	}
}

export default MessageContainer
