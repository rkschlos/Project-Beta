import React from 'react';

class SalespersonHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            salesperson:'',
            salespersons: [],
            salerecords: [],           
        };

        this.handleChange= this.handleChange.bind(this);
    }

// Get list of salespeople and list of sale records
    async componentDidMount() {
        const salespersonsUrl = 'http://localhost:8090/api/salespersons/';
        const salerecordsUrl = 'http://localhost:8090/api/salerecords/';
        const salespersonsResponse = await fetch(salespersonsUrl);
        const salerecordsResponse = await fetch(salerecordsUrl);
        if (salespersonsResponse.ok) {
            const salespersonsData = await salespersonsResponse.json();
            console.log("salespersonsData", salespersonsData)
            this.setState({ salespersons: salespersonsData.salespersons })
        }
        if (salerecordsResponse.ok) {
            const salerecordsData = await salerecordsResponse.json();
            console.log("salerecordsData", salerecordsData)
            this.setState({ salerecords: salerecordsData.salerecords })
        }
    }
    
    handleChange(event) {
        const value = parseInt(event.target.value);
        this.setState({ salesperson:value })
    }


    render () {
        return (
            <>
           
                    <h1>Find sales history</h1>
                    <div className="mb-3">
                    <select onChange={this.handleChange} name="salesperson" required id="salesperson" className="form-select">
                        <option value="">Choose a salesperson to see sale history</option>
                        {this.state.salespersons.map(salesperson => {
                            return (
                                <option key={salesperson.employee_number} value={salesperson.employee_number}>{salesperson.name}</option>
                            );
                        })}
                    </select>
                    </div>
                
                <table className = "table table-warning table-hover">
                    <thead>
                        <tr>
                            <th>Sales person</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Sale price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.salerecords.map(salerecord => {
                            debugger;
                            if (salerecord.salesperson.employee_number === this.state.salesperson) {
                                return (
                                    <tr key = {salerecord.id}>
                                        <td>{ salerecord.salesperson.name }</td>
                                        <td>{ salerecord.customer.name }</td>
                                        <td>{ salerecord.automobile.vin }</td>
                                        <td>{ salerecord.sale_price }</td>
                                    </tr>
                                );
                            }
                        })}
                            
                    </tbody>
                </table>
            
            

            </>

        );
    }



}

export default SalespersonHistory;
