import * as React from "react";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage, ChatBubbleAction, ChatBubbleActionWrapper } from "./components/ui/chat/chat-bubble";
import { ChatMessageList } from "./components/ui/chat/chat-message-list";
import { Copy, Heart } from "lucide-react";
import ChatBar from "./ChatBar";

const actionIcons = [
    { icon: Copy, type: "Copy" },
    { icon: Heart, type: "Heart" }
];


const messages = [
    {
        id: 1,
        message: "Hello, how has your day been? I hope you are doing well.",
        sender: "user",
    },
    {
        id: 2,
        message: "Hi, I am doing well, thank you for asking. How can I help you today?",
        sender: "bot",
    },
    {
        id: 3,
        message: "",
        sender: "bot",
        isLoading: true,
    },
];

const ChatComponent = () => (
    <>
        <ChatMessageList>
            {messages.map((message, index) => {
                const variant = message.sender === "user" ? "sent" : "received";
                return (
                    <ChatBubble key={message.id} variant={variant}>
                        <ChatBubbleAvatar fallback={variant === "sent" ? "US" : "BOB"} />
                        <ChatBubbleMessage isLoading={message.isLoading}>
                            {message.message}
                        </ChatBubbleMessage>
                        <ChatBubbleActionWrapper>
                            {actionIcons.map(({ icon: Icon, type }) => (
                                <ChatBubbleAction
                                    className="size-7"
                                    key={type}
                                    icon={<Icon className="size-4" />}
                                    onClick={() => console.log("Action " + type + " clicked for message " + index)}
                                />
                            ))}
                        </ChatBubbleActionWrapper>
                    </ChatBubble>
                );
            })}
        </ChatMessageList>
        <ChatBar />
    </>
);

export default ChatComponent;
