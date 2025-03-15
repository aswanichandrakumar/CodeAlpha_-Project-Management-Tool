import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectDetails } from "./api"; // Import API function

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const data = await getProjectDetails(projectId);
      if (data) {
        setProject(data);
      }
    };

    fetchProject();
  }, [projectId]);

  if (!project) {
    return <p>Loading project details...</p>;
  }

  return (
    <div className="project-page">
      <h2>{project.name}</h2>
      <p>{project.description}</p>

      <h3>Tasks</h3>
      <ul>
        {project.tasks.length > 0 ? (
          project.tasks.map((task) => <li key={task._id}>{task.title}</li>)
        ) : (
          <p>No tasks available.</p>
        )}
      </ul>

      <h3>Team Members</h3>
      <ul>
        {project.team.length > 0 ? (
          project.team.map((member) => <li key={member._id}>{member.name}</li>)
        ) : (
          <p>No team members assigned.</p>
        )}
      </ul>

      <button onClick={() => navigate("/projects")}>Back to Projects</button>
    </div>
  );
};

export default ProjectPage;
