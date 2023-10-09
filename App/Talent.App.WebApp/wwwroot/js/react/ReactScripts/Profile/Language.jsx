/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export default class Language extends React.Component {
    constructor(props) {
        super(props);
        const languagedata = props.languageData ?
            Object.assign([], props.languageData)
            : {
                id:"",
                name: "",
                level :""
            }

        this.state = {
            addNew: false,
            newLanguage: languagedata
        }
        this.handleChange = this.handleChange.bind(this)
        this.renderAddNew = this.renderAddNew.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.addNew = this.addNew.bind(this)
        this.closeAddNew = this.closeAddNew.bind(this)
        this.saveLanguage = this.saveLanguage.bind(this)
        this.loadData = this.loadData.bind(this)
  
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.newLanguage)
        data[event.target.name] = event.target.value
        this.setState({
            newLanguage: data
        })
    }
    addNew() {
        this.setState({ addNew: true })
       // this.renderAddNew();
    }
    render() {
        return(
        this.state.addNew ? this.renderAddNew() : this.renderDisplay()
         //   this.renderDisplay()
        )
    }
    closeAddNew() {
        this.setState({ addNew:false })
    }
    saveLanguage() {
        const language = { 'name': this.state.newLanguage.name, 'level': this.state.newLanguage.level }
        // console.log(language)
        const data = Object.assign({}, language)
        console.log(data)
        //data.id = "new";
        this.props.updateProfileData(data)
        this.closeAddNew()
    }
    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                //let profileData = null;
                if (res) {
                    //profileData = res.data
                    console.log("profileData", res)
                }
                console.log(res)
                //this.updateWithoutSave(profileData)
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        });
       // this.init();
    }

    renderAddNew() {
        return (

            <div>
                <div className='ui sixteen wide column'>
                    <ChildSingleInput
                        inputType="text"
                        name="name"
                        value={this.state.newLanguage.name}
                        controlFunc={this.handleChange}
                        maxLength={20}
                        placeholder="Add Language"
                        errorMessage="Please enter a valid Language"
                    />
                    <select
                        className="ui right labeled dropdown"
                        value={this.state.newLanguage.level}
                        onChange={this.handleChange}
                        name="level">
                        <option>Basic</option>
                        <option>Conversational</option>
                        <option>Fluent</option>
                        <option>Native/Bilingual</option>
                    </select>
                    <button type="button" className="ui teal button" onClick={this.saveLanguage}>Save</button>
                    <button type="button" className="ui button" onClick={this.closeAddNew}>Cancel</button>
                    </div>               
            </div>
        )
        
    }

    renderDisplay() {
        this.loadData()
        return (
            <div className='language-table'>
                <table class="ui table">
                    <thead>
                        <tr>
                            <th>Language</th>
                            <th>Level<button type="button" className="ui right floated teal button" onClick={this.addNew}>+ Add New</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>First</td>
                            <td>Cell</td>
                        </tr>
                        <tr>
                            <td>Cell</td>
                            <td>Cell</td>
                        </tr>
                        <tr>
                            <td>Cell</td>
                            <td>Cell</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}