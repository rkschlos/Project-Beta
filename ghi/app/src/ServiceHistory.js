import React from 'react';

class ServiceHistory extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        appointments: [],
        search: '',
      };
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const newState = {}
        newState[event.target.id] = event.target.value;
        this.setState(newState)
    }


  
    async componentDidMount() {
      const url = 'http://localhost:8080/api/service/';
  
      const response = await fetch(url);
  
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        this.setState({ appointments: data.appointments });
      }
    }

    async handleSearch(event) {
        event.preventDefault();
    
        const searchUrl = `http://localhost:8080/api/service/`;
        const fetchConfig = {
          method: "get",
        };

        const response = await fetch(searchUrl, fetchConfig);
        console.log(response)
        }

render() {
    return (
        <form className="form-inline" onSubmit={this.handleSearch} id="search-vin">
            <div className="input-group mb-3">
                <input onChange={this.handleChange} value={this.state.search} type="text" placeholder="Search VIN # for Service History" required name="search" id="search" className="form-control" />
                <label htmlFor="vin"></label>
                <div className="input-group-prepend">
                <button onClick={this.handleSearch} className="btn btn-outline-success" type="submit">Search</button>
                </div>
            </div>
        <table className="table table-warning table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>VIN #</th>
              <th>Date/Time</th>
              <th>Technician</th>
              <th>Reason</th>
              <th>VIP</th>
            </tr>
          </thead>
          <tbody>
            {this.state.appointments.map(appointment => {
                let finished = ""
                if (appointment.vin !== this.state.search) {
                    finished = "d-none"
                }
              return (
                <tr className={finished} key={appointment.id}>
                  <td>{ appointment.owner }</td>
                  <td>{ appointment.vin }</td>
                  <td>{ appointment.date_time }</td>
                  <td>{ appointment.technician }</td>
                  <td>{ appointment.reason }</td>
                  <td>{ appointment.is_vip ? "Yes" : "No" } </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </form>
      );
    }
}

export default ServiceHistory;