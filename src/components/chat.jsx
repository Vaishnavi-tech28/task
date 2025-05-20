import React, { useState, useEffect } from "react";
import {
  Paperclip,
  Mic,
  Send,
  Trash2,
  Save,
  AlertTriangle,
} from "lucide-react";
import Message from "./Message";
import { VoiceRecorder } from "../utils/voiceRecorder";
import { useChatHistory } from "./useChatHistory";
import HistoryViewer from "./HistoryViewer";

const suggestedReplies = [
  "Grateful today.",
  "Feeling hopeful.",
  "Ready to grow.",
];

const EmergencyModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white text-black rounded-lg p-6 w-full max-w-md shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-red-600">
        Emergency Support
      </h2>
      <ul className="space-y-3 text-sm">
        <li>
          📞 <strong>Campus Helpline:</strong>{" "}
          <a href="tel:1800123456" className="text-blue-600">
            1800-123-456
          </a>
        </li>
        <li>
          💬 <strong>Anonymous Report Form:</strong>{" "}
          <a
            href="https://112.gov.in/"
            className="text-blue-600"
            target="_blank"
            rel="noreferrer"
          >
            Submit a Report
          </a>
        </li>
        <li>
          ❤️ <strong>Mental Health Support:</strong>{" "}
          <a
            href="https://112.gov.in/"
            className="text-blue-600"
            target="_blank"
            rel="noreferrer"
          >
            Visit Support Site
          </a>
        </li>
        <li>
          📄 <strong>Know Your Rights:</strong>{" "}
          <a
            href="https://112.gov.in/"
            className="text-blue-600"
            target="_blank"
            rel="noreferrer"
          >
            Read More
          </a>
        </li>
      </ul>
      <button
        onClick={onClose}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
      >
        Close
      </button>
    </div>
  </div>
);

export default function TalkitChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showRecorder, setShowRecorder] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [history, setHistory] = useState([]);
  const {
    saveConversation,
    loadHistory,
    renameConversation,
    loadConversation,
  } = useChatHistory(messages, history, setHistory);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "That's fine! Tell me more." },
      ]);
    }, 500);
    setInput("");
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  const handleSuggested = (text) => {
    setInput(text);
    handleSend();
  };

  const handleAttach = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setMessages([...messages, { role: "user", image: imageUrl }]);
    }
  };

  const handleVoice = (blob) => {
    setMessages([...messages, { role: "user", voice: blob }]);
    setShowRecorder(false);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-r from-slate-900 to-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-950 p-4 border-r border-gray-800 shadow-sm relative">
        <div className="flex items-center justify-between text-xl font-medium text-blue-400">
          <span>Talkit</span>
          <button
            title="Emergency"
            onClick={() => setShowEmergencyModal(true)}
            className="text-red-500 hover:text-red-400"
          >
            🆘
          </button>
        </div>

        <button
          onClick={handleNewChat}
          className="mb-10 mt-4 bg-blue-400 text-center text-blue-900 px-3 py-2 rounded hover:bg-gray-400 text-white-100"
        >
          New chat
        </button>

        <div className="mt-6">
          <p className="text-sm text-gray-400 uppercase">History</p>
          <HistoryViewer
            history={history}
            onSelect={(index) => setMessages(loadConversation(index))}
            onRename={(index) => renameConversation(index)}
          />
        </div>
      </div>

      {/* Chat area */}
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-950 shadow-md">
          <div className="text-xl font-medium text-blue-400">Talkit</div>
          <div className="flex gap-2">
            <button
              onClick={saveConversation}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              <Save size={19} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <Message key={index} message={msg} />
          ))}
        </div>

        <div className="flex gap-2 px-6 pb-4">
          {suggestedReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleSuggested(reply)}
              className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm hover:bg-gray-600"
            >
              {reply}
            </button>
          ))}
        </div>

        <div className="border-t border-gray-800 px-6 py-4 bg-gray-950 flex items-center gap-2 relative">
          <input
            id="file-input"
            type="file"
            className="hidden"
            onChange={handleAttach}
          />
          <button
            onClick={() => document.getElementById("file-input").click()}
            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 text-white"
          >
            <Paperclip size={18} />
          </button>
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Talkit..."
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
          </div>
          <button
            onClick={() => setShowRecorder(!showRecorder)}
            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 text-white"
          >
            <Mic size={18} />
          </button>
          <button
            onClick={handleSend}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            <Send size={18} />
          </button>
        </div>

        <div className="relative">
          {showRecorder && (
            <VoiceRecorder
              onRecord={handleVoice}
              setShowRecorder={setShowRecorder}
            />
          )}
        </div>

        {/* Emergency Modal */}
        {showEmergencyModal && (
          <EmergencyModal onClose={() => setShowEmergencyModal(false)} />
        )}
      </div>
    </div>
  );
}
