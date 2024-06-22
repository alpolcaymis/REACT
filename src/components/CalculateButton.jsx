import React, { useState } from "react";

const CalculateButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
      }, 300); // Reset after 300ms to simulate the style change effect
    }
  };

  return (
    <section className="calculate-button-section">
      <div className="flex justify-center">
        <button
          type="submit"
          onClick={handleClick}
          className={`button w-full max-w-xs border-2 bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform ${
            clicked ? "scale-105" : ""
          } focus:outline-none focus:ring-4 focus:ring-blue-300 sm:max-w-md md:max-w-lg`}
        >
          Promil Hesapla
        </button>
      </div>
    </section>
  );
};

export default CalculateButton;
