import React, { useState, useEffect, useRef } from "react";

function App() {
  const [present, setPresent] = useState([]);
  const [past, setPast] = useState([]);
  const prevPresentRef = useRef();

  useEffect(() => {
    if (prevPresentRef.current !== present) {
      setPast((prevPast) => [...prevPast, prevPresentRef.current]);
      prevPresentRef.current = present;
    }
  }, [present]);

  const handleClick = (item) => {
    setPresent((prevPresent) => [...prevPresent, item]);
  };

  return (
    <div>
      <ul>
        {present.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={() => handleClick(Math.random())}>Add Item</button>
      <ul>
        {past.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;