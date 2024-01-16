import BACCalculator22 from "./components/BACCalculator22.jsx";
import FlowBanner from "./components/FlowBanner.jsx";
import Header from "./components/Header.jsx";
function App() {
  return (
    <>
      <FlowBanner />
      <Header />
      <main>
        <BACCalculator22 />
      </main>
    </>
  );
}

export default App;
