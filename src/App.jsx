import { useRef, useState, useEffect, useCallback } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

// import { AVAILABLE_PLACES } from "./data.js";
// import { data2 } from "./data2.js";
// import { data3 } from "./data3.js";
// import { data4 } from "./data4.js";
// import { data5 } from "./data5.js";
import { data6 } from "./data6.js";
let AVAILABLE_PLACES = data6;

const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIds.map(
  (id) => AVAILABLE_PLACES.find((place) => place.cid === id) // place.id =>  place.cid oldu
);

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.cid === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.cid === id);
      return [place, ...prevPickedPlaces];
    });

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.cid !== selectedPlace.current)
    );
    setModalIsOpen(false);

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)) //? bence gerek yok yinede id'i cid yaptım
    );
  }, []);

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Discover places worth visiting near you and create your personal
          collection of places.
          <br /> We are behind you to plan your day.
        </p>
      </header>
      <main>
        <Places
          name="I'd like to visit ..." //name => title oldu
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          name="Available Places" //name => title oldu
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
