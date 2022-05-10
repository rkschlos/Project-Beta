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
  let manufacturerData, automobileData;
  const manufacturerResponse = await fetch('http://localhost:8100/api/manufacturers/');
  const automobileResponse = await fetch('http://localhost:8100/api/automobiles/');

  if (manufacturerResponse.ok) {
    manufacturerData = await manufacturerResponse.json();
    console.log('manufacturer data: ', manufacturerData)
  } else {
    console.error(manufacturerResponse);
  }

  if (automobileResponse.ok) {
    automobileData = await automobileResponse.json();
    console.log('automobile data: ', automobileData)
  } else {
    console.error(automobileResponse);
  }

  
  root.render(
    <React.StrictMode>
      <App manufacturers={manufacturerData.manufacturers} autos={automobileData.autos}/>
    </React.StrictMode>
  );
}

loadInventory();