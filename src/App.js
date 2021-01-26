import { useState, useEffect } from "react";
import Entry from "./Entry";
import "./App.css";

export default function App() {
  const [entries, setEntries] = useState([
    {
      amount: "",
      count: "",
    },
  ]);
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
      <div className="calc-action">
        <button onClick={clear} className="clear-btn">
          Clear
        </button>
      </div>
      {entries.map((entry, idx) => (
        <Entry
          key={idx}
          amount={entry.amount}
          count={entry.count}
          onChange={(e) => handleChange(e, idx)}
          onDelete={() => deleteEntry(idx)}
          canDelete={idx !== entries.length - 1} // last entry is undeletable
        />
      ))}
      <div className="total">
        Total: <span>{computeTotal().toLocaleString()}</span>
      </div>
    </div>
  );
}
