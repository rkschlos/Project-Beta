import React from 'react';

class ManufacturerForm extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            name: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //following data is from api
    // async componentDidMount() {
    //     const url = 'http://localhost:8100/api/manufacturers/'; //gives you same as insomnia
    //     const response = await fetch(url);
    //     if (response.ok) {
    //         const data = await response.json();
    //         console.log(data);
    //     }
    // }

    //data nothing to do with above, from post
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}; //looks like lines 6-10 populated

        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/'; 
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(manufacturerUrl, fetchConfig); //make request to post to api in correct format
        if (response.ok) {
            const newManufacturer = await response.json();
            console.log(newManufacturer);

            this.setState = ({
                name: "", 
                //don't reset shoe_bins array - different
            });
        }
    }

    //functions to handle change
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name:value });
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
                        <h1>Create a new manufacturer!</h1>
                        <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
                            <div className="form-floating mb-3">
                                <input onChange = {this.handleNameChange} placeholder="Name" required type="text" name="name" value={this.state.name} id="name" className="form-control"/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <button onClick={this.handleSubmit} className="btn btn-lg btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }   
}

export default ManufacturerForm;