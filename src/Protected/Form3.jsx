<form onSubmit={handleSubmit}>
  <div>
    <h3>Personal Information</h3>
    <label>
      Gender:
      <div>
        <label>
          <input
            type="radio"
            id="gender-man"
            value="man"
            checked={gender === "man"}
            onChange={() => setGender("man")}
          />
          Man
        </label>
        <label>
          <input
            type="radio"
            id="gender-female"
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
  </div>
  <div>
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

  {drinks.map((drink, index) => (
    <div key={drink.id}>
      <h3>Drink #{index + 1}</h3>
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
      <br />
      <label>
        Amount:
        <input
          type="number"
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
      <button type="button" onClick={() => handleDeleteDrink(drink.id)}>
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
        id="hours"
        min="0"
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
</form>;
