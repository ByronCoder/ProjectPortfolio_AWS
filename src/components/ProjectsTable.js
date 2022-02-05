import React, { useState, useEffect } from "react";
import "../../src/App.css";
import { projectService } from "../_services/project.service";

const ProjectsTable = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      let projects = await projectService.getAll();
      setProjects(projects);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-dark table-portfolio w-auto">
        <thead>
          <tr>
            <th scope="col">Project Name</th>
            <th scope="col">Description</th>
            <th scope="col">Source</th>
            <th scope="col">Demo</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj) => (
            <tr key={proj.id}>
              <td className="cell-left">{proj.title}</td>
              <td className="cell-left">{proj.description}</td>
              <td>
                <a href={proj.sourceLink}>Click Here</a>
              </td>
              <td>
                {proj.demoLink !== "N/A" ? (
                  <a href={proj.demoLink}>Click Here</a>
                ) : (
                  proj.demoLink
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
