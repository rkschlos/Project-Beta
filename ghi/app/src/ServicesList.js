import React from 'react';

class ServicesList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        appointments: [],
      };
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
  
    async handleCancel(id) {
      const cancelUrl = `http://localhost:8080/api/service/${id}/`;
      const fetchConfig = {
        method: "delete",
      };

      const response = await fetch(cancelUrl, fetchConfig);
      console.log(response)
      if (response.ok) {
        console.log("deleted");
        window.location.reload();
      }
    };

    async handleFinished(id) {
        const finishedUrl = `http://localhost:8080/api/service/${id}/`;
        const fetchConfig = {
          method: "put",
          body: JSON.stringify({finished: true}),
          headers: {
            'Content-Type': 'application/json',
          },
        };
  
        const response = await fetch(finishedUrl, fetchConfig);
        console.log(response)
        if (response.ok) {
          console.log("updated");
          window.location.reload();
        }
      };

render() {
    return (
        <>
        <h1></h1>
        <h1>Service Appointments</h1>
        <table className="table table-hover caption-top">
            <caption>*** = Customer receives VIP treatment</caption>
          <thead>
            <tr>
              <th>VIP</th>
              <th>Customer Name</th>
              <th>VIN #</th>
              <th>Date/Time</th>
              <th>Technician</th>
              <th>Reason</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.appointments.map(appointment => {
                const timeZone = 'PST'
                const date = new Date(appointment.date_time).toLocaleDateString();
                const time = new Date(appointment.date_time).toLocaleTimeString([], {timeStyle: 'short'});

                let finished = ''
                if (appointment.finished === true) {
                    finished = 'd-none'
                }
              return (
                <tr className={finished} key={appointment.id}>
                  <td>{ appointment.is_vip ? "***" : "" } </td>
                  <td>{ appointment.owner }</td>
                  <td>{ appointment.vin }</td>
                  <td>{ date } { time } { timeZone }</td>
                  <td>{ appointment.technician }</td>
                  <td>{ appointment.reason }</td>
                  <td><button onClick={()=>this.handleCancel(appointment.id)} to="" className="btn btn-outline-danger">Cancel</button></td>
                  <td><button onClick={()=>this.handleFinished(appointment.id)} to="" className="btn btn-outline-success">Complete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </>
      );
    }
}

export default ServicesList;