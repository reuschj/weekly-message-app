import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const bulletStyle = {
    'font-size': '1.2em',
    top: '0.1em',
    position: 'relative'
}

const DisplayState = props => (
    <div>
        <p>
            <strong>{props.label}:</strong> {props.value}
            <span style={bulletStyle}>
                {props.value === true ? '\uD83D\uDD35' : ''}
            </span>
            <span style={bulletStyle}>
                {props.value === false ? '\u26aa' : ''}
            </span>
        </p>
    </div>
)

// DisplayState.propTypes = {
//   userType: PropTypes.string.isRequired
// };

const mapStateToProps = (state, ownProps) => {
    let label = ''
    let value = ''
    switch (ownProps.type) {
        case 'userType':
            label = 'User type'
            value = state.user.userType
            break
        case 'area':
            label = 'Area'
            value = state.message.area
            break
        case 'yrwk':
            label = 'Week'
            value = state.message.yrwk
            break
        case 'status':
            label = 'Status'
            value = state.message.status
            break
        case 'data':
            label = 'Data'
            value = state.message.data !== null
            break
        case 'editable':
            label = 'Editable'
            value = state.app.editable
            break
        default:
            label = 'Status'
            value = state.message.status
    }
    return {
        label: label,
        value: value
    }
}

export default connect(mapStateToProps)(DisplayState)
