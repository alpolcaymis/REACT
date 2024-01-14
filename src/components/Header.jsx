import logoImg from "../assets/logo.jpg";
import beerImg from "../assets/beer2.png";

export default function Header() {
  return (
    <>
      {/* <img className="mx-auto" src={beerImg} alt="A form and a pencil" /> */}
      <h1 className="font-thin text-[1.2rem] text-center mt-16">
        Blood Alcohol Concentration Calculator
      </h1>
    </>
  );
}
