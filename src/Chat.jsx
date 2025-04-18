import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ChatLayout } from "./chat/chat-layout";

function ChatComponent() {
    const [defaultLayout, setDefaultLayout] = useState();

    useEffect(() => {
        const layout = Cookies.get("react-resizable-panels:layout");
        if (layout) {
            try {
                setDefaultLayout(JSON.parse(layout));
            } catch (err) {
                console.error("Invalid layout JSON in cookie:", err);
            }
        }
    }, []);

    return (
        <div className="h-dvh">
            <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
        </div>
    );
}

export default ChatComponent;