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
  const modelResponse = await fetch('http://localhost:8100/api/models/');

  if (manufacturerResponse.ok && modelResponse.ok) {
    const manufacturerData = await manufacturerResponse.json();
    const modelData = await modelResponse.json();

    root.render(
      <React.StrictMode>
        <App manufacturers={manufacturerData.manufacturers} models={modelData.models}/>
      </React.StrictMode>
    );

    console.log('model data', modelData);
  
  } else {
    console.error(manufacturerResponse);
    console.error(modelResponse);
  }
}

loadInventory();