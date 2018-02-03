const LoginStatus = (props) => {
	return (
		<div className="LoginStatus">
			<span className="statusLabel">Type:</span>
			{props.userType}
		</div>
	)
}

export default LoginStatus
