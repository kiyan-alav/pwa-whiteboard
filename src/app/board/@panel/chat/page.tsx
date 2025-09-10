"use client";
import ChatBox from "@/components/common/ChatBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMessages, useSendMessage } from "@/server-stores/features/messages/message.queries";
import {
  useGetMeUser,
} from "@/server-stores/features/users/user.queries";
import { useState } from "react";

function Chat() {
  const { data: messages, isLoading } = useMessages();
  const { data: user } = useGetMeUser();
  const { sendMessage } = useSendMessage();

  const [text, setText] = useState("");

  if (isLoading) return <p>Loading...</p>;

  const formatTime = (dateString: string | Date) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSend = () => {
    if (!text) return;
    if (user) sendMessage({ userId: user._id, message: text });
    setText("");
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 space-y-3 overflow-y-auto chat-scroll max-h-[50vh] h-full">
        {messages?.map((msg) =>
          user?._id === msg.sender._id ? (
            <ChatBox
              imgFallBack={`${user.firstName[0]}${user.lastName[0]}`}
              name={`${user.firstName || ""} ${user.lastName || ""}`}
              profileColor={user.profileColor}
              time={formatTime(msg.createdAt)}
              message={msg.message}
              isMe
              key={msg._id}
            />
          ) : (
            <ChatBox
              imgFallBack={`${msg.sender.firstName[0]}${msg.sender.lastName[0]}`}
              name={`${msg.sender.firstName || ""} ${
                msg.sender.lastName || ""
              }`}
              profileColor={msg.sender.profileColor}
              time={formatTime(msg.createdAt)}
              message={msg.message}
              key={msg._id}
            />
          )
        )}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Button
            variant="outline"
            className="px-4 py-2 bg-primary text-white rounded-lg transition-colors"
            onClick={handleSend}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
