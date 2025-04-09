import { useState } from "react";
import "./App.css";

function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<number | string>("");
  const [error, setError] = useState("");

  const handleCalculate = async () => {
    setError("");
    setResult("");

    if (!a || !b) {
      setError("Both numbers are required");
      return;
    }

    const numA = Number(a);
    const numB = Number(b);

    if (isNaN(numA) || isNaN(numB)) {
      setError("Please enter valid numbers");
      return;
    }

    try {
      const response = await fetch(`/api/?a=${numA}&b=${numB}`);
      if (!response.ok) {
        throw new Error("API request failed");
      }
      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    }
  };

  return (
    <div className="card">
      <div className="input-group">
        <label htmlFor="numberA">First number (a):</label>
        <input
          id="numberA"
          type="number"
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder="Enter first number"
        />
      </div>

      <div className="input-group">
        <label htmlFor="numberB">Second number (b):</label>
        <input
          id="numberB"
          type="number"
          value={b}
          onChange={(e) => setB(e.target.value)}
          placeholder="Enter second number"
        />
      </div>

      <button onClick={handleCalculate} aria-label="Calculate division">
        Calculate Division
      </button>

      {error && <div className="error">{error}</div>}
      {result !== "" && (
        <div className="result">Result from API is: {result}</div>
      )}
    </div>
  );
}

export default App;
