import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// Import components
import Bar from '../../generic/Bar'
import HomeButton from '../buttons/HomeButton'
import AreaSelect from '../selects/AreaSelect'
import YrWkSelect from '../selects/YrWkSelect'
import PrintButton from '../buttons/PrintButton'

const MessageSelectionBar = (props) => {
    if (!props.show) {
        return (
            <Bar id="MessageIsBeingEdited" addClass="editable">
                <h4>You are editing {props.area}.</h4>
            </Bar>
        )
    }
    return (
        <Bar id="MessageSelectionBar">
            <HomeButton
                active={props.homeActive}
            />
            <AreaSelect
                homeActive={props.homeActive}
            />
            <YrWkSelect />
            <PrintButton />
        </Bar>
    )
}

const mapStateToProps = (state) => {
    return {
        area: state.message.area,
		editable: state.app.editable
	}
}

export default connect(mapStateToProps)(MessageSelectionBar)
