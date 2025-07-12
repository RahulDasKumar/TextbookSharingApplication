import {
  FileImage,
  Mic,
  Paperclip,
  PlusCircle,
  SendHorizontal,
  ThumbsUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "../components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { loggedInUserData } from "../data";
// import { EmojiPicker } from "../emoji-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { ChatInput } from "../components/ui/chat/chat-input";
import useChatStore from "@/components/ui/chat/hooks/useChatStore";
import { io } from 'socket.io-client';
import { socket } from "./socket";

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({ isMobile,selectedUser }) {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const setMessages = useChatStore((state) => state.setMessages);
  const hasInitialResponse = useChatStore((state) => state.hasInitialResponse);
  const user = JSON.parse(localStorage.getItem("user"))

  const setHasInitialResponse = useChatStore(
    (state) => state.setHasInitialResponse,
  );
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
      // register events 
    socket.on('connect', () => {
      console.log('Successfully connected to the server!');
    });
    // 
    socket.on('send_message',(msg)=>{
        console.log(msg)
      useChatStore.setState((state) => ({
        messages: [...state.messages, msg.message],
      }));
      })
  
      return ()=>{
        socket.off("send_message")
        socket.off("join")
      }
  
    }, [])
  

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };
  // sending message in 

  const sendMessage =  (newMessage) => {
    console.log("Socket connected:", socket.connected);    

    socket.emit("send_message", {
      room: selectedUser.name,
      message: newMessage,
      name: user['username']
    }, (response) => {
      console.log("Server Response:", response); 
    });
  };
  const handleThumbsUp = () => {
    const newMessage = {
      id: message.length + 1,
      name: user['username'],
      avatar: loggedInUserData.avatar,
      message: "👍",
    };
    sendMessage(newMessage);
    setMessage("");
  };

  const handleSend = () => {
    console.log(message)
    if (message.trim()) {
      const newMessage = {
        id: message.length + 1,
        name: user['username'],
        avatar: loggedInUserData.avatar,
        message: message.trim(),
      };
      console.log(newMessage)
      sendMessage(newMessage);
      setMessage("");

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    if (!hasInitialResponse) {
      setisLoading(true);
      setTimeout(() => {
        setMessages((messages) => [
          ...messages.slice(0, messages.length - 1),
          {
            id: messages.length + 1,
            avatar:
              "",
            name: "Jane Doe",
            message: "Awesome! I am just chilling outside.",
            timestamp: formattedTime,
          },
        ]);
        setisLoading(false);
        setHasInitialResponse(true);
      }, 2500);
    }
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="px-2 py-4 flex justify-between w-full items-center gap-2">
      <div className="flex">
        <Popover>
          <PopoverTrigger asChild>
            <Link
              to="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "shrink-0",
              )}
            >
              <PlusCircle size={22} className="text-muted-foreground" />
            </Link>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-full p-2">
            {message.trim() || isMobile ? (
              <div className="flex gap-2">
                <Link
                  to="#"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9",
                    "shrink-0",
                  )}
                >
                  <Mic size={22} className="text-muted-foreground" />
                </Link>
                {BottombarIcons.map((icon, index) => (
                  <Link
                    key={index}
                    to="#"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "h-9 w-9",
                      "shrink-0",
                    )}
                  >
                    <icon.icon size={22} className="text-muted-foreground" />
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                to="#"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9",
                  "shrink-0",
                )}
              >
                <Mic size={22} className="text-muted-foreground" />
              </Link>
            )}
          </PopoverContent>
        </Popover>
        {!message.trim() && !isMobile && (
          <div className="flex">
            {BottombarIcons.map((icon, index) => (
              <Link
                key={index}
                to="#"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9",
                  "shrink-0",
                )}
              >
                <icon.icon size={22} className="text-muted-foreground" />
              </Link>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          <ChatInput
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="rounded-full"
          />
          <div className="absolute right-4 bottom-2  ">
            {/* <EmojiPicker
              onChange={(value) => {
                setMessage(message + value);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            /> */}
          </div>
        </motion.div>

        {message.trim() ? (
          <Button
            className="h-9 w-9 shrink-0"
            onClick={handleSend}
            disabled={isLoading}
            variant="ghost"
            size="icon"
          >
            <SendHorizontal size={22} className="text-muted-foreground" />
          </Button>
        ) : (
          <Button
            className="h-9 w-9 shrink-0"
            // onClick={handleThumbsUp}
            disabled={isLoading}
            variant="ghost"
            size="icon"
          >
            <ThumbsUp size={22} className="text-muted-foreground" />
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
}
