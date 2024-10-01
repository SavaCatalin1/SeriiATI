// ProjectArrayConfig.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProjectArrayConfig.css";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ArrayMap from "./ArrayMap";
import ArrayConfigView from "./ArrayConfigView";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ProjectArrayConfig = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [arrays, setArrays] = useState([{ rows: 1, columns: 1, multiplier: 1, order: 1 }]); // Default to 1x1 grid
  const [selectedArray, setSelectedArray] = useState(null); // Track selected array
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const projectDoc = await getDoc(doc(db, "projects", projectId));
      if (projectDoc.exists()) {
        const projectData = projectDoc.data();
        setProject({ id: projectDoc.id, ...projectData });

        // Initialize arrays based on the data
        if (projectData.arrays) {
          setArrays(projectData.arrays);
        }
      }
    };
    fetchProject();
  }, [projectId]);

  const handleArrayChange = (index, field, value) => {
    const newArrays = [...arrays];
    newArrays[index][field] = Number(value);
    setArrays(newArrays);
  };

  const moveArray = (dragIndex, hoverIndex) => {
    const updatedArrays = [...arrays];
    const draggedArray = updatedArrays[dragIndex];
    updatedArrays.splice(dragIndex, 1); // Remove the dragged array
    updatedArrays.splice(hoverIndex, 0, draggedArray); // Insert it in the new position
    setArrays(updatedArrays); // Update the state
  };

  const updateOrder = () => {
    const updatedArrays = [...arrays];

    // Sort the arrays and assign new orders starting from 1
    updatedArrays.forEach((array, index) => {
      array.order = index + 1;
    });

    setArrays(updatedArrays);
  };

  const handleMultiply = (array, multiplier) => {
    const newArrays = [...arrays];

    // Create standalone copies
    for (let i = 0; i < multiplier; i++) {
      const newArray = {
        rows: array.rows,
        columns: array.columns,
        multiplier: 1, // Copies do not have multipliers
        order: newArrays.length + 1, // Set order after the last one
      };
      newArrays.push(newArray); // Add the new copy to the arrays
    }

    setArrays(newArrays); // Update state with the new arrays
  };

  const handleSaveConfig = async () => {
    try {
      await updateDoc(doc(db, "projects", projectId), { arrays });
      navigate(`/projects/${projectId}/scan`);
    } catch (error) {
      alert("Error saving configuration");
    }
  };

  const addArray = () => {
    const newArray = {
      rows: 1,
      columns: 1,
      multiplier: 1,
      order: arrays.length + 1, // Automatically assign next order
    };
    setArrays([...arrays, newArray]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="array-config">
        <h3>Configure Arrays for {project?.name}</h3>
        <button className="array-button" onClick={addArray}>
          Add Another Array
        </button>
        <button className="array-button" onClick={handleSaveConfig}>
          Save Configuration
        </button>

        {/* Array Map showing draggable arrays */}
        <ArrayMap arrays={arrays} moveArray={moveArray} updateOrder={updateOrder} onArrayClick={setSelectedArray} />

        {/* Show the configuration view and scheme when an array is selected */}
        {selectedArray && (
          <ArrayConfigView
            array={selectedArray}
            onClose={() => setSelectedArray(null)}
            handleArrayChange={handleArrayChange}
            handleMultiply={handleMultiply}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default ProjectArrayConfig;
