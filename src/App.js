import React, { useState } from "react";

function App() {
  const [items, setItems] = useState([{ name: "", price: "" }]);
  const [totalCost, setTotal] = useState(0);
  const [averageCost, setAverage] = useState(0);

  const handleChange = (index, event) => {
    const newItems = [...items];
    newItems[index][event.target.name] = event.target.name === "price" 
      ? parseFloat(event.target.value) || "" 
      : event.target.value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { name: "", price: "" }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = items.map(item => parseFloat(item.price)).filter(price => !isNaN(price));
    const total = values.reduce((acc, curr) => acc + curr, 0);
    const average = values.length > 0 ? total / values.length : 0;

    setTotal(total);
    setAverage(average);

    await fetch("http://localhost:8080/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    });
  };

  return (
    <div className=" text-white flex flex-col items-center justify-center min-h-screen bg-slate-700">
      <h1 className="text-3xl font-bold mb-5 uppercase">Techverin InternShip App</h1>
      <form 
        onSubmit={handleSubmit} 
        className="bg-slate-600 p-6 rounded shadow-md w-full max-w-lg"
      >
        {items.map((item, index) => (
          <div key={index} className="flex mb-4">
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={item.name}
              onChange={(event) => handleChange(index, event)}
              className=" text-blck  bg-slate-500  p-2 rounded w-1/2 mr-2"
            />
            <input
              type="number"
              name="price"
              placeholder="Item Price"
              value={item.price}
              onChange={(event) => handleChange(index, event)}
              className=" text-blck  bg-slate-500  p-2 rounded w-1/2"
            />
          </div>
        ))}
        <div className="flex justify-between mb-4">
          <button 
            type="button" 
            onClick={handleAddItem} 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Add Item
          </button>
          <button 
            type="submit" 
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Calculate
          </button>
        </div>
      </form>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Results</h2>
        <p className="text-lg">Total Cost: <span className="font-bold">${totalCost.toFixed(2)}</span></p>
        <p className="text-lg">Average Cost: <span className="font-bold">${averageCost.toFixed(2)}</span></p>
      </div>
    </div>
  );
}

export default App;
