import './styles.css'

const Notification = ({ message, success }) => {
    if(message === null) return null
    else return (
        <h2 className={ success ? "success-notification" : "error-notification"}>
            {message}
        </h2>
    ) 
}

export default Notification