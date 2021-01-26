const DENOMINATIONS = [1000, 500, 200, 100, 50, 20, 10];

export default function Entry({
  amount,
  count,
  onChange,
  canDelete,
  onDelete,
}) {
  return (
    <div className="entry">
      <div className="select">
        <select name="amount" value={amount} onChange={onChange}>
          <option value="">select a denomination</option>
          {DENOMINATIONS.map((amount) => (
            <option value={amount} key={amount}>
              {amount.toLocaleString()}
            </option>
          ))}
        </select>
      </div>
      <div>&times;</div>

      <div>
        <input
          type="number"
          name="count"
          placeholder="enter count"
          min="1"
          step="1"
          value={count}
          onChange={onChange}
        />
      </div>
      <div> = {(amount * count).toLocaleString()}</div>
      {canDelete && (
        <button onClick={onDelete} style={{ marginLeft: "10px" }}>
          &times;
        </button>
      )}
    </div>
  );
}
