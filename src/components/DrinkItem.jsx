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
  // Increment and decrement functions for the drink attributes with specified step values
  const increment = (field, step) => {
    const newValue = (Number(drink[field]) || 0) + step;
    handleInputChange(drink.id, field, newValue);
  };

  const decrement = (field, step) => {
    const newValue = (Number(drink[field]) || 0) - step;
    if (newValue >= 0) {
      handleInputChange(drink.id, field, newValue);
    }
  };

  return (
    <div className="drink-item grid grid-cols-1 mt-2">
      <div className="flex justify-between items-center">
        <div className="flex-1">
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
                <option value="distilled">
                  Distile (vodka,gin,tequila...)
                </option>
                <option value="liqueurs">
                  Likör (Baileys,Jägermeister,Campari...)
                </option>
                <option value="raki">Rakı</option>
                <option value="duble-raki">Duble Rakı</option>
                <option value="jager-shot">Jägermeister Shot</option>
                <option value="tekila-shot">Tekila Shot</option>
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
        </div>

        <div className="delete-icon flex-none w-[10%] ml-4 flex flex-col items-center">
          <button
            className="text-center mb-1"
            type="button"
            onClick={() => handleDeleteDrink(drink.id)}
          >
            <XCircleIcon
              className="solid rounded-lg h-8 w-8 text-red-600 mx-auto active:bg-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </button>
          <label className="text-center">Delete</label>
        </div>
      </div>

      <div className="flex items-center mt-2">
        <div className="flex-grow mr-6 max-h-[180px] flex items-center justify-center">
          <div className="max-h-[180px]">
            <img
              src={drinkTypeIcons[drink.type].props.src}
              alt={drinkTypeIcons[drink.type].props.alt}
              className="max-h-[180px]"
            />
          </div>
        </div>{" "}
        {/* Added max height for image */}
        <div className="flex-none grid grid-cols-1 md:grid-cols-3 gap-1">
          {["amount", "volume", "percentage"].map((field) => (
            <div key={field} className="flex flex-col items-center">
              <label>
                {field === "amount"
                  ? "Adet sayısı"
                  : field === "volume"
                  ? "Hacim : (ML)"
                  : field === "percentage"
                  ? "Alkol oranı (%)"
                  : `${field.charAt(0).toUpperCase() + field.slice(1)}:`}
              </label>
              <div className="flex items-center bg-[#a0b0b0] rounded">
                {" "}
                {/* Updated background color */}
                <button
                  onClick={() =>
                    decrement(
                      field,
                      field === "amount" ? 1 : field === "volume" ? 10 : 0.5
                    )
                  }
                  aria-label={`Decrease ${field}`}
                >
                  <MinusCircleIcon className="w-6 h-6 text-gray-600" />
                </button>
                <input
                  className="w-16 p-1 text-center border rounded font-bold placeholder-gray-300 text-[1.1rem] h-10" // Updated class
                  type="number"
                  min="0"
                  step={field === "percentage" ? "0.01" : "1"} // Allow float numbers for percentage
                  max={field === "percentage" ? "100" : "2000"}
                  value={drink[field]}
                  placeholder={
                    field === "amount"
                      ? "adet"
                      : field === "volume"
                      ? "500 mL"
                      : field === "percentage"
                      ? "vol % abv"
                      : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value >= 0) {
                      handleInputChange(drink.id, field, value);
                    }
                  }}
                  required
                />
                <button
                  onClick={() =>
                    increment(
                      field,
                      field === "amount" ? 1 : field === "volume" ? 10 : 0.5
                    )
                  }
                  aria-label={`Increase ${field}`}
                >
                  <PlusCircleIcon className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrinkItem;
