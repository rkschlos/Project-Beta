function ServicesList(props) {
    return (
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
            {props.appointments.map(appointment => {
              return (
                <tr key={appointment.id}>
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
      );
    }
    
  
  export default ServicesList;