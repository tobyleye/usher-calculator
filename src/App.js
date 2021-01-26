import { useState, useEffect } from "react";
import "./App.css";

const DENOMINATIONS = [1000, 500, 200, 100, 50, 20, 10];

export default function App() {
  const [entries, setEntries] = useState([
    {
      amount: "",
      count: "",
    },
  ]);

  const [inspectState, setInspectState] = useState(false);

  useEffect(() => {
    // get the last entry
    const lastEntry = entries[entries.length - 1];
    const suggestNewEntry = lastEntry.amount && lastEntry.count;
    if (suggestNewEntry) {
      setEntries(
        entries.concat({
          amount: "",
          count: "",
        })
      );
    }
  }, [entries]);

  const handleChange = (evt, entryIndex) => {
    const { name, value } = evt.target;

    const newEntries = entries.map((entry, idx) => {
      if (idx === entryIndex) {
        return {
          ...entry,
          [name]: value,
        };
      }

      return entry;
    });

    setEntries(newEntries);
  };

  const computeTotal = () => {
    return entries.reduce((sum, { amount, count }) => sum + amount * count, 0);
  };

  const clear = () => {
    const confirm = window.confirm("Are you sure you want to clear?");
    if (confirm) {
      setEntries([
        {
          amount: "",
          count: "",
        },
      ]);
    }
  };

  const deleteEntry = (entryIndex) => {
    setEntries((entries) => entries.filter((_, idx) => idx !== entryIndex));
  };

  return (
    <div className="App">
      <h1>Usher Calculator</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <button onClick={() => setInspectState((show) => !show)}>
          Inspect state
        </button>
        <button
          onClick={clear}
          style={{
            background: "red",
            color: "white",
            border: "none",
            fontSize: "18px",
            padding: "4px 8px",
          }}
        >
          Clear
        </button>
      </div>
      {entries.map((entry, idx) => (
        <fieldset key={idx}>
          <span>
            <div className="select">
              <select
                name="amount"
                value={entry.amount}
                onChange={(evt) => handleChange(evt, idx)}
              >
                <option value="">select a denomination</option>
                {DENOMINATIONS.map((amount) => (
                  <option value={amount} key={amount}>
                    {amount.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
          </span>
          &times;
          <div>
            <input
              type="number"
              name="count"
              placeholder="enter count"
              min="1"
              step="1"
              value={entry.count}
              onChange={(evt) => handleChange(evt, idx)}
            />
          </div>
          <div> = {(entry.amount * entry.count).toLocaleString()}</div>
          {idx !== entries.length - 1 && (
            <button
              onClick={() => deleteEntry(idx)}
              style={{ marginLeft: "10px" }}
            >
              &times;
            </button>
          )}
        </fieldset>
      ))}

      <div style={{ marginTop: "10px" }}>
        Total:{" "}
        <span style={{ fontSize: 22 }}>{computeTotal().toLocaleString()}</span>
      </div>

      {inspectState ? (
        <div>
          <pre>{JSON.stringify(entries)}</pre>
        </div>
      ) : null}
    </div>
  );
}
