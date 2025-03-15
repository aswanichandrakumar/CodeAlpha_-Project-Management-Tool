import React, { useEffect, useState } from "react";
import { getProjects } from "./api"; // Import API function
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data || []);
    };

    fetchProjects();
  }, []);

  return (
    <div className="project-list">
      <h2>My Projects</h2>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project._id} onClick={() => navigate(`/projects/${project._id}`)}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;
