import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import ModelsList from './ModelsList';
import ModelForm from './ModelForm';
import AutomobilesList from './AutomobilesList';
import AutomobileForm from './AutomobileForm';
import SalespersonForm from './SalespersonForm';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import ServiceForm from './ServiceForm';
import ServicesList from './ServicesList';

function App(props) {
  if (props.manufacturers === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturersList manufacturers={props.manufacturers} />}/>
            <Route path= "new" element={<ManufacturerForm />} />
          </Route>
          <Route path="models">
            <Route index element={<ModelsList models={props.models} />}/>
            <Route path= "new" element={<ModelForm />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobilesList autos={props.autos} />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="salespersons">
            <Route index element= {<SalespersonForm />} />
          </Route>
          <Route path="technicians">
            <Route index element={<TechnicianList technicians={props.technicians} />} />
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="service">
            <Route index element={<ServicesList appointments={props.appointments} />} />
            <Route path="new" element={<ServiceForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
