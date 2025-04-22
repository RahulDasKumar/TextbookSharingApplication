import {
  ChatBotMessages,
  UserData,
  Users,
} from "../../../../data";
import { create } from "zustand";





const useChatStore = create()((set) => ({
  selectedUser: Users[4],
  selectedExample: { name: "Messenger example", url: "/" },

  examples: [
    { name: "Messenger example", url: "/" },
    { name: "Chatbot example", url: "/chatbot" },
    { name: "Chatbot2 example", url: "/chatbot2" },
  ],

  input: "",

  setSelectedExample: (selectedExample) => set({ selectedExample }),

  setExamples: (examples) => set({ examples }),

  setInput: (input) => set({ input }),
  handleInputChange: (
    e
  ) => set({ input: e.target.value }),

  chatBotMessages: ChatBotMessages,
  setchatBotMessages: (fn) =>
    set(({ chatBotMessages }) => ({ chatBotMessages: fn(chatBotMessages) })),

  setSelectedUser: (selectedUser) => set({ selectedUser, messages: selectedUser.messages }),

  
  messages: UserData[1].messages,
  setMessages: (fn) => set(({ messages }) => ({ messages: fn(messages) })),

  hasInitialAIResponse: false,
  setHasInitialAIResponse: (hasInitialAIResponse) =>
    set({ hasInitialAIResponse }),

  hasInitialResponse: false,
  setHasInitialResponse: (hasInitialResponse) => set({ hasInitialResponse }),
}));

export default useChatStore;
