import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import StateButton from '../components/StateButton'

const mapStateToProps = (state, ownProps) => {
    let passedName = ownProps.type !== null ? ownProps.type : ownProps.name
    return {
        name: passedName,
        input: ownProps.type,
        prevUserType: state.user.type
    }
}

const mapDispatchTopProps = (dispatch, ownProps) => {
    return {
        onButtonClick: value => {
            dispatch(ownProps.action(value))
        }
    }
}

const ChangeState = connect(mapStateToProps, mapDispatchTopProps)(StateButton)

export default ChangeState
