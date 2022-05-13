import React from 'react';

class CustomerForm extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            name: '',
            address: '',   
            phone_number:'',       
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}; //looks like lines 6-10 populated
    

        const modelsUrl = 'http://localhost:8090/api/customers/'; 
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(modelsUrl, fetchConfig); //make request to post to api in correct format
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer);

            const cleared = {
                name: "", 
                address: "",
                phone_number:"",
                //don't reset array - different
            };
            this.setState(cleared);
        }
    }

    //functions to handle change
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name:value });
    }
    handleAddressChange(event) {
        const value = event.target.value;
        this.setState({ address:value });
    }
    handlePhoneNumberChange(event) {
        const value = event.target.value;
        this.setState({ phone_number:value });
    }
   
   
    //render is where you use jsx
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a customer!</h1>
                        <form onSubmit={this.handleSubmit} id="create-customer-form">
                            <div className="form-floating mb-3">
                                <input onChange = {this.handleNameChange} placeholder="Name" required type="text" 
                                    name="name" value={this.state.name} id="name" className="form-control"/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address">Address</label>
                                <textarea onChange={this.handleAddressChange} id="address" value={this.state.address} rows="3" name="address" className="form-control"></textarea>
                            </div>     
                            <div className="form-floating mb-3">
                                <input value={this.state.phone_number} onChange={this.handlePhoneNumberChange} placeholder="Phone_number" 
                                    type="text" name="phone_number" id="phone_number" className="form-control" />
                                <label htmlFor="phone_number">Phone number</label>
                            </div>                         
                            <button onClick={this.handleSubmit} className="btn btn-lg btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }   
}

export default CustomerForm;