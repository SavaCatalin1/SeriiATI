// components/ArrayRectangle.js
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemType } from "./constants";

const ArrayRectangle = ({ array, index, moveArray, onClick }) => {
  const [, ref] = useDrop({
    accept: ItemType,
    hover(item) {
      if (item.index !== index) {
        moveArray(item.index, index);
        item.index = index; // Update the dragged item's index
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={(node) => drag(ref(node))}
      className="array-rectangle"
      onClick={onClick}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div>{`Array ${array.order}`}</div>
      <div>{`${array.rows} x ${array.columns}`}</div>
    </div>
  );
};

export default ArrayRectangle;
