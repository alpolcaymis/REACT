import React from "react";

const ResultSection = ({
  formSubmitted,
  calculatedBACAfterDeduction,
  bloodVolume,
  totalAlcoholMillimeter,
  totalAlcoholMilligram,
  calculatedBACBeforeDeduction,
  message,
  symbol,
  icon,
  backgroundColor,
  color,
}) => {
  const renderResult = (title, value) => (
    <div>
      <h3>{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );

  return (
    <fieldset className="results-section border">
      <legend className="text-center mb-2 p-2 border px-3 ">
        TEST SONUÇLARI
      </legend>

      {formSubmitted && (
        <div
          style={{ backgroundColor, color }}
          className="flex justify-around items-center min-h-12"
        >
          <div className="">{icon}</div>
          <p className=" text-center ">{message}</p>
          <div className="">{symbol}</div>
        </div>
      )}

      <div className="lato  text-center">
        <div
          style={{ backgroundColor }}
          className="font-bold text-3xl p-1 border"
        >
          <h3>Promil</h3>
          <p className="text-5xl">{calculatedBACAfterDeduction.toFixed(2)}</p>
          <p className="text-base">(her 100 ml kan için)</p>
        </div>
        <div>
          {renderResult("Kan Hacminiz (mL)", bloodVolume.toFixed(2))}
          {renderResult(
            "Toplam Alınan Alkol (mL)",
            totalAlcoholMillimeter.toFixed(1)
          )}
          {renderResult(
            "Toplam Alınan Alkol (mg)",
            totalAlcoholMilligram.toFixed(1)
          )}
          {renderResult(
            "Promil (İlk Alındığı Zaman) ",
            calculatedBACBeforeDeduction.toFixed(2)
          )}
          <p className="text-xs">(her 100 ml kan için)</p>
        </div>
      </div>
    </fieldset>
  );
};

export default ResultSection;
