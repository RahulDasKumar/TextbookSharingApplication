"use client";

import { UserData } from "../data";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Sidebar } from "../components/sidebar";
import { Chat } from "./chat";
import { comment } from "postcss";



export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
}) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [selectedUser, setSelectedUser] = useState(UserData[1]);
  const [isMobile, setIsMobile] = useState(false);
  function handleSelect(name){
    const match = UserData.find(element => element.name == name)
    setSelectedUser(match)
  }

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();
    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, [selectedUser]);

// create a listener that looks fires when clicked on the name
// use the name attribute to filter through the userData array to find the correct user selected
// change the setSelectedUser to the new UserData index
useEffect(()=>{
 let elements = document.querySelectorAll('nav>a')
 elements.forEach((tag)=>{
  tag.addEventListener('click',(e)=>{
    console.log(e.target)
    
  })
 })
}
,[])
  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes,
        )}`;
      }}
      className="h-full items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true,
          )}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false,
          )}`;
        }}
        className={cn(
          isCollapsed &&
          "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out",
        )}
      >
        <Sidebar
          isCollapsed={isCollapsed || isMobile}
          chats={UserData.map((user) => ({
            name: user.name,
            messages: user.messages ?? [],
            avatar: user.avatar,
            variant: selectedUser.name === user.name ? "secondary" : "ghost",
          }))}
          isMobile={isMobile}
          onSelect={handleSelect}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <Chat
          messages={selectedUser.messages}
          selectedUser={selectedUser}
          isMobile={isMobile}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
