import React from "react";
import DrinkItem from "./DrinkItem";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const DrinkList = ({
  drinks,
  drinkTypeIcons,
  handleInputChange,
  handleDeleteDrink,
  handleTypeChange,
  handleAddDrink,
}) => (
  <section className="drinks-section mt-4 ">
    <p className="text-center">Alınan Alkolleri Giriniz</p>
    <div className=" ">
      {drinks.map((drink) => (
        <DrinkItem
          key={drink.id}
          drink={drink}
          drinkTypeIcons={drinkTypeIcons}
          handleInputChange={handleInputChange}
          handleDeleteDrink={handleDeleteDrink}
          handleTypeChange={handleTypeChange}
        />
      ))}
    </div>
    <div className="w-full mt-4 flex justify-center bg-[#ff8d1c]  border-2 rounded-md">
      <button
        className="flex justify-center items-center gap-1 py-2              
        text-sm w-full    bg-opacity-25 hover:bg-opacity-45 focus:bg-opacity-45 active:bg-opacity-45
        bg-emerald-950"
        type="button"
        onClick={handleAddDrink}
      >
        <PlusCircleIcon
          className="w-6 h-6"
          stroke="currentColor"
          strokeWidth="0.01"
        />
        Yeni <strong>Alkol Ekle</strong>
      </button>
    </div>
  </section>
);

export default DrinkList;
