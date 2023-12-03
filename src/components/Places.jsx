export default function Places({ name, places, fallbackText, onSelectPlace }) {
  return (
    <section className="places-category">
      <h2>{name}</h2>
      {places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {places.length > 0 && (
        <ul className="places">
          {places.map((place, index) => (
            // <li key={place.cid} className="place-item">
            <li key={index} className="place-item">
              <button onClick={() => onSelectPlace(place.cid)}>
                <img src="https://lh5.googleusercontent.com/p/AF1QipN49g8gPXXzA__06agZXiNjSAMp0j4eRd0h0Gr_=w800-h500-k-no" />
                {/* {console.log(place)} */}
                {console.log(index, place)}

                {/* <img src={place.photo} /> */}
                {/* <img src={place.image.src} alt={place.image.alt} /> */}
                {/* <h3>{place.name}</h3> */}
                {/* <h3>{place.cid}</h3> */}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
