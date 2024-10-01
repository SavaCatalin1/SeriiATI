// ProjectList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/ProjectList.css";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      const projectCollection = await getDocs(collection(db, "projects"));
      setProjects(
        projectCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchProjects();
  }, []);

  const handleAddProject = async () => {
    if (newProjectName) {
      try {
        const docRef = await addDoc(collection(db, "projects"), {
          name: newProjectName,
          createdAt: new Date(),
        });
        setProjects([...projects, { id: docRef.id, name: newProjectName }]);
        setNewProjectName("");
      } catch (error) {
        alert("Error adding project");
      }
    }
  };

  return (
    <div className="project-list-container">
      <h3>Projects</h3>
      <div className="add-project">
        <input
          type="text"
          className="project-input"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="New Project Name"
        />
        <button className="project-button" onClick={handleAddProject}>
          Add Project
        </button>
      </div>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id} className="project-list-item">
            <Link
              to={`/projects/${project.id}/config`}
              className="project-link"
            >
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
