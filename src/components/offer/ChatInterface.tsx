import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "client";
  timestamp: Date;
}

interface ChatInterfaceProps {
  projectId: string;
  clientName: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  projectId,
  clientName,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat_${projectId}`);
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string timestamps back to Date objects
        const formattedMessages = parsedMessages.map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(formattedMessages);
      } catch (e) {
        console.error("Error parsing saved messages", e);
      }
    }
  }, [projectId]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat_${projectId}`, JSON.stringify(messages));
    }
  }, [messages, projectId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");

    // Simulate a response from the client (for demonstration purposes)
    setTimeout(() => {
      const responseMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: `ありがとうございます。`,
        sender: "client",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, responseMsg]);
    }, 1000);
  };

  // Format date for display
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col w-full bg-white rounded-2xl shadow-[0px_0px_15px_rgba(0,0,0,0.03),0px_2px_30px_rgba(0,0,0,0.08),0px_0px_1px_rgba(0,0,0,0.30)] overflow-hidden">
      <div className="bg-zinc-600 p-4 text-white">
        <h2 className="text-lg font-semibold">{clientName} 様とのチャット</h2>
      </div>

      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto h-96">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p>メッセージを送信して会話を開始しましょう</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-zinc-600 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                <div className="text-sm mb-1">{message.text}</div>
                <div className="text-xs text-right opacity-75">
                  {formatMessageTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-gray-200 p-4 flex items-center"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="メッセージを入力..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-600"
        />
        <button
          type="submit"
          className="ml-2 bg-zinc-600 text-white rounded-lg px-4 py-2 font-semibold"
        >
          送信
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
