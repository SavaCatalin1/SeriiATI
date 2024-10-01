// ProjectScanningWorkflow.js
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import BarcodeScanner from './BarcodeScanner';
import { db } from '../firebase';
import '../styles/ProjectScanningWorkflow.css'

const ProjectScanningWorkflow = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [currentArray, setCurrentArray] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [scannedSerial, setScannedSerial] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const projectDoc = await getDoc(doc(db, 'projects', projectId));
      if (projectDoc.exists()) {
        setProject({ id: projectDoc.id, ...projectDoc.data() });
      }
    };
    fetchProject();
  }, [projectId]);

  useEffect(() => {
    if (scannedSerial) {
      handleSave();
    }
  }, [scannedSerial]);

  const handleSave = async () => {
    const arrayConfig = project?.arrays[currentArray];
    try {
      await addDoc(collection(db, 'panels'), {
        serialNumber: scannedSerial,
        projectId: projectId,
        arrayNumber: currentArray + 1,
        row: currentRow + 1,
        column: currentColumn + 1,
        scannedAt: new Date(),
      });

      if (currentColumn < arrayConfig.columns - 1) {
        setCurrentColumn(currentColumn + 1);
      } else if (currentRow < arrayConfig.rows - 1) {
        setCurrentColumn(0);
        setCurrentRow(currentRow + 1);
      } else if (currentArray < project.arrays.length - 1) {
        setCurrentColumn(0);
        setCurrentRow(0);
        setCurrentArray(currentArray + 1);
      } else {
        alert('Scanning complete!');
      }
    } catch (error) {
      alert('Error saving panel data');
    }
  };

  return (
    <div className="scanning-workflow">
      <h3>Scanning for Project: {project?.name}</h3>
      <h4>Current Panel: Array {currentArray + 1}, Row {currentRow + 1}, Column {currentColumn + 1}</h4>
      <BarcodeScanner onDetected={setScannedSerial} />
    </div>
  );
};

export default ProjectScanningWorkflow;
