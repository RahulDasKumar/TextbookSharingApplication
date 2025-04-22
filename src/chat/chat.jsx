import { UserData } from "../data";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React, { useEffect, useState } from "react";
import useChatStore from "../components/ui/chat/hooks/useChatStore";
import ChatBottombar from "./chat-bottombar";



export function Chat({ messages, selectedUser, isMobile }) {

  const setSelectedUser = useChatStore((state) => state.setSelectedUser);

  useEffect(() => {
    if (selectedUser) {
      setSelectedUser(selectedUser);
    }
  }, [selectedUser]);
  
  const messagesState = useChatStore((state) => state.messages);

  const sendMessage = (newMessage) => {
    useChatStore.setState((state) => ({
      messages: [...state.messages, newMessage],
    }));
  };

  console.log(messagesState)
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />

      <ChatBottombar isMobile={isMobile} />
    </div>
  );
}
