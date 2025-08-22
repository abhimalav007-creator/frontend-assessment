"use client";

import { useState, useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export default function ChatOutput() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    // Sample initial messages
    { role: "assistant", text: "Hello! How can I help you today?" },
  ]);

  const outputRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new message arrives
  useEffect(() => {
    outputRef.current?.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Copy all messages to clipboard
  const handleCopy = () => {
    const text = messages.map((m) => `${m.role}: ${m.text}`).join("\n\n");
    navigator.clipboard.writeText(text).then(() => {
      alert("Chat copied to clipboard!");
    });
  };

  // Download all messages as JSON
  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={outputRef}
        className="flex flex-col gap-3 p-4 h-96 overflow-y-auto bg-gray-50 dark:bg-gray-800 border rounded-lg border-gray-300 dark:border-gray-700"
      >
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} role={msg.role} text={msg.text} />
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Copy Chat
        </button>
        <button
          onClick={handleDownloadJSON}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Download JSON
        </button>
      </div>
    </div>
  );
}
