import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


async function loadInventory() {
  const manufacturerResponse = await fetch('http://localhost:8100/api/manufacturers/');

  if (manufacturerResponse.ok) {
    const manufacturerData = await manufacturerResponse.json();

    root.render(
      <React.StrictMode>
        <App manufacturers={manufacturerData.manufacturers}/>
      </React.StrictMode>
    );

    console.log('manufacturer data: ', manufacturerData)
  } else {
    console.error(manufacturerResponse);
  }
}

loadInventory();