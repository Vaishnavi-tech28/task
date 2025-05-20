import React from "react";

const Message = ({ message }) => {
  return (
    <div
      className={`max-w-xl px-4 py-2 rounded-lg text-white break-words whitespace-pre-wrap w-fit max-w-[80%] leading-relaxed ${
        message.role === "user"
          ? "bg-blue-500 self-end ml-auto"
          : "bg-blue-900 self-start"
      }`}
    >
      {message.text && <p>{message.text}</p>}
      {message.image && (
        <img
          src={message.image}
          alt="User Upload"
          className="mt-2 max-w-xs rounded-lg"
        />
      )}
      {message.voice && (
        <audio
          controls
          src={URL.createObjectURL(message.voice)}
          className="mt-2"
        />
      )}
    </div>
  );
};

export default Message;
