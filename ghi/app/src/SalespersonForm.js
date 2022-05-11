import React from 'react';

class SalespersonForm extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            name: '',
            employee_number: '',          
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}; //looks like lines 6-10 populated
    

        const modelsUrl = 'http://localhost:8090/api/salespersons/'; 
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(modelsUrl, fetchConfig); //make request to post to api in correct format
        if (response.ok) {
            const newSalesperson = await response.json();
            console.log(newSalesperson);

            const cleared = {
                name: "", 
                employee_number: "", 
                //don't reset shoe_bins array - different
            };
            this.setState(cleared);
        }
    }

    //functions to handle change
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name:value });
    }
    handleEmployeeNumberChange(event) {
        const value = event.target.value;
        this.setState({ employee_number:value });
    }
   
   
    //render is where you use jsx
    render() {
        // let dropdownClasses = "form-select d-none";
        // if (this.state.bins.length > 0) {
        //     dropdownClasses = 'form-select';
        // }
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new salesperson!</h1>
                        <form onSubmit={this.handleSubmit} id="create-salesperson-form">
                            <div className="form-floating mb-3">
                                <input onChange = {this.handleNameChange} placeholder="Name" required type="text" 
                                    name="name" value={this.state.name} id="name" className="form-control"/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.employee_number} onChange={this.handleEmployeeNumberChange} placeholder="Employee_number" 
                                    type="text" name="employee_number" id="employee_number" className="form-control" />
                                <label htmlFor="employee_number">Employee Number</label>
                            </div>
                            <button onClick={this.handleSubmit} className="btn btn-lg btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }   
}

export default SalespersonForm;