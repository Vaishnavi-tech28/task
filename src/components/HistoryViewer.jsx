import React from "react";
import { Pencil } from "lucide-react";

const HistoryViewer = ({ history, onSelect, onRename }) => {
  return (
    <ul className="mt-2 space-y-2 text-white text-sm">
      {history.map((h, index) => (
        <li
          key={index}
          className="flex justify-between items-center cursor-pointer"
        >
          <span onClick={() => onSelect(index)} className="hover:underline">
            {h.name || `Conversation ${index + 1}`}
          </span>
          <Pencil
            size={14}
            onClick={() => onRename(index)}
            className="ml-2 text-gray-400 hover:text-white cursor-pointer"
          />
        </li>
      ))}
    </ul>
  );
};

export default HistoryViewer;
