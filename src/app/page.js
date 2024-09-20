"use client";

import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import ClientResponsiveGridLayout from "./components/ClientResponsiveGridLayout";
import Project from "./components/Project";

export default function Home() {
  const [layouts, setLayouts] = useState(() => {
    const savedLayouts = localStorage.getItem("layouts");
    return savedLayouts
      ? JSON.parse(savedLayouts)
      : {
          lg: [
            {
              i: "a",
              x: 0,
              y: 0,
              w: 3,
              h: 5,
              minW: 3,
              minH: 2,
              tasks: [],
              title: "Title 1",
            },
            {
              i: "b",
              x: 1,
              y: 0,
              w: 3,
              h: 5,
              minW: 3,
              minH: 2,
              tasks: [],
              title: "Title 2",
            },
            {
              i: "c",
              x: 4,
              y: 0,
              w: 3,
              h: 5,
              minW: 3,
              minH: 2,
              tasks: [],
              title: "Title 3",
            },
          ],
        };
  });

  useEffect(() => {
    localStorage.setItem("layouts", JSON.stringify(layouts));
  }, [layouts]);

  const addNewProject = () => {
    const newProjectId = `project-${layouts.lg.length + 1}`;
    const cols = 12; // Number of columns in the grid
    const newProjectWidth = 3;
    const lastItem = layouts.lg[layouts.lg.length - 1];
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
    };
    setLayouts((prevLayouts) => ({
      lg: [...prevLayouts.lg, newProject],
    }));
  };

  const handleLayoutChange = (newLayout) => {
    setLayouts((prevLayouts) => {
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
    setLayouts((prevLayouts) => {
      const updatedLayouts = prevLayouts.lg.map((layout) => {
        return layout.i == project.i ? project : layout;
      });
      return { lg: updatedLayouts };
    });
  };

  return (
    <>
      <ClientResponsiveGridLayout
        layouts={layouts}
        onLayoutChange={handleLayoutChange}
      >
        {layouts.lg.map((layout) => (
          <div
            key={layout.i}
            className="bg-[#656773] rounded-3xl text-xl text-center select-none z-50"
          >
            <Project project={layout} updateProject={updateProject} />
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
