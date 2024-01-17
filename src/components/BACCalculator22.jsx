// BACCalculator.js
import React, { useState, useEffect } from "react";

// Import SVG icons
import BeerIcon from "../icons/beer.svg";
import WineIcon from "../icons/wine.svg";
import DistilledIcon from "../icons/distilled.svg";
import LiqueursIcon from "../icons/liqueurs.svg";
import VodkaIcon from "../icons/vodka.svg";
import { XCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import TimeIcon4 from "../assets/time4.svg";

import Jager3 from "../images/jager4.png";

const generateCustomId = () => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `${timestamp}-${random}`;
};

const BACCalculator22 = () => {
  const initialDrink = {
    id: generateCustomId(),
    type: "beer",
    amount: "",
    volume: "",
    percentage: "",
  };

  const [drinks, setDrinks] = useState([initialDrink]);

  const [gender, setGender] = useState("man");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [hoursPassed, setHoursPassed] = useState(0); // New state for hours passed

  const [totalAlcoholMillimeter, setTotalAlcoholMillimeter] = useState(0);
  const [totalAlcoholMilligram, setTotalAlcoholMilligram] = useState(0);
  const [bloodVolume, setBloodVolume] = useState(0);
  const [calculatedBACBeforeDeduction, setCalculatedBACBeforeDeduction] =
    useState(0);
  const [calculatedBACAfterDeduction, setCalculatedBACAfterDeduction] =
    useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Use useEffect to handle the calculation after state updates
    const calculatedBloodVolume = calculateBloodVolume();
    setBloodVolume(calculatedBloodVolume);

    // Use totalAlcoholMilligram in the calculation
    const BACBeforeDeduction =
      (totalAlcoholMilligram / calculatedBloodVolume) * 100; // Before deduction
    setCalculatedBACBeforeDeduction(BACBeforeDeduction);

    // Deduct based on hoursPassed value
    let BACAfterDeduction = BACBeforeDeduction - hoursPassed * 0.15;

    // Ensure the calculated BAC is not negative
    BACAfterDeduction = Math.max(0, BACAfterDeduction);

    setCalculatedBACAfterDeduction(BACAfterDeduction);
  }, [totalAlcoholMilligram, height, weight, gender, hoursPassed]); // Dependencies added to trigger the effect on state changes

  const calculateBloodVolume = () => {
    const heightInMeters = height / 100; // Convert height from centimeters to meters
    let bloodVolume;
    if (gender === "man") {
      bloodVolume =
        0.3669 * heightInMeters * heightInMeters * heightInMeters +
        0.03219 * weight +
        0.6041;
    } else {
      bloodVolume =
        0.3561 * heightInMeters * heightInMeters * heightInMeters +
        0.03308 * weight +
        0.1833;
    }
    // Convert blood volume to milliliters
    return bloodVolume * 1000;
  };

  const calculateAlcoholMillimeter = (amount, volume, percentage) => {
    // Perform alcohol millimeter calculation using the input values
    return (amount * percentage * volume) / 100;
  };

  const renderResult = (title, value) => (
    <div>
      <h3>{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );

  const drinkTypeIcons = {
    beer: <img src={BeerIcon} alt="Beer Icon" />,
    wine: <img src={WineIcon} alt="Wine Icon" />,
    distilled: (
      <div className="relative">
        <img
          className="absolute  right-3/4 w-1/2 bottom-0 border-none"
          src={LiqueursIcon}
          alt="Distilled Icon"
        />
        <img
          className="absolute right-4  mr-2 bottom-0 border-none"
          src={VodkaIcon}
          alt="Distilled Icon"
        />

        <img className="" src={DistilledIcon} alt="Distilled Icon" />
      </div>
    ),

    liqueurs: <img src={Jager3} alt="Liqueurs Icon" />,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    let totalAlcohol = 0;
    drinks.forEach((drink) => {
      const alcoholMillimeter = calculateAlcoholMillimeter(
        drink.amount,
        drink.volume,
        drink.percentage
      );
      console.log("Alcohol Millimeter:", alcoholMillimeter);
      totalAlcohol += alcoholMillimeter;
    });
    setTotalAlcoholMillimeter(totalAlcohol);

    // Convert totalAlcoholMillimeter to totalAlcoholMilligram
    setTotalAlcoholMilligram(totalAlcohol * 0.789);
  };

  const handleAddDrink = () => {
    setDrinks([
      ...drinks,
      {
        id: generateCustomId(),
        type: "beer",
        amount: "",
        volume: "",
        percentage: "",
      },
    ]);
  };

  const handleDeleteDrink = (id) => {
    const updatedDrinks = drinks.filter((drink) => drink.id !== id);
    setDrinks(updatedDrinks);
  };

  const handleInputChange = (id, fieldName, value) => {
    const updatedDrinks = drinks.map((drink) => {
      if (drink.id === id) {
        return { ...drink, [fieldName]: value };
      }
      return drink;
    });
    setDrinks(updatedDrinks);
  };

  const getDefaultValuesForType = (drinkType) => {
    switch (drinkType) {
      case "beer":
        return { amount: "1", volume: "500", percentage: "5" };
      case "wine":
        return { amount: "1", volume: "150", percentage: "13" };
      case "distilled":
        return { amount: "1", volume: "50", percentage: "40" };
      case "liqueurs":
        return { amount: "1", volume: "50", percentage: "25" };
      // Add cases for other drink types if needed
      default:
        return {};
    }
  };

  const handleTypeChange = (id, value) => {
    const updatedDrinks = drinks.map((drink) => {
      if (drink.id === id) {
        return { ...drink, type: value, ...getDefaultValuesForType(value) };
      }
      return drink;
    });
    setDrinks(updatedDrinks);
  };

  const getMessageForBAC = () => {
    if (calculatedBACAfterDeduction < 0.5) {
      return {
        message: "Testi geçtiniz. Güvenle Trafiğe çıkabilirsiniz.",
        symbol: "✅",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="white"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16h-1v-6h2v5h-1v1zm0-7h-1V7h2v4z"
            />
          </svg>
        ),
        backgroundColor: "green",
        color: "white",
      };
    } else if (
      calculatedBACAfterDeduction >= 0.5 &&
      calculatedBACAfterDeduction <= 1.0
    ) {
      return {
        message:
          "Ceza yersin! 1-2 saat sonra trafiğe çıkabilirsiniz. Ek bilgi: yakalanırsanız hastanede kan testi talep etme hakkına hukuken sahipsiniz.",
        symbol: "⚠️",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="yellow"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16h-1v-6h2v5h-1v1zm0-7h-1V7h2v4z"
            />
          </svg>
        ),
        backgroundColor: " #806000",
        color: "black",
      };
    } else {
      return {
        message: "Kesin Ceza Yersin! Arabadan uzak durun!",
        symbol: "❌",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="red"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16h-1v-6h2v5h-1v1zm0-7h-1V7h2v4z"
            />
          </svg>
        ),
        backgroundColor: "#800000",
        color: "#fff",
      };
    }
  };

  const { message, symbol, icon, backgroundColor, color } = getMessageForBAC();

  return (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <fieldset className="info-section border pb-4 p-2">
          <legend className="text-center">
            <p className="px-4">Fiziksel Özellikleriniz</p>
          </legend>

          <div className="flex justify-center items-center gap-3 p-2">
            <label className=" flex-1 text-center  rounded-md">
              <input
                type="radio"
                id="gender-man"
                value="man"
                checked={gender === "man"}
                onChange={() => setGender("man")}
              />
              Erkek
            </label>
            <label className="flex-1 text-center  rounded-md">
              <input
                className=""
                type="radio"
                id="gender-female"
                value="woman"
                checked={gender === "woman"}
                onChange={() => setGender("woman")}
              />
              Kadın
            </label>
          </div>

          <div className="flex justify-around  mt-2 gap-3">
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

        <section className="drinks-section mt-4 ">
          <p className="text-center">Alınan Alkolleri Giriniz</p>
          <div className=" ">
            {drinks.map((drink, index) => (
              <div
                className="drink-item flex gap-2 justify-between  mt-2"
                key={drink.id}
              >
                <div className="drink-content flex-1 ">
                  <label>
                    Alkol Türü :
                    <select
                      id={`type-${drink.id}`}
                      value={drink.type}
                      onChange={(e) =>
                        handleTypeChange(drink.id, e.target.value)
                      }
                      required
                    >
                      <option value="beer">Bira</option>
                      <option value="wine">Şarap</option>
                      <option value="distilled">
                        Distile (vodka,gin,tequila...)
                      </option>
                      <option value="liqueurs">
                        Likör (Baileys,Jägermeister,Campari...)
                      </option>
                      {/* Add more options for other drink types as needed */}
                    </select>
                  </label>

                  <div className="flex justify-between items-center gap-2">
                    <div className="w-[50%]">{drinkTypeIcons[drink.type]}</div>
                    <div className="w-[50%] p-2">
                      <label>
                        Adet sayısı :
                        <input
                          className="placeholder-zinc-300"
                          type="number"
                          placeholder="adet"
                          id={`amount-${drink.id}`}
                          min="0"
                          max="30"
                          value={drink.amount}
                          onChange={(e) =>
                            handleInputChange(
                              drink.id,
                              "amount",
                              e.target.value
                            )
                          }
                          required
                        />
                      </label>
                      <label>
                        hacim : (mL)
                        <input
                          type="number"
                          className="placeholder-zinc-300"
                          placeholder="500 mL"
                          id={`volume-${drink.id}`}
                          min="1"
                          max="2000"
                          value={drink.volume}
                          onChange={(e) =>
                            handleInputChange(
                              drink.id,
                              "volume",
                              e.target.value
                            )
                          }
                          required
                        />
                      </label>
                      <label className="">
                        <p className=" ">Alkol oranı: %</p>
                        <input
                          type="number"
                          className="placeholder-zinc-300 "
                          placeholder="vol % abv"
                          id={`percentage-${drink.id}`}
                          min="0"
                          max="100"
                          value={drink.percentage}
                          onChange={(e) =>
                            handleInputChange(
                              drink.id,
                              "percentage",
                              e.target.value
                            )
                          }
                          required
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="delete-icon flex-none w-[10%] ">
                  <label>
                    <button
                      className="text-center"
                      type="button"
                      onClick={() => handleDeleteDrink(drink.id)}
                    >
                      <XCircleIcon
                        className="solid rounded-lg h-8 w-8 text-red-600 mx-auto active:bg-black"
                        fill="none"
                        // viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      Delete
                    </button>
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full mt-4 flex justify-center bg-[#ff8d1c]  border-2 rounded-md">
            <button
              className="flex justify-center items-center gap-1 py-2              
              text-sm w-full    bg-opacity-25 hover:bg-opacity-45 focus:bg-opacity-45 active:bg-opacity-45
              bg-emerald-950 
              "
              type="button"
              onClick={handleAddDrink}
            >
              <PlusCircleIcon
                className="w-6 h-6"
                // fill="none"
                // viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="0.01"
              />
              Yeni <strong>Alkol Ekle</strong>
            </button>
          </div>
        </section>

        <fieldset className="additional-section my-4 border">
          <legend className="text-center  px-5">
            <div className="flex justify-center items-center gap-1">
              Alkol Alma Süresi
              <img
                src={TimeIcon4}
                alt="timeicon"
                className="w-10 border-none"
              />
            </div>
          </legend>
          <div className="flex flex-wrap justify-center text-center">
            <label htmlFor="hours" className="mb-2">
              İlk Alkolü kaç saat önce içtin?
            </label>
            <input
              className="w-[80%] mb-3 "
              type="number"
              id="hours"
              min="0"
              value={hoursPassed}
              onChange={(e) => setHoursPassed(e.target.value)}
              required
            />
          </div>
        </fieldset>

        <section className="calculate-button-section ">
          <div className="flex justify-center ">
            <button type="submit" className="button border-2 ">
              Promil Hesapla
            </button>
          </div>
        </section>

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

          <div className="  text-center">
            <div
              style={{ backgroundColor }}
              className="font-bold text-3xl p-1 border"
            >
              <h3>Promil</h3>
              <p className="text-5xl">
                {calculatedBACAfterDeduction.toFixed(2)}
              </p>
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
        {""}
      </form>
    </div>
  );
};

export default BACCalculator22;
