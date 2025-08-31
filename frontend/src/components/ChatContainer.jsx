import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
            ref={messageEndRef}
          >
            <div className={`flex items-end gap-3 max-w-[70%] ${message.senderId === authUser._id ? "flex-row-reverse" : "flex-row"}`}>
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className={`absolute inset-0 rounded-full blur-md transition-opacity ${
                  message.senderId === authUser._id ? 'bg-primary/40' : 'bg-secondary/40'
                }`}></div>
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="relative size-10 object-cover rounded-full border-2 border-white/50 shadow-md"
                />
              </div>

              {/* Message Content */}
              <div className={`flex flex-col ${message.senderId === authUser._id ? "items-end" : "items-start"}`}>
                {/* Message Bubble */}
                <div className={`relative group ${
                  message.senderId === authUser._id 
                    ? "bg-gradient-to-r from-primary to-secondary text-white" 
                    : "bg-white/80 backdrop-blur-sm border border-white/20 text-base-content"
                } rounded-2xl px-4 py-3 shadow-premium hover:shadow-lg transition-all duration-300 max-w-full`}>
                  
                  {/* Message Image */}
                  {message.image && (
                    <div className="mb-3">
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="max-w-[300px] rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  {/* Message Text */}
                  {message.text && (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {message.text}
                    </p>
                  )}
                </div>

                {/* Timestamp */}
                <div className={`flex items-center gap-2 mt-2 ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}>
                  <time className="text-xs text-base-content/50 font-medium">
                    {formatMessageTime(message.createdAt)}
                  </time>
                  {message.senderId === authUser._id && (
                    <div className="flex items-center gap-1">
                      <div className="size-2 bg-success rounded-full"></div>
                      <span className="text-xs text-success font-medium">Delivered</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center mx-auto">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-base-content">Start a conversation</h3>
                <p className="text-sm text-base-content/60">Send your first message to begin chatting</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
