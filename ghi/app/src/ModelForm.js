import React from 'react';

class ModelForm extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            name: '',
            picture_url: '',
            manufacturer_id:'',
            manufacturers: [],
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePictureUrlChange=this.handlePictureUrlChange.bind(this);
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //getting list of manufacturers
    async componentDidMount() {
        const url = 'http://localhost:8100/api/manufacturers/'; //gives you same as insomnia
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            this.setState({ manufacturers: data.manufacturers });
        }
    }

    //data nothing to do with above, from post
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}; //looks like lines 6-10 populated
        delete data.manufacturers; //view doesn't need array of manufacturers!!!

        const modelsUrl = 'http://localhost:8100/api/models/'; 
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(modelsUrl, fetchConfig); //make request to post to api in correct format
        if (response.ok) {
            const newModel = await response.json();
            console.log(newModel);

            const cleared = {
                name: "", 
                picture_url: "", 
                manufacturer_id:"",
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
    handlePictureUrlChange(event) {
        const value = event.target.value;
        this.setState({ picture_url:value });
    }
   
    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({ manufacturer_id:value }); //does NOT need to be same as state above because they are picking one!
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
                        <h1>Create a new model!</h1>
                        <form onSubmit={this.handleSubmit} id="create-model-form">
                            <div className="form-floating mb-3">
                                <input onChange = {this.handleNameChange} placeholder="Name" required type="text" name="name" value={this.state.name} id="name" className="form-control"/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.picture_url} onChange={this.handlePictureUrlChange} placeholder="Picture" type="text" name="picture_url" id="picture_url" className="form-control" />
                                <label htmlFor="picture_url">Picture</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleManufacturerChange} value={this.state.manufacturer_id} required name="manufacturer"  id="manufacturer" className="form-select">
                                    <option value="">Choose a manufacturer</option>
                                    {this.state.manufacturers.map(manufacturer => {
                                        console.log(manufacturer);
                                        return (
                                            <option key={manufacturer.href} value={manufacturer.id}>
                                            {manufacturer.name}
                                            </option>
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

export default ModelForm;