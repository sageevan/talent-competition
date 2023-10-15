import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { default as Nationalities } from '../../../../util/jsonFiles/nationalities.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        

        const addressData = props.addressData ?
            Object.assign({}, props.addressData)
            : {
                number: "",
                street: "",
                suburb:"",
                country: "",
                city: "",
                postCode:""
            }

        this.state = {
            showEditSection: false,
            newAddress: addressData
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveAddress = this.saveAddress.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    componentDidMount() {
        //  $('.ui.button.social-media')
        //     .popup();
    }
    openEdit() {
        this.setState({
            showEditSection: true,
            newAddress: this.props.addressData
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.newAddress)
        data[event.target.name] = event.target.value
        this.setState({
            newAddress: data
        })
    }

    saveAddress() {
        console.log(this.props.componentId)
        console.log(this.state.newAddress)
        const data = Object.assign(this.props.addressData, this.state.newAddress)
        this.props.saveProfileData(data)
        this.closeEdit()
    }


    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    renderEdit() {
        console.log(Countries)
        let countriesOptions = [];        
        let popCities = [];
        const selectedCountry = this.state.newAddress.country;
        const selectedCity = this.state.newAddress.city;
        const selectedCountryOption = Countries[selectedCountry];
        console.log(selectedCountryOption)
        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        popCities = selectedCountryOption ? selectedCountryOption.map((x) => <option key={x} value={x}> {x}</option>):"";
        return (
            <div className='contact-address-content'>
            <div className='ui sixteen wide column'>
            
                <div className="contact-address-number">
                <ChildSingleInput
                    
                    inputType="text"
                    label="Number"
                    name="number"
                    value={this.state.newAddress.number}
                    controlFunc={this.handleChange}
                    maxLength={10}
                    //placeholder=""
                    errorMessage="Please enter a valid street number"
                    />
                </div>
                <div className="contact-address-street">
                <ChildSingleInput
                    
                    inputType="text"
                    label="Street"
                    name="street"
                    value={this.state.newAddress.street}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    //placeholder=""
                    errorMessage="Please enter a valid street name"
                    />
                </div>
                <div className="contact-address-suburb">
                <ChildSingleInput
                    
                    inputType="text"
                    label="Suburb"
                    name="suburb"
                    value={this.state.newAddress.suburb}
                    controlFunc={this.handleChange}
                    maxLength={10}
                    //placeholder=""
                    errorMessage="Please enter a valid suburb"
                />
                    </div>

                <div className="contact-address-country">
                <label>Select a Country</label>
                <select
                    value={selectedCountry}
                    onChange={this.handleChange}
                    name="country">
                    {countriesOptions}
                    </select>
                </div>
                <div className="contact-address-city">
                    <label>Select a City</label>
                <select
                    value={selectedCity}
                    onChange={this.handleChange}
                    name="city">
                    {popCities}
                    </select>
                </div>
                <div className="contact-address-postcode">
                <ChildSingleInput
                    
                    inputType="text"
                    label="Post Code"
                    name="postCode"
                    value={this.state.newAddress.postCode}
                    controlFunc={this.handleChange}
                    maxLength={10}
                    //placeholder=""
                    errorMessage="Please enter a valid post code"
                    />
                    </div>
                    <div className="contact-address-btn">
                <button type="button" className="ui floated left teal button" onClick={this.saveAddress}>Save</button>
                        <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                    </div>
                </div>
</div>
        )
    }

    renderDisplay() {

        let number = this.props.addressData.number ? `${this.props.addressData.number}` : ""
        let street = this.props.addressData.street ? `${this.props.addressData.street}` : ""
        let suburb = this.props.addressData.suburb ? `${this.props.addressData.suburb}` : ""
        let country = this.props.addressData.country ? `${this.props.addressData.country}` : ""
        let city = this.props.addressData.city ? `${this.props.addressData.city}` : ""
        let postCode = this.props.addressData.postCode ? `${this.props.addressData.postCode}` : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {number},{street},{suburb},{postCode}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }

}


export class Nationality extends React.Component {
    constructor(props) {
        super(props)

        const nationalitydata = props.nationalityData ?
            Object.assign({}, props.nationalityData)
            : {
                nationality:""
            }

        this.state = {
            newNationality: nationalitydata
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        console.log(event.target.name + event.target.value)
        
        const data = Object.assign({}, this.state.newNationality)
        data[event.target.name] = event.target.value
        this.setState({
          newNationality: data
        })
        console.log(data)
        this.props.saveProfileData(data)
    }

    
    render() {
        let nationalityOptions = [];
        nationalityOptions = Nationalities.map((x) => <option key={x} value={x}>{x}</option>);
        const selectedNationality = this.props.nationalityData
        return (
            <div className='ui sixteen wide column'>
                <select
                    className="ui dropdown"
                    value={selectedNationality}
                    onChange={this.handleChange}
                    name="nationality">
                    {nationalityOptions}
                </select>
            </div>
        )
        
    }
}