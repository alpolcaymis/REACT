import React, { useState } from "react";

const CalculateButton = ({ resultsRef }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    const form = e.target.form;
    if (form.checkValidity()) {
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
        if (resultsRef && resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // Reset after 300ms to simulate the style change effect
    } else {
      form.reportValidity();
    }
  };

  return (
    <div className="flex justify-center">
      <button
        type="submit"
        onClick={handleClick}
        className={`w-full max-w-xs bg-[#147b73] text-[#d9e2f1] font-bold py-2 px-4 text-2xl rounded border border-[#ccfaf6ad] shadow-[0_2px_10px_rgba(193,193,193,0.8)] cursor-pointer transition duration-300 ease-in-out transform ${
          clicked ? "scale-105" : ""
        } focus:outline-none focus:ring-4 focus:ring-blue-300 m-4 mb-6 sm:max-w-md md:max-w-lg`}
      >
        Promil Hesapla
      </button>
    </div>
  );
};

export default CalculateButton;
