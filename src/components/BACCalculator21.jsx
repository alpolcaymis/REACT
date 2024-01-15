// BACCalculator.js
import React, { useState, useEffect } from "react";

// Import SVG icons
import BeerIcon from "../icons/beer.svg";
import WineIcon from "../icons/wine.svg";
import DistilledIcon from "../icons/distilled.svg"; // Add the correct path to the distilled SVG icon
import LiqueursIcon from "../icons/liqueurs.svg"; // Add the correct path to the liqueurs SVG icon

const generateCustomId = () => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `${timestamp}-${random}`;
};

const BACCalculator21 = () => {
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
      <p>{value}</p>
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
        return { ...drink, type: value };
      }
      return drink;
    });
    setDrinks(updatedDrinks);
  };

  return (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <section className="gender-section ">
          <p className="text-center">Gender</p>
          <div className="flex justify-around">
            <label className="border p-4 rounded-md">
              <input
                type="radio"
                id="gender-man"
                value="man"
                checked={gender === "man"}
                onChange={() => setGender("man")}
              />
              Man
            </label>
            <label className="border p-4 rounded-md">
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
        </section>

        <section className="hw-section  ">
          <p className="text-center">Physical Apperance</p>
          <div className="flex justify-around">
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
        </section>

        <section className="drinks-section ">
          <p className="text-center">Drinks section</p>
          <div className=" ">
            {drinks.map((drink, index) => (
              <div className="drink-item" key={drink.id}>
                <label>
                  Type:
                  <select
                    id={`type-${drink.id}`}
                    value={drink.type}
                    onChange={(e) => handleTypeChange(drink.id, e.target.value)}
                    required
                  >
                    <option value="beer">Beer</option>
                    <option value="wine">Wine</option>
                    <option value="distilled">Distilled</option>
                    <option value="liqueurs">Liqueurs</option>
                    {/* Add more options for other drink types as needed */}
                  </select>
                  {drinkTypeIcons[drink.type]}
                </label>
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
                      handleInputChange(drink.id, "amount", e.target.value)
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
                      handleInputChange(drink.id, "volume", e.target.value)
                    }
                    required
                  />
                </label>
                <label>
                  Percentage:
                  <input
                    type="number"
                    placeholder="Percentage"
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
                <label>
                  <button
                    className="p-1 border rounded-lg"
                    type="button"
                    onClick={() => handleDeleteDrink(drink.id)}
                  >
                    Delete
                  </button>
                </label>
              </div>
            ))}
          </div>
          <button
            className="p-2 bg-yellow-800"
            type="button"
            onClick={handleAddDrink}
          >
            Add Drink
          </button>
        </section>

        <section className="additional-section border">
          <p className="text-center">Additional Information</p>
          <div className="">
            <label>
              How many hours have passed since the first drink?
              <input
                type="number"
                id="hours"
                min="0"
                value={hoursPassed}
                onChange={(e) => setHoursPassed(e.target.value)}
                required
              />
            </label>
          </div>
        </section>

        <section className="calculate-button-section border">
          <button type="submit" className="button">
            Calculate BAC
          </button>
        </section>

        <section className="results-section border">
          <p className="text-center">Result Section</p>
          <div className="">
            {renderResult("Blood Volume (ml)", bloodVolume.toFixed(2))}
            {renderResult("Total Alcohol Millimeter", totalAlcoholMillimeter)}
            {renderResult("Total Alcohol Milligram", totalAlcoholMilligram)}
            {renderResult(
              "Calculated BAC Before Deduction (per 100 milliliters)",
              calculatedBACBeforeDeduction.toFixed(2)
            )}
            {renderResult(
              "Calculated BAC After Deduction (per 100 milliliters)",
              calculatedBACAfterDeduction.toFixed(2)
            )}
          </div>
        </section>
        {""}
      </form>
    </div>
  );
};

export default BACCalculator21;
