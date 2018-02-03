import Container from '.../generic/Container'
import Row from '.../generic/Row'
import ColumnNarrow from '.../generic/ColumnNarrow'
import ColumnWide from '.../generic/ColumnWide'
import HtmlContent from '.../generic/HtmlContent'
import DMMArea from './DMMArea'
import SpotlightArea from './SpotlightArea'
// Import utilities
import loadCKEditors from '..../utilty'
import getContentFromData from '..../utilty'

class MessageCanvas extends React.Component {
	constructor(props) {
		super(props)
	}
	// Loads the CKE editors after an update if edit mode is on and message is not locked (published)
	componentDidUpdate() {
		console.log("MessageCanvas just updated.")
		if (this.props.isEditable && !this.props.isLocked) {
			// Load CKE Editor
			loadCKEditors()
		}
	}
	render() {
		if (!this.props.show) {
			return null
		}
		return (
			<Container>
				<div id="MessageCanvas">
					<Row>
						<ColumnWide>
							<HtmlContent
								content={getContentFromData(this.props.data, "MSGBOX1")}
								id={"MSGBOX1"}
							/>
						</ColumnWide>
						<ColumnNarrow>
							<DMMArea
								image={getContentFromData(this.props.data, "IMG_FILE1")}
								imageID={"IMG_FILE1"}
								name={getContentFromData(this.props.data, "NAMEBOX1")}
								nameID={"NAMEBOX1"}
								title={getContentFromData(this.props.data, "TITLEBOX1")}
								titleID={"TITLEBOX1"}
							/>
						</ColumnNarrow>
					</Row>
					<Row>
						<ColumnWide>
							<HtmlContent
								content={getContentFromData(this.props.data, "deptMess1")}
								id={"deptMess1"}
							/>
						</ColumnWide>
						<ColumnNarrow>
							<SpotlightArea
								content={getContentFromData(this.props.data, "MSGBOX2")}
								contentID={"MSGBOX2"}
							/>
						</ColumnNarrow>
					</Row>
				</div>
			</Container>
		)
	}
}

export default MessageCanvas
