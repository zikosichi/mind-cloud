import React, { useState, useEffect } from "react";
import Task from "./Task";

const Project = ({ project, updateProject }) => {
  // const [title, setTitle] = useState(project.title);
  const [tasks, setTodos] = useState(project.tasks);

  useEffect(() => {
    // setTodos(tasks);
  }, []);

  const handleDoubleClick = () => {
    const newTask = {
      id: `task-${tasks.length + 1}`,
      label: `New Task ${tasks.length + 1}`,
      completed: false,
    };
    const updatedTodos = [...tasks, newTask];
    setTodos(updatedTodos);
    updateTasks(projectKey, updatedTodos, title);
  };

  const handleToggle = (index) => {
    const updatedTodos = tasks.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    updateTasks(projectKey, updatedTodos, title);
  };

  const handleTitleChange = (newTitle) => {
    updateProject({...project, title: newTitle});
  };

  return (
    <div className="p-4 text-white h-full" onDoubleClick={handleDoubleClick}>
      <h2
        className="text-2xl font-bold mb-4 text-white no-drag focus:outline-none inline-block"
        contentEditable
        suppressContentEditableWarning
        onDoubleClick={(e) => e.stopPropagation()}
        onBlur={(e) => handleTitleChange(e.target.textContent.trim())}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.target.blur();
          }
        }}
      >
        {project.title}
      </h2>
      <div className="list-disc pl-5 mb-4">
        {tasks.map((todo, index) => (
          <Task
            label={todo.label}
            key={index}
            completed={todo.completed}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Project;
