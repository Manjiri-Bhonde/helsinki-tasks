const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div style={{border:message.toLowerCase().includes("error")?"solid red 1px":"dashed green 2px"}}>{message}</div>;
};

export default Notification;
