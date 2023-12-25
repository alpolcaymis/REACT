import icon from "../assets/send.png";
export default function Places({ name, places, fallbackText, onSelectPlace }) {
  return (
    <section className="places-category">
      <h2>{name}</h2>
      {places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {console.log(places)}
      {/* {places && places[0] !== undefined */}
      {/* //   ? console.log(places[0].city) */}
      {/* //   : console.log("places evet undefined")} */}
      {
        <ul className="places">
          {places[4] !== undefined &&
            places.map(
              (place) =>
                places[4] !== undefined && (
                  <li key={place.cid} className="place-item">
                    <button onClick={() => onSelectPlace(place.cid)}>
                      {/* <img src={place.photo} alt="" className="photo" /> */}
                      <img
                        src={place.photo || "../assets/indir.jpg"}
                        alt=""
                        className="photo"
                      />

                      <h3>{place.name}</h3>
                      <h4>{place.borough}</h4>
                      <a href={place.location_link} target="_blank">
                        <img src={icon} className="icon-direction"></img>
                      </a>
                    </button>
                  </li>
                )
            )}
        </ul>
      }
    </section>
  );
}
