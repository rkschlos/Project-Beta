import React from 'react';

class AutomobileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      year: "",
      vin: "",
      model_id: "",
      models: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeVin = this.handleChangeVin.bind(this);
    this.handleChangeModel = this.handleChangeModel.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/models/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      this.setState({ models: data.models });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.models;


    const autosUrl = 'http://localhost:8100/api/automobiles/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(autosUrl, fetchConfig);
    if (response.ok) {
      const newAuto = await response.json();
      console.log(newAuto);
      this.setState({
        color: '',
        year: '',
        vin: '',
        model_id: '',
      });
    }
  }

  handleChangeColor(event) {
    const value = event.target.value;
    this.setState({ color: value });
  }

  handleChangeYear(event) {
    const value = event.target.value;
    this.setState({ year: value });
  }

  handleChangeVin(event) {
    const value = event.target.value;
    this.setState({ vin: value });
  }

  handleChangeModel(event) {
    const value = event.target.value;
    this.setState({ model_id: value });
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new automobile!</h1>
            <form onSubmit={this.handleSubmit} id="create-automobile-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeColor} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeYear} value={this.state.year} placeholder="Year" required type="text" name="year" id="year" className="form-control" />
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeVin} value={this.state.vin} placeholder="VIN #" required type="text" name="vin" id="vin" className="form-control" />
                <label htmlFor="vin">VIN #</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChangeModel} value={this.state.model_id} required name="model" id="model" className="form-select">
                  <option value="">Choose a make/model</option>
                  {this.state.models.map(model => {
                    return (
                      <option key={model.href} value={model.id}>Make: {model.manufacturer.name};  Model: {model.name}</option>
                    )
                  })}
                </select>
              </div>
              <button onClick={this.handleSubmit} className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AutomobileForm;
