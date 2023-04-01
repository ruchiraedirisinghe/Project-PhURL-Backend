import React, { useState } from "react";
import axios from "axios";

function PhURL() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [probability, setProbability] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/phishingweb/predict/", { url: url }).then((response) => {
      setResult(response.data.result);
      setProbability(response.data.probability);
    });
  };

  return (
    <div>
      <h1>PhURL</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="url">Enter URL:</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Predict</button>
      </form>
      {result && (
        <div>
          <h2>Result: {result}</h2>
          <p>Probability: {probability}</p>
        </div>
      )}
    </div>
  );
}

export default PhURL;