import BACCalculator21 from "./components/BACCalculator21.jsx";
import FlowBanner from "./components/FlowBanner.jsx";
import Header from "./components/Header.jsx";
function App() {
  return (
    <>
      <FlowBanner />
      <Header />
      <main>
        <BACCalculator21 />
      </main>
    </>
  );
}

export default App;
