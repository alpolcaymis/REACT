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
          onChange={(e) => handleInputChange(index, "amount", e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Volume per drink (in milliliters):
        <input
          type="number"
          value={drink.volume}
          onChange={(e) => handleInputChange(index, "volume", e.target.value)}
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
</form>;
