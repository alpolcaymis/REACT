// BACCalculator.js
import React, { useState, useEffect } from "react";
import DrinkForm from "./DrinkForm";
import UserInfoForm from "./UserInfoForm";
import Results from "./Results";

// Import SVG icons
import Jager3 from "../images/jager4.png";
import BeerIcon from "../icons/beer.svg";
import WineIcon from "../icons/wine.svg";
import DistilledIcon from "../icons/distilled.svg";
import LiqueursIcon from "../icons/liqueurs.svg";
import VodkaIcon from "../icons/vodka.svg";
import TimeIcon4 from "../assets/time4.svg";

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
  const [hoursPassed, setHoursPassed] = useState(0);

  const [totalAlcoholMillimeter, setTotalAlcoholMillimeter] = useState(0);
  const [totalAlcoholMilligram, setTotalAlcoholMilligram] = useState(0);
  const [bloodVolume, setBloodVolume] = useState(0);
  const [calculatedBACBeforeDeduction, setCalculatedBACBeforeDeduction] =
    useState(0);
  const [calculatedBACAfterDeduction, setCalculatedBACAfterDeduction] =
    useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const calculatedBloodVolume = calculateBloodVolume();
    setBloodVolume(calculatedBloodVolume);

    const BACBeforeDeduction =
      (totalAlcoholMilligram / calculatedBloodVolume) * 100;
    setCalculatedBACBeforeDeduction(BACBeforeDeduction);

    let BACAfterDeduction = BACBeforeDeduction - hoursPassed * 0.15;
    BACAfterDeduction = Math.max(0, BACAfterDeduction);

    setCalculatedBACAfterDeduction(BACAfterDeduction);
  }, [totalAlcoholMilligram, height, weight, gender, hoursPassed]);

  const calculateBloodVolume = () => {
    const heightInMeters = height / 100;
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
    return bloodVolume * 1000;
  };

  const calculateAlcoholMillimeter = (amount, volume, percentage) => {
    return (amount * percentage * volume) / 100;
  };

  const drinkTypeIcons = {
    beer: <img src={BeerIcon} alt="Beer Icon" />,
    wine: <img src={WineIcon} alt="Wine Icon" />,
    distilled: (
      <div className="relative">
        <img
          className="absolute right-3/4 w-1/2 bottom-0 border-none"
          src={LiqueursIcon}
          alt="Distilled Icon"
        />
        <img
          className="absolute right-4 mr-2 bottom-0 border-none"
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
      totalAlcohol += alcoholMillimeter;
    });
    setTotalAlcoholMillimeter(totalAlcohol);
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
        backgroundColor: "#806000",
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
        <UserInfoForm
          gender={gender}
          setGender={setGender}
          height={height}
          setHeight={setHeight}
          weight={weight}
          setWeight={setWeight}
        />
        <DrinkForm
          drinks={drinks}
          drinkTypeIcons={drinkTypeIcons}
          handleInputChange={handleInputChange}
          handleDeleteDrink={handleDeleteDrink}
          handleTypeChange={handleTypeChange}
          handleAddDrink={handleAddDrink}
        />
        <fieldset className="additional-section my-4 border">
          <legend className="text-center px-5">
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
              className="w-[80%] mb-3 font-mono text-xl"
              type="number"
              id="hours"
              min="0"
              value={hoursPassed}
              onChange={(e) => setHoursPassed(e.target.value)}
              required
            />
          </div>
        </fieldset>
        <section className="calculate-button-section">
          <div className="flex justify-center">
            <button type="submit" className="button border-2">
              Promil Hesapla
            </button>
          </div>
        </section>
        <Results
          formSubmitted={formSubmitted}
          calculatedBACAfterDeduction={calculatedBACAfterDeduction}
          bloodVolume={bloodVolume}
          totalAlcoholMillimeter={totalAlcoholMillimeter}
          totalAlcoholMilligram={totalAlcoholMilligram}
          calculatedBACBeforeDeduction={calculatedBACBeforeDeduction}
          message={message}
          symbol={symbol}
          icon={icon}
          backgroundColor={backgroundColor}
          color={color}
        />
      </form>
    </div>
  );
};

export default BACCalculator22;
