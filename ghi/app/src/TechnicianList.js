function TechnicianList(props) {
    return (
        <>
        <h1></h1>
        <h1>Technicians</h1>
        <table className="table table-striped caption">
          <caption></caption>
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
        </>
      );
    }
    
  
  export default TechnicianList;