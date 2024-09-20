import React, { useEffect } from "react";

const Task = ({ label, completed, onToggle }) => {
  const spanRef = React.useRef(null);

  useEffect(() => {
    if (spanRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(spanRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedText = spanRef.current.innerText.trim();
      spanRef.current.innerText = trimmedText;
      spanRef.current.blur();
    }
  };

  return (
    <div
      className="flex items-start mb-2 no-drag"
      onDoubleClick={(e) => e.stopPropagation()}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        className="mr-2 mt-1 w-5 h-5 border-red-300 border-2 rounded-none flex-shrink-0"
      />
      <span
        ref={spanRef}
        contentEditable
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning
        autoFocus={true}
        className={`text-white outline-none ${completed ? "line-through" : ""}`}
      >
        {label}
      </span>
    </div>
  );
};

export default Task;
