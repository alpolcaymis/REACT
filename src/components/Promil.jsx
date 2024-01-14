import { useState, useEffect } from "react";

let mlAlkol;
let mlKan;
let mgAlkol = mlAlkol * 0.789;
let promil = mgAlkol / mlKan;

// Formul:
// Erkek: (0.3669 x boy(metre)3) +(0.3219 * ağırlık(kg)) + 0.6041
// Kadın: (0.3561 x boy(metre)3) +(0.3308 * ağırlık(kg))) + 0.1833

0.3669 * height * height * height + 0.03219 * weight + 0.6041;
0.3561 * height * height * height + 0.03308 * weight + 0.1833;

let div;

export default function Promil() {
  // promil hesabı(miligram alkol/mililitre kan)
  // 0.2 Promil	20 mg alkol/100 ml kan (20:100=0.2)
  // 1 mililitre alkolün ağırlığı 0.789 gram,
  // 1 gram alkolün hacmi 1.268 mililitredir

  const [total, setTotal] = useState();

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const bac = Number(data.weight) * Number(data.height);
    setTotal(bac);
    console.log("data", data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      <p className="form-actions">
        <button type="submit" className="button">
          Submit
        </button>
      </p>
    </form>
  );
}
