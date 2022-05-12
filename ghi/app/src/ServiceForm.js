import React from 'react';

class ServiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: "",
      vin: "",
      date_time: "",
      technician: "",
      technicians: [],
      reason: "",
      
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeOwner = this.handleChangeOwner.bind(this);
    this.handleChangeVin = this.handleChangeVin.bind(this);
    this.handleChangeDateTime = this.handleChangeDateTime.bind(this);
    this.handleChangeTechnician = this.handleChangeTechnician.bind(this);
    this.handleChangeReason = this.handleChangeReason.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8080/api/technicians/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      this.setState({ technicians: data.technicians });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.technicians


    const serviceUrl = 'http://localhost:8080/api/service/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(serviceUrl, fetchConfig);
    console.log(response)
    if (response.ok) {
      const newService = await response.json();
      console.log(newService);
      this.setState({
        owner: '',
        vin: '',
        date_time: '',
        technician: '',
        reason: '',
      });
    }
  }

  handleChangeOwner(event) {
    const value = event.target.value;
    this.setState({ owner: value });
  }

  handleChangeVin(event) {
    const value = event.target.value;
    this.setState({ vin: value });
  }

  handleChangeDateTime(event) {
    const value = event.target.value;
    this.setState({ date_time: value });
  }

  handleChangeTechnician(event) {
    const value = event.target.value;
    this.setState({ technician: value });
  }

  handleChangeReason(event) {
    const value = event.target.value;
    this.setState({ reason: value });
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Schedule a Service Appointment!</h1>
            <form onSubmit={this.handleSubmit} id="create-service-appointment-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeOwner} value={this.state.owner} placeholder="Owner" required type="text" name="owner" id="owner" className="form-control" />
                <label htmlFor="owner">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeVin} value={this.state.vin} placeholder="VIN #" required type="text" name="vin" id="vin" className="form-control" />
                <label htmlFor="vin">VIN #</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeDateTime} value={this.state.date_time} placeholder="Date/Time" required type="datetime-local" name="date_time" id="date_time" className="form-control" />
                <label htmlFor="date_time">Date/Time</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChangeTechnician} value={this.state.technician} required name="technician" id="technician" className="form-select">
                  <option value="">Choose a Technician</option>
                  {this.state.technicians.map(technician => {
                    return (
                      <option key={technician.id} value={technician.id}>{technician.name}</option>
                    )
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeReason} value={this.state.reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
                <label htmlFor="reason">Reason for service</label>
              </div>
              <button onClick={this.handleSubmit} className="btn btn-success">Add</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ServiceForm;
