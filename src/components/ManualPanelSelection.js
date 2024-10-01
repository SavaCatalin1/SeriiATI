// ManualPanelSelection.js
import React, { useState } from 'react';
import '../styles/ManualPanelSelection.css'

const ManualPanelSelection = ({ arrays, onSelect }) => {
  const [selectedArray, setSelectedArray] = useState(0);
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedColumn, setSelectedColumn] = useState(0);

  const handleSelect = () => {
    onSelect(selectedArray, selectedRow, selectedColumn);
  };

  return (
    <div className="manual-panel-selection">
      <h3>Manually Select Panel</h3>
      <label>Array:</label>
      <select
        value={selectedArray}
        onChange={(e) => setSelectedArray(Number(e.target.value))}
        className="selection-input"
      >
        {arrays.map((array, index) => (
          <option key={index} value={index}>Array {index + 1}</option>
        ))}
      </select>
      <label>Row:</label>
      <input
        type="number"
        className="selection-input"
        value={selectedRow}
        onChange={(e) => setSelectedRow(Number(e.target.value))}
        min={0}
        max={arrays[selectedArray]?.rows - 1}
      />
      <label>Column:</label>
      <input
        type="number"
        className="selection-input"
        value={selectedColumn}
        onChange={(e) => setSelectedColumn(Number(e.target.value))}
        min={0}
        max={arrays[selectedArray]?.columns - 1}
      />
      <button className="selection-button" onClick={handleSelect}>Select Panel</button>
    </div>
  );
};

export default ManualPanelSelection;
