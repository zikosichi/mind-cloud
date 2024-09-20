"use client";

import { useState } from "react";
import ClientResponsiveGridLayout from "./components/ClientResponsiveGridLayout";
import Project from "./components/Project";
import { FiPlus } from "react-icons/fi";

export default function Home() {
  const [layouts, setLayouts] = useState({
    lg: [
      { i: "a", x: 0, y: 0, w: 3, h: 5, minW: 3, minH: 2 },
      { i: "b", x: 1, y: 0, w: 3, h: 5, minW: 3, minH: 2 },
      { i: "c", x: 4, y: 0, w: 3, h: 5, minW: 3, minH: 2 },
    ],
  });

  const addNewProject = () => {
    const newProjectId = `project-${layouts.lg.length + 1}`;
    const cols = 12; // Number of columns in the grid
    const newProjectWidth = 1;
    const lastItem = layouts.lg[layouts.lg.length - 1];
    let x = lastItem.x + lastItem.w;
    let y = lastItem.y;

    // If the new project exceeds the number of columns, start a new row
    if (x + newProjectWidth > cols) {
      x = 0;
      y = y + lastItem.h;
    }

    const newProject = { i: newProjectId, x, y, w: newProjectWidth, h: 5 };
    setLayouts((prevLayouts) => ({
      lg: [...prevLayouts.lg, newProject],
    }));
  };

  const handleLayoutChange = (newLayouts) => {
    setLayouts(newLayouts);
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
            className="bg-slate-500 rounded-3xl text-2xl text-center select-none p-3"
          >
            It will be project content here
          </div>
        ))}
      </ClientResponsiveGridLayout>

      <div className="fixed left-1/2 bottom-6 -translate-x-1/2">
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
