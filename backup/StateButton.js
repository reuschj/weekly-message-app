import React from 'react'
import PropTypes from 'prop-types'

const buttonStyle = {
    display: 'inline-block',
    margin: '0.25em'
}

const StateButton = props => (
    <div style={buttonStyle}>
        <button type="button" onClick={() => props.onButtonClick(props.input)}>
            {props.name}
        </button>
    </div>
)

// Button.propTypes = {
//     name: PropTypes.string.isRequired,
//     onButtonClick: PropTypes.func.isRequired,
//     input: PropTypes.string.isRequired
// };

export default StateButton
