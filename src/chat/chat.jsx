import { UserData } from "../data";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React, { useEffect, useState } from "react";
import useChatStore from "../components/ui/chat/hooks/useChatStore";
import ChatBottombar from "./chat-bottombar";
import { socket } from "./socket";



export function Chat({ messages, selectedUser, isMobile }) {
  const storedUser = localStorage.getItem("user")
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesState = useChatStore((state) => state.messages);



  useEffect(() => {
    if (selectedUser) {
      setSelectedUser(selectedUser);
    }
  }, [selectedUser]);
  
  

  console.log(messagesState)
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        isMobile={isMobile}
      />

      <ChatBottombar isMobile={isMobile} selectedUser={selectedUser} />
    </div>
  );
}
