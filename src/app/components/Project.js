import React from "react";

const Project = ({ projectKey, dataGrid }) => {
  return (
    <div
      className="bg-slate-500 rounded-3xl text-2xl text-center select-none"
      key={projectKey}
      data-grid={dataGrid}
    >
      Project {projectKey}
    </div>
  );
};

export default Project;
