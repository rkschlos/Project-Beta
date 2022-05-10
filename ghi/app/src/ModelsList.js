function ModelsList(props) {
    return (
        <table className="table table-warning table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {props.models.map(model => {
              return (
                <tr key={model.href}>
                  <td>{ model.name }</td>
                  <td>{ model.manufacturer.name }</td>
                  <td><img alt = "" src={ model.picture_url }/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    
  
  export default ModelsList;