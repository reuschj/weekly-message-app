// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// Import components
import Message from './Message'
// Import actions
import { setArea, setYrwk, goHome, changeStatus, loadData, editToggle, editOn, editOff } from '../../actions'
// Import user/status types
import { UserTypes, StatusTypes } from '../../constants/stateTypes'
const { viewer, contributor, reviewer } = UserTypes
const { draft, review, published } = StatusTypes

// This returns an object with various permissions, set based on the current state/props. These are passed down to show/hide buttons based on user type / status, etc.
const setPermissions = (state) => {
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
    // Define shorthand for state
    let userType = state.user.userType
    let status = state.message.status
    let data = state.message.data
    // Tells components if data is loaded to the state
    if (data !== null && data !== undefined) {
        newPermissions.isData = true
    }
    // This tells components that a message is locked (can't turn on edit mode) once it's published.
    if (status === published) {
        newPermissions.isLocked = true
    }
    // This sets viewability of the message depending on viewer type and state. Viewers can't see it unless it's published.
    if (userType === contributor || userType === reviewer) {
        newPermissions.allowView = true
    } else if (userType === viewer && status === published) {
        newPermissions.allowView = true
    }
    // This ensures that only contributors and reviewers can see the edit status bar. It will be hidden from viewers.
    if (userType === contributor || userType === reviewer) {
        newPermissions.allowViewStatus = true
    }
    // This sets permissions to edit based on user type and status.
    // Contributors can only edit in draft status. Reviewers can only edit in review or published status. Viewers cannot edit.
    if (userType === contributor && status === draft) {
        newPermissions.allowEdit = true
    } else if (userType === reviewer && (status === review || status === published)) {
        newPermissions.allowEdit = true
    }
    // Contributors can only save draft status. Reviewers can only save in review status.
    if (userType === contributor && status === draft) {
        newPermissions.allowSave = true
    } else if (userType === reviewer && status === review) {
        newPermissions.allowSave = true
    }
    // Only contributors can submit for review.
    if (userType === contributor && status === draft) {
        newPermissions.allowSubmit = true
    }
    // Only reviewers can return a message back to draft (from review)
    if (userType === reviewer && status === review) {
        newPermissions.allowUnSubmit = true
    }
    // Only reviewers can publish (in review status)
    if (userType === reviewer && status === review) {
        newPermissions.allowPublish = true
    }
    // Only reviewers can unpublish (in publish status)
    if (userType === reviewer && status === published) {
        newPermissions.allowUnPublish = true
    }
    return newPermissions
}

const mapStateToProps = (state, ownProps) => {
    return {
        userType: state.user.userType,
        area: state.message.area,
        yrwk: state.message.yrwk,
        status: state.message.status,
        editable: state.app.editable,
        permissions: setPermissions(state)
    }
}

// const mapDispatchTopProps = (dispatch, ownProps) => {
//     return {
//         setArea: value => {
//             dispatch(setArea(value))
//         },
//         setYrwk: value => {
//             dispatch(setYrwk(value))
//         },
//         goHome: () => {
//             dispatch(goHome())
//         },
//         changeStatus: value => {
//             dispatch(changeStatus(value))
//         },
//         loadData: value => {
//             dispatch(loadData(value))
//         },
//         editToggle: () => {
//             dispatch(editToggle())
//         },
//         editOn: () => {
//             dispatch(editOn())
//         },
//         editOff: () => {
//             dispatch(editOff())
//         }
//     }
// }

const MessageContainer = connect(mapStateToProps)(Message)

export default MessageContainer
