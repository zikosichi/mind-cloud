import React, { useState, useEffect } from "react";
import Task from "./Task";

const Project = ({ project, updateProject }) => {
  const handleDoubleClick = () => {
    const newTask = {
      id: `task-${project.tasks.length + 1}`,
      label: `New Task ${project.tasks.length + 1}`,
      completed: false,
    };
    const updatedTodos = [...project.tasks, newTask];
    updateProject({ ...project, tasks: updatedTodos });
  };

  const handleTitleChange = (newTitle) => {
    updateProject({ ...project, title: newTitle });
  };

  const handleTaskToggle = (index) => {
    const updatedTodos = project.tasks.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    updateProject({ ...project, tasks: updatedTodos });
  };

  const handleTaskChange = (newLabel, index) => {
    const updatedTodos = project.tasks.map((todo, i) =>
      i === index ? { ...todo, label: newLabel } : todo
    );
    updateProject({ ...project, tasks: updatedTodos });
  };

  return (
    <div className="p-4 text-white" onDoubleClick={handleDoubleClick}>
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
        {project.tasks.map(
          (task, index) =>
            !task.completed && (
              <Task
                task={task}
                key={index}
                onTaskToggle={() => handleTaskToggle(index)}
                onTaskChange={(newLabel) => handleTaskChange(newLabel, index)}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Project;
