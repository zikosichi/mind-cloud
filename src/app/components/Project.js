import React, { useState } from "react";
import Task from "./Task";

const Project = ({ projectKey }) => {
  const [title, setTitle] = useState(`Project ${projectKey}`);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("New Todo");

  const handleToggle = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDoubleClick = () => {
    const newTask = { label: `New Task ${todos.length + 1}`, completed: false };
    setTodos([...todos, newTask]);
  };

  const handleBlur = () => {
    setIsInputVisible(false);
  };

  return (
    <div className="p-4 h-full" onDoubleClick={handleDoubleClick}>
      <h2
        className="text-2xl font-bold mb-4 text-white no-drag focus:outline-none inline-block"
        contentEditable
        suppressContentEditableWarning
        onDoubleClick={(e) => e.stopPropagation()}
        onBlur={(e) => setTitle(e.target.textContent.trim())}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.target.blur();
          }
        }}
      >
        {title}
      </h2>
      
      <div className="pl-5 mb-4 flex flex-wrap gap-x-6 gap-y-1 justify-center">
        {todos.map((todo, index) => (
          <Task
            key={index}
            label={todo.label}
            completed={todo.completed}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Project;
