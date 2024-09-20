import React from "react";

const Task = ({ task, onTaskChange, onTaskToggle }) => {
  const spanRef = React.useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedText = spanRef.current.innerText.trim();
      spanRef.current.innerText = trimmedText;
      spanRef.current.blur();
      onTaskChange(trimmedText);
    }
  };

  const onTaskClick = (e) => {
    if (e.metaKey) {
      const audio = new Audio("/audio/pop.mp3");
      audio.play();
      onTaskToggle();
    }
  };

  return (
    <div
      className="flex items-start mb-2 no-drag"
      onDoubleClick={(e) => e.stopPropagation()}
    >
      <span
        ref={spanRef}
        contentEditable
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning
        autoFocus={true}
        onClick={onTaskClick}
        onBlur={(e) => onTaskChange(e.target.innerText.trim())}
        className={`text-white bg-black bg-opacity-20 px-4 py-1 rounded-xl outline-none poppable ${
          task.completed ? "line-through" : ""
        }`}
      >
        {task.label}
      </span>
    </div>
  );
};

export default Task;
