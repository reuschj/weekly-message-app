const UploadImage = (props) => {
    return (
        <img id={props.id} className={props.className} src={props.fileName} />
    )
}

export default UploadImage