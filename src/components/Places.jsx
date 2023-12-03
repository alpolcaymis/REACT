export default function Places({ name, places, fallbackText, onSelectPlace }) {
  return (
    <section className="places-category">
      <h2>{name}</h2>
      {places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.cid} className="place-item">
              <button onClick={() => onSelectPlace(place.cid)}>
                <img src={place.photo} />
                <h3>{place.name}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
