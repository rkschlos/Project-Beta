function TechnicianList(props) {
    return (
        <table className="table table-warning table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Employee #</th>
            </tr>
          </thead>
          <tbody>
            {props.technicians.map(technician => {
              return (
                <tr key={technician.id}>
                  <td>{ technician.name }</td>
                  <td>{ technician.employee_number }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    
  
  export default TechnicianList;