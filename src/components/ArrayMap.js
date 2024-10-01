// components/ArrayMap.js
import React from "react";
import ArrayRectangle from "./ArrayRectangle";
import { useDrop } from "react-dnd";
import { ItemType } from "./constants";
import '../styles/ArrayMap.css'

const ArrayMap = ({ arrays, moveArray, updateOrder, onArrayClick }) => {
  const [, ref] = useDrop({
    accept: ItemType,
    drop: () => {
      // When the drag and drop is complete, update the orders
      updateOrder();
    },
  });

  return (
    <div ref={ref} className="array-map-grid">
      {arrays.map((array, index) => (
        <ArrayRectangle
          key={index}
          index={index}
          array={array}
          moveArray={moveArray}
          onClick={() => onArrayClick(array)}
        />
      ))}
    </div>
  );
};

export default ArrayMap;
