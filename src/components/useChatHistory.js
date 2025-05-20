import { useCallback } from "react";

export const useChatHistory = (messages, history, setHistory) => {
  const saveConversation = useCallback(() => {
    const name = prompt("Name this conversation:");
    if (!name) return;
    const newEntry = { name, messages };
    setHistory((prev) => [...prev, newEntry]);
    localStorage.setItem(
      "talkitHistory",
      JSON.stringify([...history, newEntry]),
    );
  }, [messages, history, setHistory]);

  const loadHistory = useCallback(() => {
    const stored = JSON.parse(localStorage.getItem("talkitHistory") || "[]");
    setHistory(stored);
  }, [setHistory]);

  const renameConversation = useCallback(
    (index) => {
      const newName = prompt("Enter new name:");
      if (!newName) return;
      const updated = [...history];
      updated[index].name = newName;
      setHistory(updated);
      localStorage.setItem("talkitHistory", JSON.stringify(updated));
    },
    [history, setHistory],
  );

  const loadConversation = useCallback(
    (index) => {
      const selected = history[index].messages;
      return selected;
    },
    [history],
  );

  return {
    saveConversation,
    loadHistory,
    renameConversation,
    loadConversation,
  };
};
