import React from 'react'
// import PropTypes from 'prop-types'

// Bootstrap column
const ColumnWide = (props) => {
	return (
		<div className={"col col-sm-7 col-md-8"}>
			{props.children}
		</div>
	)
}

export default ColumnWide
