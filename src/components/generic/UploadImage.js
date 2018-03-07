import React from 'react'
// import PropTypes from 'prop-types'

const UploadImage = (props) => {
    return (
        <img id={props.id} className={props.className} src={props.fileName} alt={props.name} />
    )
}

export default UploadImage
