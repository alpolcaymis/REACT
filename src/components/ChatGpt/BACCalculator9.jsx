// BACCalculator.js
import React, { useState } from "react";

const BACCalculator9 = () => {
  const [drinks, setDrinks] = useState([
    { type: "beer", amount: "", volume: "", percentage: "" }, // Initial input group
  ]);

  const [gender, setGender] = useState("man");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [totalBAC, setTotalBAC] = useState(0);

  const calculateBloodVolume = (gender, height, weight) => {
    if (gender === "man") {
      return 0.3669 * height * height * height + 0.03219 * weight + 0.6041;
    } else {
      return 0.3561 * height * height * height + 0.03308 * weight + 0.1833;
    }
  };

  const calculateBAC = (amount, volume, percentage, gender, height, weight) => {
    // Perform BAC calculation using the input values
    const drinkBAC = (amount * percentage * volume) / 100;
    const bloodVolume = calculateBloodVolume(gender, height, weight);
    return drinkBAC / bloodVolume;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let total = 0;
    drinks.forEach((drink) => {
      const drinkBAC = calculateBAC(
        drink.amount,
        drink.volume,
        drink.percentage,
        gender,
        height,
        weight
      );
      console.log("Drink BAC:", drinkBAC);
      total += drinkBAC;
    });
    setTotalBAC(total);
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
      <h2>Blood Alcohol Concentration Calculator</h2>
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
            <h3>Drink #{index + 1}</h3>
            <label>
              Type:
              <select
                value={drink.type}
                onChange={(e) => handleTypeChange(index, e.target.value)}
              >
                <option value="beer">Beer</option>
                <option value="wine">Wine</option>
                <option value="distilled">Distilled (Spirits)</option>
                <option value="liqueurs">Liqueurs</option>
              </select>
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
              Delete
            </button>
          </div>
        ))}

        <br />
        <button type="button" onClick={handleAddDrink}>
          Add Drink
        </button>

        <br />
        <button type="submit">Calculate BAC</button>

        {totalBAC !== 0 && (
          <div>
            <h3>Total BAC:</h3>
            <p>{totalBAC}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default BACCalculator9;
