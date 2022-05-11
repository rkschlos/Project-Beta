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
  const salespersonResponse = await fetch('http://localhost:8090/api/salespersons/');
  const technicianResponse = await fetch('http://localhost:8080/api/technicians/');
  const serviceResponse = await fetch('http://localhost:8080/api/service/');
  const customerResponse = await fetch('http://localhost:8090/api/customers/');
  const salerecordResponse = await fetch('http://localhost:8090/api/salerecords/');
  let manufacturerData;
  let modelData;
  let automobileData;
  let salespersonData;
  let technicianData;
  let serviceData;
  let customerData;
  let salerecordData;

  if (manufacturerResponse.ok){
    manufacturerData = await manufacturerResponse.json();
  } else {
    console.error(manufacturerResponse);
  }

  if (modelResponse.ok) {
    modelData = await modelResponse.json();
  } else {
    console.error(modelResponse);
  }

  if (automobileResponse.ok){
    automobileData = await automobileResponse.json();
  } else {
    console.error(automobileResponse);
  }

  if (salespersonResponse.ok) {
    salespersonData = await salespersonResponse.json();
  } else {
    console.error(salespersonResponse);
  }

  if (technicianResponse.ok) {
    technicianData = await technicianResponse.json();
  } else {
    console.error(technicianResponse);
  }

  if (serviceResponse.ok) {
    serviceData = await serviceResponse.json();
  } else {
    console.error(serviceResponse);
  }

  if (customerResponse.ok) {
    customerData = await customerResponse.json();
  } else {
    console.error(customerResponse);
  }

  if (salerecordResponse.ok) {
    salerecordData = await salerecordResponse.json();
  } else {
    console.error(salerecordResponse);
  }

    root.render(
      <React.StrictMode>
        <App 
          manufacturers={manufacturerData.manufacturers} 
          models={modelData.models} 
          autos={automobileData.autos} 
          salespersons = {salespersonData.salespersons} 
          technicians = {technicianData.technicians}
          appointments = {serviceData.appointments}
          customers = {customerData.customers}
          salerecords = {salerecordData.salerecords}
        />
      </React.StrictMode>
    );

  
}
loadInventory();