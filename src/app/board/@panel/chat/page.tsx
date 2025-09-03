import ChatBox from "@/components/common/ChatBox";

function Chat() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 space-y-3 overflow-y-auto chat-scroll max-h-[50vh]">
        <ChatBox
          imgFallBack="A"
          name="Alex"
          profileColor="bg-blue-500"
          time="2:34 PM"
          message="Great work on the diagram!"
        />
        <ChatBox
          imgFallBack="S"
          name="Sarah"
          profileColor="bg-green-500"
          time="2:35 PM"
          message="Thanks! Should we add more details to the user flow?"
        />
        <ChatBox
          imgFallBack="Y"
          name="You"
          profileColor="bg-purple-500"
          time="2:36 PM"
          message="Yes, let's expand on the checkout process"
          isMe
        />
        <ChatBox
          imgFallBack="A"
          name="Alex"
          profileColor="bg-blue-500"
          time="2:34 PM"
          message="Great work on the diagram!"
        />
        <ChatBox
          imgFallBack="S"
          name="Sarah"
          profileColor="bg-green-500"
          time="2:35 PM"
          message="Thanks! Should we add more details to the user flow?"
        />
        <ChatBox
          imgFallBack="Y"
          name="You"
          profileColor="bg-purple-500"
          time="2:36 PM"
          message="Yes, let's expand on the checkout process"
          isMe
        />
        <ChatBox
          imgFallBack="A"
          name="Alex"
          profileColor="bg-blue-500"
          time="2:34 PM"
          message="Great work on the diagram!"
        />
        <ChatBox
          imgFallBack="S"
          name="Sarah"
          profileColor="bg-green-500"
          time="2:35 PM"
          message="Thanks! Should we add more details to the user flow?"
        />
        <ChatBox
          imgFallBack="Y"
          name="You"
          profileColor="bg-purple-500"
          time="2:36 PM"
          message="Yes, let's expand on the checkout process"
          isMe
        />
        <ChatBox
          imgFallBack="A"
          name="Alex"
          profileColor="bg-blue-500"
          time="2:34 PM"
          message="Great work on the diagram!"
        />
        <ChatBox
          imgFallBack="S"
          name="Sarah"
          profileColor="bg-green-500"
          time="2:35 PM"
          message="Thanks! Should we add more details to the user flow?"
        />
        <ChatBox
          imgFallBack="Y"
          name="You"
          profileColor="bg-purple-500"
          time="2:36 PM"
          message="Yes, let's expand on the checkout process"
          isMe
        />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
