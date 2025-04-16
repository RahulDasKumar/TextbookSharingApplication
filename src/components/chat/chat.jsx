import { UserData } from "../../data";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React, { useEffect, useState } from "react";
import useChatStore from "../ui/chat/hooks/useChatStore";
import ChatBottombar from "./chat-bottombar";



export function Chat({ messages, selectedUser, isMobile }) {
  const messagesState = useChatStore((state) => state.messages);

  const sendMessage = (newMessage) => {
    useChatStore.setState((state) => ({
      messages: [...state.messages, newMessage],
    }));
  };

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
