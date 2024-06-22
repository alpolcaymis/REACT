// DrinkItem.js
import React from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";

const DrinkItem = ({
  drink,
  drinkTypeIcons,
  handleInputChange,
  handleDeleteDrink,
  handleTypeChange,
}) => (
  <div className="drink-item flex gap-2 justify-between mt-2">
    <div className="drink-content flex-1">
      <label>
        Alkol Türü:
        <select
          id={`type-${drink.id}`}
          value={drink.type}
          onChange={(e) => handleTypeChange(drink.id, e.target.value)}
          required
        >
          <option value="beer">Bira</option>
          <option value="wine">Şarap</option>
          <option value="distilled">Distile (vodka,gin,tequila...)</option>
          <option value="liqueurs">
            Likör (Baileys,Jägermeister,Campari...)
          </option>
          <option value="raki">Rakı</option> {/* Added raki option */}
        </select>
      </label>

      <div className="flex justify-between items-center gap-2">
        <div className="w-[50%]">{drinkTypeIcons[drink.type]}</div>
        <div className="w-[50%] p-2">
          <label>
            Adet sayısı:
            <input
              className="placeholder-zinc-300"
              type="number"
              placeholder="adet"
              id={`amount-${drink.id}`}
              min="0"
              max="30"
              value={drink.amount}
              onChange={(e) =>
                handleInputChange(drink.id, "amount", e.target.value)
              }
              required
            />
          </label>
          <label>
            hacim: (mL)
            <input
              type="number"
              className="placeholder-zinc-300"
              placeholder="500 mL"
              id={`volume-${drink.id}`}
              min="1"
              max="2000"
              value={drink.volume}
              onChange={(e) =>
                handleInputChange(drink.id, "volume", e.target.value)
              }
              required
            />
          </label>
          <label className="">
            <p className="truncate">Alkol oranı: %</p>
            <input
              type="number"
              className="placeholder-zinc-300"
              placeholder="vol % abv"
              id={`percentage-${drink.id}`}
              min="0"
              max="100"
              value={drink.percentage}
              onChange={(e) =>
                handleInputChange(drink.id, "percentage", e.target.value)
              }
              required
            />
          </label>
        </div>
      </div>
    </div>

    <div className="delete-icon flex-none w-[10%]">
      <label>
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
      </label>
    </div>
  </div>
);

export default DrinkItem;
