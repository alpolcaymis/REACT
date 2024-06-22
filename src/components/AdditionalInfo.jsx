import React from "react";
import TimeIcon4 from "../assets/time4.svg";

const AdditionalInfo = ({ hoursPassed, setHoursPassed }) => (
  <fieldset className="additional-section my-4 border">
    <legend className="text-center  px-5">
      <div className="flex justify-center items-center gap-1">
        Alkol Alma Süresi
        <img src={TimeIcon4} alt="timeicon" className="w-10 border-none" />
      </div>
    </legend>
    <div className="flex flex-wrap justify-center text-center">
      <label htmlFor="hours" className="mb-2">
        İlk Alkolü kaç saat önce içtin?
      </label>
      <input
        className="w-[80%] mb-3  font-mono text-xl "
        type="number"
        id="hours"
        min="0"
        value={hoursPassed}
        onChange={(e) => setHoursPassed(e.target.value)}
        required
      />
    </div>
  </fieldset>
);

export default AdditionalInfo;
