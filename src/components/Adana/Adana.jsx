import React, { useState } from "react";
import AdanaItem from "./AdanaItem";

const initialState = [
  {
    type: "beer",
    amount: 1,
    size: 500,
    percentage: 5,
  },
  {
    type: "wine",
    amount: 1,
    size: 150,
    percentage: 13,
  },
];

function Adana() {
  const [items, setItems] = useState(initialState);

  console.log(items);

  const handleAddItem = () => {
    setItems([
      ...items,
      { type: "liqueur", amount: 1, size: 1, percentage: 1 },
    ]);
  };

  return (
    <div className="bg-sky-800 border-white border p-2 m-2 rounded-md ">
      <ul className="w-full">
        {items.map((item, index) => {
          return (
            <AdanaItem
              type={item.type}
              amount={item.amount}
              size={item.size}
              percentage={item.percentage}
            />
          );
        })}
      </ul>
      <button
        onClick={handleAddItem}
        className="w-fit py-2 px-6 rounded-lg mt-2 bg-sky-400 "
      >
        Add
      </button>
    </div>
  );
}

export default Adana;
