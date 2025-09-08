import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ChatBoxProps {
  imgFallBack: string;
  name: string;
  isMe?: boolean;
  time: string;
  profileColor: string;
  message: string;
}

function ChatBox({
  imgFallBack,
  isMe = false,
  name,
  profileColor,
  time,
  message,
}: ChatBoxProps) {
  return (
    <div className={`flex items-start space-x-2 ${isMe ? "justify-end" : ""}`}>
      {isMe && (
        <>
          <div className="flex-1">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 text-right">
              {name} • {time}
            </div>
            <div className="bg-primary text-white dark:text-slate-800 rounded-lg px-3 py-2 text-sm ml-8">
              {message}
            </div>
          </div>
          <Avatar
            className={`size-6 rounded-full flex items-center justify-center text-sm text-white font-medium`}
          >
            <AvatarImage src="" />
            <AvatarFallback className={`${profileColor}`}>
              {imgFallBack}
            </AvatarFallback>
          </Avatar>
        </>
      )}
      {!isMe && (
        <>
          <Avatar
            className={`size-6 rounded-full flex items-center justify-center text-sm text-white font-medium`}
          >
            <AvatarImage src="" />
            <AvatarFallback className={`${profileColor}`}>
              {imgFallBack}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {name} • {time}
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-gray-100">
              {message}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatBox;
