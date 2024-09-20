"use client";

import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import ClientResponsiveGridLayout from "./components/ClientResponsiveGridLayout";
import Project from "./components/Project";

export default function Home() {
  const [projects, setProjects] = useState({ lg: [] });

  useEffect(() => {
    setProjects(JSON.parse(localStorage.getItem("projects")) || { lg: [] });
  }, []);

  useEffect(() => {
    if (projects && projects.lg && projects.lg.length) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }, [projects]);

  const addNewProject = () => {
    const newProjectId = `project-${Math.random().toString(36).substring(2, 11)}`;
    const cols = 12; // Number of columns in the grid
    const newProjectWidth = 3;
    const lastItem = projects.lg[projects.lg.length - 1];
    let x = lastItem ? lastItem.x + lastItem.w : 0;
    let y = lastItem ? lastItem.y : 0;

    // If the new project exceeds the number of columns, start a new row
    if (x + newProjectWidth > cols) {
      x = 0;
      y = y + (lastItem ? lastItem.h : 0);
    }

    const newProject = {
      i: newProjectId,
      x,
      y,
      w: newProjectWidth,
      h: 5,
      tasks: [],
      title: "New Project",
    };

    setProjects((prevProjects) => ({
      lg: [...prevProjects.lg, newProject],
    }));
  };

  const handleLayoutChange = (newLayout) => {
    setProjects((prevLayouts) => {
      const updatedLayouts = newLayout.lg.map((layout) => {
        const existingLayout = prevLayouts.lg.find((l) => l.i === layout.i);
        return existingLayout
          ? {
              ...layout,
              tasks: existingLayout.tasks,
              title: existingLayout.title,
            }
          : layout;
      });
      return { lg: updatedLayouts };
    });
  };

  const updateProject = (project) => {
    setProjects((prevLayouts) => {
      const updatedLayouts = prevLayouts.lg.map((layout) => {
        return layout.i == project.i ? project : layout;
      });
      return { lg: updatedLayouts };
    });
  };

  const handleRemoveProject = (p) => {
    if (p.tasks.filter((t) => !t.completed).length === 0) {
      setProjects((prevProjects) => ({
        lg: prevProjects.lg.filter((project) => project.i !== p.i),
      }));
      const audio = new Audio("/audio/pop.mp3");
      audio.play();
    }
  };

  return (
    <>
      <ClientResponsiveGridLayout
        layouts={projects}
        onLayoutChange={handleLayoutChange}
      >
        {projects.lg.map((project) => (
          <div key={project.i} className="z-50">
            <Project
              project={project}
              updateProject={updateProject}
              removeProject={handleRemoveProject}
            />
          </div>
        ))}
      </ClientResponsiveGridLayout>

      <div className="fixed left-1/2 bottom-6 -translate-x-1/2 z-50">
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-4 px-6 rounded-full text-3xl"
          onClick={addNewProject}
        >
          <FiPlus />
        </button>
      </div>
    </>
  );
}
