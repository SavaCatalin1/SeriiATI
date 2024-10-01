// PVApp.js
import React, { useState } from 'react';
import ArrayConfig from './ArrayConfig';
import ScanningWorkflow from './ScanningWorkflow';
import ManualPanelSelection from './ManualPanelSelection';

const PVApp = () => {
  const [arrays, setArrays] = useState(null);

  const handleSaveConfig = (config) => {
    setArrays(config);
  };

  return (
    <div>
      {!arrays ? (
        <ArrayConfig onSaveConfig={handleSaveConfig} />
      ) : (
        <>
          <ScanningWorkflow arrays={arrays} />
          <ManualPanelSelection arrays={arrays} onSelect={(array, row, column) => {
            // Implement logic to manually move to the selected panel
            console.log(`Manual selection: Array ${array + 1}, Row ${row + 1}, Column ${column + 1}`);
          }} />
        </>
      )}
    </div>
  );
};

export default PVApp;
