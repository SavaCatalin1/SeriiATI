// components/ArrayConfigView.js
import React, { useState } from "react";
import '../styles/ArrayConfigView.css'

const ArrayConfigView = ({ array, onClose, handleArrayChange, handleMultiply }) => {
  const [multiplier, setMultiplier] = useState(array.multiplier);

  const onMultiplyClick = () => {
    handleMultiply(array, multiplier);
  };

  return (
    <div className="array-config-view">
      <h3>Array Configuration</h3>
      <p>Order: {array.order}</p>
      <p>
        Rows:{" "}
        <input
          type="number"
          value={array.rows}
          onChange={(e) => handleArrayChange(array.order - 1, "rows", e.target.value)}
        />
      </p>
      <p>
        Columns:{" "}
        <input
          type="number"
          value={array.columns}
          onChange={(e) => handleArrayChange(array.order - 1, "columns", e.target.value)}
        />
      </p>
      <p>
        Multiplier:{" "}
        <input
          type="number"
          value={multiplier}
          onChange={(e) => setMultiplier(Number(e.target.value))}
        />
      </p>
      <button className="array-button" onClick={onMultiplyClick}>
        Multiply
      </button>
      <button className="array-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ArrayConfigView;
