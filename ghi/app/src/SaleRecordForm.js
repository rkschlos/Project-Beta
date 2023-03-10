import React from 'react';

class SaleRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            salesperson: '',
            customer: '',
            automobile:'',
            sale_price:'',
            salespersons: [], 
            customers: [],
            automobiles: [],
        };
        this.handleSalesPersonChange= this.handleSalesPersonChange.bind(this);
        this.handleCustomerChange= this.handleCustomerChange.bind(this);
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handleSalePriceChange = this.handleSalePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async getSaleRecordDataUpdate() {
        
            const salespersonUrl = 'http://localhost:8090/api/salespersons/';
            const salespersonResponse = await fetch(salespersonUrl);
            if (salespersonResponse.ok) {
                const salespersonData = await salespersonResponse.json();
                this.setState({ salespersons: salespersonData.salespersons })
            }
    
            const customersUrl = 'http://localhost:8090/api/customers/';
            const customersResponse = await fetch(customersUrl);
            if (customersResponse.ok) {
                const customersData = await customersResponse.json();
                console.log("customersData", customersData);
                this.setState({ customers: customersData.customers })
            }
    
            const salerecordsUrl = 'http://localhost:8090/api/salerecords/';
            const automobilesUrl = 'http://localhost:8100/api/automobiles/';
            const salerecordsResponse = await fetch(salerecordsUrl);
            const automobilesResponse = await fetch(automobilesUrl);
            if (salerecordsResponse.ok && automobilesResponse.ok) {
                const salerecordsData = await salerecordsResponse.json();
                const automobilesData= await automobilesResponse.json();
                //filtering which cars are not in the sale records
                const soldCarVins = salerecordsData.salerecords.map(record => record.automobile.vin);
                const unsoldCars = automobilesData.autos.filter(auto => !soldCarVins.includes(auto.vin));
                this.setState({ automobiles: unsoldCars })   
            }
        }

    async componentDidMount() {
        this.getSaleRecordDataUpdate()
                   
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
        delete data.automobiles;
        delete data.customers;
        delete data.salespersons;

        const salerecordsUrl = 'http://localhost:8090/api/salerecords/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(salerecordsUrl, fetchConfig);
        if (response.ok) {
            const newSalesrecord = await response.json();
            console.log(newSalesrecord);

            this.setState({
                salesperson:'',
                customer: '',
                automobile: '',
                sale_price: '',
            });

            this.getSaleRecordDataUpdate()
        }
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({ salesperson:value });
    }

    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({ customer: value });
    }

    handleAutomobileChange(event) {
        const value = event.target.value;
        this.setState({ automobile:value })
    }

    handleSalePriceChange(event) {
        const value = event.target.value;
        this.setState({ sale_price: value })
    }

    render() {
        
        return (
            <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new sale record!</h1>
                    <form onSubmit={this.handleSubmit} id="create-salerecord-form">
                        <div className="form-floating mb-3">
                            <input onChange = {this.handleSalePriceChange} placeholder="Sale Price" required type="number" 
                                name="sale_price" value={this.state.sale_price} id="sale_price" className="form-control"/>
                            <label htmlFor="sale_price">Sale Price</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={this.handleSalesPersonChange} value={this.state.salesperson} name="salesperson" required id="salesperson" className="form-select">
                                <option value="">Choose a salesperson</option>
                                {this.state.salespersons.map(salesperson => {
                                    return (
                                        <option key={salesperson.employee_number} value={salesperson.employee_number}>{salesperson.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={this.handleCustomerChange} value={this.state.customer} name="customer" required id="customer" className="form-select">
                                <option value="">Choose a customer</option>
                                {this.state.customers.map(customer => {
                                    return (
                                        <option key={customer.address} value={customer.phone_number}>{customer.name}</option>
                                    );
                                })}
                            </select>
                        </div>            
                        <div className="mb-3">
                            <select onChange={this.handleAutomobileChange} value={this.state.automobile} name="automobile" required id="automobile" className="form-select">
                                <option value="">Choose an automobile</option>
                                {this.state.automobiles.map(automobile => {
                                    return (
                                        <option key={automobile.vin} value={automobile.href}>{automobile.vin}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <button onClick={this.handleSubmit} className="btn btn-lg btn-primary">Create</button>

                    </form>
                </div>
            </div>
        </div>

        );
    }

    
} 

export default SaleRecordForm;
