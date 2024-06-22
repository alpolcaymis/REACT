// DrinkItem.js
import React from "react";
import {
  XCircleIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/solid";

const DrinkItem = ({
  drink,
  drinkTypeIcons,
  handleInputChange,
  handleDeleteDrink,
  handleTypeChange,
}) => {
  // Increment and decrement functions for the drink attributes
  const increment = (field, max = Number.MAX_SAFE_INTEGER) => {
    if (drink[field] < max) {
      handleInputChange(drink.id, field, Number(drink[field] || 0) + 1);
    }
  };

  const decrement = (field, min = 0) => {
    if (drink[field] > min) {
      handleInputChange(drink.id, field, Number(drink[field] || 0) - 1);
    }
  };

  return (
    <div className="drink-item flex gap-2 justify-between mt-2">
      <div className="drink-content flex-1">
        <label>
          Alkol Türü:
          <div className="relative">
            <select
              id={`type-${drink.id}`}
              value={drink.type}
              onChange={(e) => handleTypeChange(drink.id, e.target.value)}
              required
              className="w-full p-2 text-base rounded border border-gray-500 bg-[#869999] text-[#142020] appearance-none focus:border-blue-500 focus:outline-none"
            >
              <option value="beer">Bira</option>
              <option value="wine">Şarap</option>
              <option value="distilled">Distile (vodka,gin,tequila...)</option>
              <option value="liqueurs">
                Likör (Baileys,Jägermeister,Campari...)
              </option>
              <option value="raki">Rakı</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-8 h-8 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </label>

        <div className="flex justify-between items-center gap-2">
          <div className="w-[50%]">{drinkTypeIcons[drink.type]}</div>
          <div className="w-[50%] p-2">
            {["amount", "volume", "percentage"].map((field) => (
              <div key={field} className="flex items-center my-1">
                <label className="flex-grow">
                  {field === "percentage" ? "Alkol oranı (%)" : `${field} :`}
                </label>
                <button
                  onClick={() => decrement(field)}
                  aria-label={`Decrease ${field}`}
                >
                  <MinusCircleIcon className="w-5 h-5" />
                </button>
                <input
                  className="w-12 text-center mx-2"
                  type="number"
                  min="0"
                  max={field === "percentage" ? "100" : "2000"}
                  value={drink[field]}
                  onChange={(e) =>
                    handleInputChange(drink.id, field, e.target.value)
                  }
                  required
                />
                <button
                  onClick={() =>
                    increment(field, field === "percentage" ? 100 : 2000)
                  }
                  aria-label={`Increase ${field}`}
                >
                  <PlusCircleIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="delete-icon flex-none w-[10%]">
        <button
          className="text-center"
          type="button"
          onClick={() => handleDeleteDrink(drink.id)}
        >
          <XCircleIcon
            className="solid rounded-lg h-8 w-8 text-red-600 mx-auto active:bg-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          Delete
        </button>
      </div>
    </div>
  );
};

export default DrinkItem;
