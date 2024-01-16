// BACCalculator.js
import React, { useState, useEffect } from "react";

// Import SVG icons
import BeerIcon from "../icons/beer.svg";
import WineIcon from "../icons/wine.svg";
import DistilledIcon from "../icons/distilled.svg"; // Add the correct path to the distilled SVG icon
import LiqueursIcon from "../icons/liqueurs.svg"; // Add the correct path to the liqueurs SVG icon
import { XCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

const generateCustomId = () => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `${timestamp}-${random}`;
};

const BACCalculator22 = () => {
  const initialDrink = {
    id: generateCustomId(),
    type: "beer",
    amount: "",
    volume: "",
    percentage: "",
  };

  const [drinks, setDrinks] = useState([initialDrink]);

  const [gender, setGender] = useState("man");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [hoursPassed, setHoursPassed] = useState(0); // New state for hours passed

  const [totalAlcoholMillimeter, setTotalAlcoholMillimeter] = useState(0);
  const [totalAlcoholMilligram, setTotalAlcoholMilligram] = useState(0);
  const [bloodVolume, setBloodVolume] = useState(0);
  const [calculatedBACBeforeDeduction, setCalculatedBACBeforeDeduction] =
    useState(0);
  const [calculatedBACAfterDeduction, setCalculatedBACAfterDeduction] =
    useState(0);

  useEffect(() => {
    // Use useEffect to handle the calculation after state updates
    const calculatedBloodVolume = calculateBloodVolume();
    setBloodVolume(calculatedBloodVolume);

    // Use totalAlcoholMilligram in the calculation
    const BACBeforeDeduction =
      (totalAlcoholMilligram / calculatedBloodVolume) * 100; // Before deduction
    setCalculatedBACBeforeDeduction(BACBeforeDeduction);

    // Deduct based on hoursPassed value
    let BACAfterDeduction = BACBeforeDeduction - hoursPassed * 0.15;

    // Ensure the calculated BAC is not negative
    BACAfterDeduction = Math.max(0, BACAfterDeduction);

    setCalculatedBACAfterDeduction(BACAfterDeduction);
  }, [totalAlcoholMilligram, height, weight, gender, hoursPassed]); // Dependencies added to trigger the effect on state changes

  const calculateBloodVolume = () => {
    const heightInMeters = height / 100; // Convert height from centimeters to meters
    let bloodVolume;
    if (gender === "man") {
      bloodVolume =
        0.3669 * heightInMeters * heightInMeters * heightInMeters +
        0.03219 * weight +
        0.6041;
    } else {
      bloodVolume =
        0.3561 * heightInMeters * heightInMeters * heightInMeters +
        0.03308 * weight +
        0.1833;
    }
    // Convert blood volume to milliliters
    return bloodVolume * 1000;
  };

  const calculateAlcoholMillimeter = (amount, volume, percentage) => {
    // Perform alcohol millimeter calculation using the input values
    return (amount * percentage * volume) / 100;
  };

  const renderResult = (title, value) => (
    <div>
      <h3>{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );

  const drinkTypeIcons = {
    beer: <img src={BeerIcon} alt="Beer Icon" />,
    wine: <img src={WineIcon} alt="Wine Icon" />,
    distilled: <img src={DistilledIcon} alt="Distilled Icon" />, // Add the correct path to the distilled SVG icon
    liqueurs: <img src={LiqueursIcon} alt="Liqueurs Icon" />, // Add the correct path to the liqueurs SVG icon
    // Add more entries for other drink types and their corresponding icons
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let totalAlcohol = 0;
    drinks.forEach((drink) => {
      const alcoholMillimeter = calculateAlcoholMillimeter(
        drink.amount,
        drink.volume,
        drink.percentage
      );
      console.log("Alcohol Millimeter:", alcoholMillimeter);
      totalAlcohol += alcoholMillimeter;
    });
    setTotalAlcoholMillimeter(totalAlcohol);

    // Convert totalAlcoholMillimeter to totalAlcoholMilligram
    setTotalAlcoholMilligram(totalAlcohol * 0.789);
  };

  const handleAddDrink = () => {
    setDrinks([
      ...drinks,
      {
        id: generateCustomId(),
        type: "beer",
        amount: "",
        volume: "",
        percentage: "",
      },
    ]);
  };

  const handleDeleteDrink = (id) => {
    const updatedDrinks = drinks.filter((drink) => drink.id !== id);
    setDrinks(updatedDrinks);
  };

  const handleInputChange = (id, fieldName, value) => {
    const updatedDrinks = drinks.map((drink) => {
      if (drink.id === id) {
        return { ...drink, [fieldName]: value };
      }
      return drink;
    });
    setDrinks(updatedDrinks);
  };

  const handleTypeChange = (id, value) => {
    const updatedDrinks = drinks.map((drink) => {
      if (drink.id === id) {
        return { ...drink, type: value, ...getDefaultValuesForType(value) };
      }
      return drink;
    });
    setDrinks(updatedDrinks);
  };

  return (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <fieldset className="info-section border pb-4 p-2">
          <legend className="text-center">
            <p className="px-4">Personal Information</p>
          </legend>

          <div className="flex justify-center items-center gap-3 p-2">
            <label className=" flex-1 text-center  rounded-md">
              <input
                type="radio"
                id="gender-man"
                value="man"
                checked={gender === "man"}
                onChange={() => setGender("man")}
              />
              Man
            </label>
            <label className="flex-1 text-center  rounded-md">
              <input
                className=""
                type="radio"
                id="gender-female"
                value="woman"
                checked={gender === "woman"}
                onChange={() => setGender("woman")}
              />
              Woman
            </label>
          </div>

          <div className="flex justify-around mt-2 gap-3">
            <label>
              Height (cm):
              <input
                type="number"
                id="height"
                min="110"
                max="230"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
            </label>
            <label>
              Weight (kg):
              <input
                type="number"
                id="weight"
                min="40"
                max="250"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </label>
          </div>
        </fieldset>

        <section className="drinks-section mt-4 ">
          <p className="text-center">Drinks section</p>
          <div className=" ">
            {drinks.map((drink, index) => (
              <div
                className="drink-item flex gap-2 justify-between  mt-2"
                key={drink.id}
              >
                <div className="drink-content flex-1 ">
                  <label>
                    {/* Type: */}
                    <select
                      id={`type-${drink.id}`}
                      value={drink.type}
                      onChange={(e) =>
                        handleTypeChange(drink.id, e.target.value)
                      }
                      required
                    >
                      <option value="beer">Beer</option>
                      <option value="wine">Wine</option>
                      <option value="distilled">Distilled</option>
                      <option value="liqueurs">Liqueurs</option>
                      {/* Add more options for other drink types as needed */}
                    </select>
                  </label>

                  <div className="flex justify-between items-center gap-2">
                    <div className="w-[40%] h-auto">
                      {drinkTypeIcons[drink.type]}
                    </div>
                    <div className="w-[50%] p-2">
                      <label>
                        Amount:
                        <input
                          type="number"
                          placeholder="amount"
                          id={`amount-${drink.id}`}
                          min="0"
                          max="20"
                          value={drink.amount}
                          onChange={(e) =>
                            handleInputChange(
                              drink.id,
                              "amount",
                              e.target.value
                            )
                          }
                          required
                        />
                      </label>
                      <label>
                        Volume:
                        <input
                          type="number"
                          placeholder="volume mL"
                          id={`volume-${drink.id}`}
                          min="1"
                          max="1000"
                          value={drink.volume}
                          onChange={(e) =>
                            handleInputChange(
                              drink.id,
                              "volume",
                              e.target.value
                            )
                          }
                          required
                        />
                      </label>
                      <label>
                        Percentage: %
                        <input
                          type="number"
                          placeholder="Percentage %"
                          id={`percentage-${drink.id}`}
                          min="0"
                          max="100"
                          value={drink.percentage}
                          onChange={(e) =>
                            handleInputChange(
                              drink.id,
                              "percentage",
                              e.target.value
                            )
                          }
                          required
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="delete-icon flex-none w-[10%] ">
                  <label>
                    <button
                      className="text-center"
                      type="button"
                      onClick={() => handleDeleteDrink(drink.id)}
                    >
                      <XCircleIcon
                        className="solid rounded-lg h-8 w-8 text-red-600 mx-auto active:bg-black"
                        fill="none"
                        // viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      Delete
                    </button>
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full mt-4 flex justify-center bg-yellow-800 bg-transparent    border border-2 rounded-md">
            <button
              className="flex justify-center gap-1  py-2
              
              text-sm w-full bg-transparent  active:bg-white hover:bg-white
              bg-emerald-950 
              "
              type="button"
              onClick={handleAddDrink}
            >
              <PlusCircleIcon
                className="w-6 h-6"
                // fill="none"
                // viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="0.01"
              />
              Add Drink
            </button>
          </div>
        </section>

        <fieldset className="additional-section my-4 border">
          <legend className="text-center  px-5">Additional Information</legend>
          <div className="text-center">
            <label>
              How many hours have passed since the first drink?
              <input
                className="w-[80%] mb-2"
                type="number"
                id="hours"
                min="0"
                value={hoursPassed}
                onChange={(e) => setHoursPassed(e.target.value)}
                required
              />
            </label>
          </div>
        </fieldset>

        <section className="calculate-button-section ">
          <div className="flex justify-center">
            <button type="submit" className="button">
              Calculate BAC
            </button>
          </div>
        </section>

        <fieldset className="results-section border">
          <legend className="text-center m-2 p-2 border">Result Section</legend>
          <div className="  text-center">
            <div className="font-bold text-3xl p-1 border">
              {renderResult(
                "Calculated BAC  ",
                <div className="text-5xl p-1">
                  {calculatedBACAfterDeduction.toFixed(2)}
                </div>
              )}
              <p className="text-base">(per 100 milliliters)</p>
            </div>
            <div>
              {renderResult("Blood Volume (mL)", bloodVolume.toFixed(2))}
              {renderResult("Total Alcohol (mL)", totalAlcoholMillimeter)}
              {renderResult("Total Alcohol Milligram", totalAlcoholMilligram)}
              {renderResult(
                "Calculated BAC Before Time Effect Deduction ",
                calculatedBACBeforeDeduction.toFixed(2)
              )}
              <p className="text-xs">(per 100 milliliters)</p>
            </div>
          </div>
        </fieldset>
        {""}
      </form>
    </div>
  );
};

export default BACCalculator22;
