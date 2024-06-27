import React from "react";

const PhysicalAttributes = ({
  gender,
  setGender,
  height,
  setHeight,
  weight,
  setWeight,
}) => (
  <fieldset className="info-section border pb-2.5 p-2">
    <legend className="text-center">
      <p className="px-4">Fiziksel Özellikleriniz</p>
    </legend>

    <div className="flex justify-center items-center gap-3 px-2 py-0.5">
      <label className="flex flex-col items-center flex-1 text-center rounded-md">
        <input
          type="radio"
          id="gender-man"
          value="man"
          checked={gender === "man"}
          onChange={() => setGender("man")}
          className="mb-1 h-6 w-6" // Adjusts the size of the radio button
        />
        Erkek
      </label>
      <label className="flex flex-col items-center flex-1 text-center rounded-md">
        <input
          type="radio"
          id="gender-female"
          value="woman"
          checked={gender === "woman"}
          onChange={() => setGender("woman")}
          className="mb-1 h-6 w-6" // Adjusts the size of the radio button
        />
        Kadın
      </label>
    </div>

    <div className="flex justify-around  mt-2 gap-4 px-1">
      <label>
        Boyunuz (cm):
        <input
          type="number"
          className="placeholder-zinc-300"
          placeholder="santimetre"
          id="height"
          min="110"
          max="250"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
      </label>
      <label>
        Kilonuz (kg):
        <input
          type="number"
          className="placeholder-zinc-300"
          placeholder="kilogram"
          id="weight"
          min="40"
          max="300"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
      </label>
    </div>
  </fieldset>
);

export default PhysicalAttributes;
