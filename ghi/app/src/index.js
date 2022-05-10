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
  const automobileResponse = await fetch('http://localhost:8100/api/automobiles/');
  const technicianResponse = await fetch('http://localhost:8080/api/technicians/')

  if (manufacturerResponse.ok && modelResponse.ok && automobileResponse.ok && technicianResponse.ok) {
    const manufacturerData = await manufacturerResponse.json();
    const modelData = await modelResponse.json();
    const automobileData = await automobileResponse.json();
    const technicianData = await technicianResponse.json();

    root.render(
      <React.StrictMode>
        <App manufacturers={manufacturerData.manufacturers} models={modelData.models} autos={automobileData.autos} technicians={technicianData.technicians}/>
      </React.StrictMode>
    );

  } else {
    console.error(manufacturerResponse);
    console.error(modelResponse);
    console.error(automobileResponse);
    console.error(technicianResponse);
  }

}

loadInventory();