import React from 'react'
// import PropTypes from 'prop-types'

// Bootstrap column
const ColumnNarrow = (props) => {
	return (
		<div className={"col col-sm-5 col-md-4"}>
			{props.children}
		</div>
	)
}

export default ColumnNarrow
