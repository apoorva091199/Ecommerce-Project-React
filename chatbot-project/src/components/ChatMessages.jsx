
import {  useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";
function ChatMessages({ chatMessages }) {
  const chatMessagesEndRef = useRef(null);
  useEffect(() => {
    const containerElem = chatMessagesEndRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);
  return (
    <>
      <div className="chat-messages-container" ref={chatMessagesEndRef}>
        {chatMessages.map((chatMessage) => {
          return (
            <ChatMessage
              message={chatMessage.message}
              sender={chatMessage.sender}
              key={chatMessage.id}
            />
          );
        })}
      </div>
    </>
  );
}

export default ChatMessages;