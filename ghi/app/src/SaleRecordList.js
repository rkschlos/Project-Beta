

function SaleRecordList(props) {
    return (
        <table className="table table-warning table-hover">
          <thead>
            <tr>
              <th>Salesperson Name</th>
              <th>Employee Number</th>
              <th>Customer Name</th>
              <th>Automobile VIN</th>
              <th>Sales Price</th>
            </tr>
          </thead>
          <tbody>
            {props.salerecords.map(salerecord => {
              return (
                <tr key={salerecord.id}>
                  <td>{ salerecord.salesperson.name }</td>
                  <td>{ salerecord.salesperson.employee_number }</td>
                  <td>{ salerecord.customer.name }</td>
                  <td>{ salerecord.automobile.vin }</td>
                  <td>${ salerecord.sale_price }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    
  
  export default SaleRecordList;