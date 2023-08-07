import "../index.css";

const Notification = ({ notification }) => {
  if (notification === null) return null;
  else
    return (
      <h2 className={notification.isError ? "error-notification" : "success-notification"}>{notification.message}</h2>
    );
};

export default Notification;
