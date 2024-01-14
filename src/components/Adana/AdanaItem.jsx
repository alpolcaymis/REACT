function AdanaItem({ id, type, amount, size, percentage, remove }) {
  // console.log("id", id);
  return (
    <li className="border-black border grid grid-cols-5 items-center place-items-center  bg-yellow-700 rounded-sm p-1 text-black">
      <select id={id} name="type" required defaultValue={type}>
        <option value="beer">Beer</option>
        <option value="wine">Wine</option>
        <option value="liqueur">Liqueur</option>
        <option value="raki">Rakı</option>
      </select>
      <p>{amount}</p>
      <p>{size}</p>
      <p>{percentage}</p>
      <button
        onClick={() => {
          remove(id);
        }}
        className="bg-sky-800 text-white font-sans hover:bg-sky-500 rounded-sm border px-2"
      >
        Delete
      </button>
    </li>
  );
}

export default AdanaItem;
