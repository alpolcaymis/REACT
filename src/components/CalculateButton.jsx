import React, { useState } from "react";

const CalculateButton = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <section className="calculate-button-section">
      <div className="flex justify-center">
        <button
          type="submit"
          className={`w-full max-w-xs bg-[#147b73] text-[#d9e2f1] font-bold py-2 px-4 text-2xl rounded border border-[#ccfaf6ad] shadow-[0_2px_10px_rgba(193,193,193,0.8)] cursor-pointer transition duration-300 ease-in-out transform ${
            clicked ? "scale-105" : ""
          } focus:outline-none focus:ring-4 focus:ring-blue-300 m-4 mb-6 sm:max-w-md md:max-w-lg`}
        >
          Promil Hesapla
        </button>
      </div>
    </section>
  );
};

export default CalculateButton;
