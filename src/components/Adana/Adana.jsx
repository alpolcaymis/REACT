import React, { useState } from "react";
import AdanaItem from "./AdanaItem";

const initialState = [
  {
    id: 0,
    type: "beer",
    amount: 1,
    size: 500,
    percentage: 5,
  },
  {
    id: 1,
    type: "wine",
    amount: 1,
    size: 150,
    percentage: 13,
  },
];

function Adana() {
  const [items, setItems] = useState(initialState);
  const [count, setCount] = useState(2);

  console.log(items);

  const handleAddItem = () => {
    setItems([
      ...items,
      { id: count, type: "liqueur", amount: 1, size: 1, percentage: 1 },
    ]);
    setCount(count + 1);
  };

  const handleRemoveItem = (id) => {
    setItems([...items].filter((item) => item.id !== id));
  };

  return (
    <div className="bg-sky-800 border-white border p-2 m-2 rounded-md max-w-fit mx-auto p-4">
      <ul className="w-full ">
        Gender:
        <div className="p-2 flex justify-around ">
          <div>
            <input id="male" type="radio" name="gender" value="male" required />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input id="female" type="radio" name="gender" value="female" />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        {items.map((item, index) => {
          return (
            <AdanaItem
              id={item.id}
              key={index}
              type={item.type}
              amount={item.amount}
              size={item.size}
              percentage={item.percentage}
              remove={handleRemoveItem}
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
