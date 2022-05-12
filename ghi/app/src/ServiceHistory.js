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
        <>
        <h1></h1>
        <form className="form-inline" onSubmit={this.handleSearch} id="search-vin">
            <div className="input-group mb-3">
                <input onChange={this.handleChange} value={this.state.search} type="text" placeholder="Enter VIN #" required name="search" id="search" className="form-control" />
                <label htmlFor="search"></label>
                <div className="input-group-prepend"></div>
            </div>
            <h3>Service History</h3>
        <table className="table table-dark table-hover caption">
        <caption>*** = Customer receives VIP treatment</caption>
          <thead>
            <tr>
              <th>VIP</th>
              <th>Customer Name</th>
              <th>VIN #</th>
              <th>Date/Time</th>
              <th>Technician</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {this.state.appointments.map(appointment => {
                const timeZone = 'PST'
                const date = new Date(appointment.date_time).toLocaleDateString();
                const time = new Date(appointment.date_time).toLocaleTimeString([], {timeStyle: 'short'});

                let finished = ""
                if (appointment.vin !== this.state.search) {
                    finished = "d-none"
                }
              return (
                <tr className={finished} key={appointment.id}>
                  <td>{ appointment.is_vip ? "***" : "" } </td>
                  <td>{ appointment.owner }</td>
                  <td>{ appointment.vin }</td>
                  <td>{ date } { time } { timeZone }</td>
                  <td>{ appointment.technician }</td>
                  <td>{ appointment.reason }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </form>
        </>
      );
    }
}

export default ServiceHistory;