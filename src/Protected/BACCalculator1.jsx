// BACCalculator.js
import React, { useState, useEffect } from "react";

// Import SVG icons
import BeerIcon from "../../icons/beer.svg";
import WineIcon from "../../icons/wine.svg";
import DistilledIcon from "../../icons/distilled.svg"; // Add the correct path to the distilled SVG icon
import LiqueursIcon from "../../icons/liqueurs.svg"; // Add the correct path to the liqueurs SVG icon

const BACCalculator1 = () => {
  const [drinks, setDrinks] = useState([
    { type: "beer", amount: "", volume: "", percentage: "" }, // Initial drink input group
  ]);

  const [gender, setGender] = useState("man");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [hoursPassed, setHoursPassed] = useState(""); // New state for hours passed

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
      { type: "beer", amount: "", volume: "", percentage: "" },
    ]);
  };

  const handleDeleteDrink = (index) => {
    const updatedDrinks = [...drinks];
    updatedDrinks.splice(index, 1);
    setDrinks(updatedDrinks);
  };

  const handleInputChange = (index, fieldName, value) => {
    const updatedDrinks = [...drinks];
    updatedDrinks[index][fieldName] = value;
    setDrinks(updatedDrinks);
  };

  const handleTypeChange = (index, value) => {
    const updatedDrinks = [...drinks];
    updatedDrinks[index].type = value;
    setDrinks(updatedDrinks);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Personal Information</h3>
          <label>
            Gender:
            <div>
              <label>
                <input
                  type="radio"
                  value="man"
                  checked={gender === "man"}
                  onChange={() => setGender("man")}
                />
                Man
              </label>
              <label>
                <input
                  type="radio"
                  value="woman"
                  checked={gender === "woman"}
                  onChange={() => setGender("woman")}
                />
                Woman
              </label>
            </div>
          </label>
          <br />
          <label>
            Height (in centimeters):
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Weight (in kilograms):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </label>
        </div>

        {drinks.map((drink, index) => (
          <div key={index}>
            <h3>Drink {index + 1}</h3>
            <label>
              Type:
              <select
                value={drink.type}
                onChange={(e) => handleTypeChange(index, e.target.value)}
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
            <br />
            <label>
              Amount (number of drinks):
              <input
                type="number"
                value={drink.amount}
                onChange={(e) =>
                  handleInputChange(index, "amount", e.target.value)
                }
                required
              />
            </label>
            <br />
            <label>
              Volume per drink (in milliliters):
              <input
                type="number"
                value={drink.volume}
                onChange={(e) =>
                  handleInputChange(index, "volume", e.target.value)
                }
                required
              />
            </label>
            <br />
            <label>
              Alcohol content percentage:
              <input
                type="number"
                value={drink.percentage}
                onChange={(e) =>
                  handleInputChange(index, "percentage", e.target.value)
                }
                required
              />
            </label>
            <button type="button" onClick={() => handleDeleteDrink(index)}>
              Delete Drink
            </button>
          </div>
        ))}
        <div>
          <h3>Additional Information</h3>
          <label>
            How many hours have passed since the first drink?
            <input
              type="number"
              value={hoursPassed}
              onChange={(e) => setHoursPassed(e.target.value)}
              required
            />
          </label>
        </div>
        <br />
        <button type="button" onClick={handleAddDrink}>
          Add Drink
        </button>
        <br />
        <button type="submit" className="button">
          Calculate BAC
        </button>
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
      </form>
    </div>
  );
};

export default BACCalculator1;
