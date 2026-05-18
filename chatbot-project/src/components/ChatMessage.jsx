
import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/user.png";
import "./ChatMessage.css";

export function ChatMessage({ message, sender }) {
  // props is an object that contains all the attributes passed to the component

  //const message = props.message;
  //const sender = props.sender;
  // const { message, sender } = props;
  /*
        if (sender === "chatbot") {
          return (
            <div>
              <img src={RobotProfileImage} width="50" />
              {message}
            </div>
          );
        }
          */

  return (
    <div
      className={
        sender === "user" ? "chat-message-user" : "chat-message-chatbot"
      }
    >
      {sender === "chatbot" && (
        <img src={RobotProfileImage} className="chat-message-avatar" />
      )}
      <div className="chat-message-content">{message}</div>
      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-avatar" />
      )}
    </div>
  );
}
