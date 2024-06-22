// UserInfoForm.js
import React from "react";

const UserInfoForm = ({
  gender,
  setGender,
  height,
  setHeight,
  weight,
  setWeight,
}) => (
  <fieldset className="info-section border pb-4 p-2">
    <legend className="text-center">
      <p className="px-4">Fiziksel Özellikleriniz</p>
    </legend>

    <div className="flex justify-center items-center gap-3 p-2">
      <label className="flex-1 text-center rounded-md">
        <input
          type="radio"
          id="gender-man"
          value="man"
          checked={gender === "man"}
          onChange={() => setGender("man")}
        />
        Erkek
      </label>
      <label className="flex-1 text-center rounded-md">
        <input
          type="radio"
          id="gender-female"
          value="woman"
          checked={gender === "woman"}
          onChange={() => setGender("woman")}
        />
        Kadın
      </label>
    </div>

    <div className="flex justify-around mt-2 gap-3">
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

export default UserInfoForm;
