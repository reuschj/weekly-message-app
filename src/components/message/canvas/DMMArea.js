import React from 'react'
// import PropTypes from 'prop-types'
// Import components
import UploadImage from '../../generic/UploadImage'

const DMMArea = (props) => {
	return (
		<div id="DMMArea">
			<DMMPhoto
				image={props.image}
				imageID={props.imageID}
				name={props.name}
			/>
			<DMMTitle
				name={props.name}
				nameID={props.nameID}
				title={props.title}
				titleID={props.titleID}
			/>
		</div>
	)
}

const DMMPhoto = (props) => {
	return (
		<div id="DMMPhoto">
			<UploadImage id={props.imageID} className="DMMPhoto" fileName={props.image} name={props.name} />
		</div>
	)
}

const DMMTitle = (props) => {
	return (
		<div id="DMMTitle">
			<div id={props.nameID}>
				<h3>{props.name}</h3>
			</div>
			<div id={props.titleID}>
				<p>{props.title}</p>
			</div>
		</div>
	)
}

export default DMMArea
