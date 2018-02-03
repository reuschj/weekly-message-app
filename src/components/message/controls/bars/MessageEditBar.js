import Bar from '..../generic/Bar'
import SaveButton from '../buttons/SaveButton'
import SubmitButton from '../buttons/SubmitButton'
import UnSubmitButton from '../buttons/UnSubmitButton'
import PublishButton from '../buttons/PublishButton'
import UnpublishButton from '../buttons/UnpublishButton'

const MessageEditBar = (props) => {
    if (!this.props.show) {
        return null
    }
    return (
        <Bar id="MessageEditBar">
            <SaveButton
                show={props.allowSave}
                saveEditorContent={props.saveEditorContent}
            />
            <SubmitButton
                show={props.allowSubmit}
                changeStatus={props.changeStatus}
            />
            <UnSubmitButton
                show={props.allowUnSubmit}
                changeStatus={props.changeStatus}
            />
            <PublishButton
                show={props.allowPublish}
                changeStatus={props.changeStatus}
            />
            <UnpublishButton
                show={props.allowUnPublish}
                changeStatus={props.changeStatus}
            />
        </Bar>
    )
}

export default MessageEditBar
