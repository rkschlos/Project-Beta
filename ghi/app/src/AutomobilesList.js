function AutomobilesList(props) {
    return (
        <table className="table table-warning table-hover">
          <thead>
            <tr>
              <th>Color</th>
              <th>Year</th>
              <th>Vin</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            {props.autos.map(automobile => {
              return (
                <tr key={automobile.href}>
                  <td>{ automobile.color }</td>
                  <td>{ automobile.year }</td>
                  <td>{ automobile.vin }</td>
                  <td>{ automobile.model.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    
  
  export default AutomobilesList;