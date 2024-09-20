import React, { useEffect } from "react";

const Task = ({ task, onTaskChange, onTaskToggle }) => {
  const spanRef = React.useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedText = spanRef.current.innerText.trim();
      spanRef.current.innerText = trimmedText;
      spanRef.current.blur();
      onTaskChange(trimmedText)
    }
  };

  return (
    <div
      className="flex items-start mb-2 no-drag"
      onDoubleClick={(e) => e.stopPropagation()}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onTaskToggle}
        className="mr-2 mt-1 w-5 h-5 border-red-300 border-2 rounded-none flex-shrink-0"
      />
      <span
        ref={spanRef}
        contentEditable
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning
        autoFocus={true}
        onBlur={e => onTaskChange(e.target.innerText.trim())}
        className={`text-white outline-none ${task.completed ? "line-through" : ""}`}
      >
        {task.label}
      </span>
    </div>
  );
};

export default Task;
