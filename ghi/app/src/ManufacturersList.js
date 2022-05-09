function ManufacturersList(props) {
    return (
        <table className="table table-warning table-hover">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {props.manufacturers.map(manufacturer => {
              return (
                <tr key={manufacturer.href}>
                  <td>{ manufacturer.name }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    
  
  export default ManufacturersList;