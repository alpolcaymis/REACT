import Adana from "./components/Adana/Adana.jsx";
import Header from "./components/Header.jsx";
import Promil from "./components/Promil.jsx";
import Login from "./components/StateLogin.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <Promil />
        <Adana />
      </main>
    </>
  );
}

export default App;
