/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class Language extends React.Component {
    constructor(props) {
        super(props);
        const languagedata = [
            {
                id:"",
                name: "",
                level :""
            }
        ]

        this.state = {
            editLanguageId : "",
            loaderData: loaderData,
            addNew: false,
            newLanguage: languagedata,
            languageData: languagedata
        }
        this.handleChange = this.handleChange.bind(this)
        this.renderAddNew = this.renderAddNew.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.addNew = this.addNew.bind(this)
        this.closeAddNew = this.closeAddNew.bind(this)
        this.saveLanguage = this.saveLanguage.bind(this)
        this.init = this.init.bind(this)
        this.loadData = this.loadData.bind(this)
        this.updateLanguage = this.updateLanguage.bind(this)
        this.deleteLanguage = this.deleteLanguage.bind(this)
        this.closeUpdate = this.closeUpdate.bind(this)
        this.selectLanguageForUpdate = this.selectLanguageForUpdate.bind(this)
  
    }
    init() {
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Talent");
        loaderData.isLoading = false;
        this.setState({ loaderData, })
    }

    componentDidMount() {
        this.loadData();
        this.init();
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
    }
    render() {
        return (
            this.state.addNew ? this.renderAddNew() : this.renderDisplay(this.state.languageData, this.state.editLanguageId, this, this.state.addNew)
        )
    }
    closeAddNew() {
        this.setState({ addNew: false })

    }
    saveLanguage() {
        this.loadData();
        const language = { 'name': this.state.newLanguage.name, 'level': this.state.newLanguage.level }
        // console.log(language)
        const data = Object.assign({}, language)
        console.log(data)
        //data.id = "new";
        //this.props.updateProfileData(data)
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/addLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (res) {
                console.log(res);
                console.log("This is the languages after saving: ", data);
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    console.log(res.state);
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })

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
                let languagedata = null;
                if (res) {
                    languagedata = res.languages
                    console.log("profileData", res.languages)
                }
                console.log(res.languages)
                this.setState({
                    languageData: languagedata
                })
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        });
        this.init();
    }

    selectLanguageForUpdate(language) {
        console.log(language)
        this.setState({ editLanguageId : language.id })
    }

    updateLanguage() {
        this.loadData();
        const language = { 'name': this.state.newLanguage.name, 'level': this.state.newLanguage.level }
        // console.log(language)
        const data = Object.assign({}, language)
        console.log(data)
        //data.id = "new";
        //this.props.updateProfileData(data)
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (res) {
                console.log(res);
                console.log("This is the languages after saving: ", data);
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    console.log(res.state);
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })

        this.closeUpdate()
    }

    deleteLanguage(data) {
       // console.log(language)

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/deleteLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (res) {
                console.log(res);
                console.log("This is the languages after saving: ", data);
                if (res.success == true) {
                    TalentUtil.notification.show("Language deleted sucessfully", "success", null, null)
                } else {
                    console.log(res.state);
                    TalentUtil.notification.show("Language did not delete successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }

    closeUpdate() {
        this.setState({ editLanguageId: "" })
    }

    renderAddNew() {
        return (

            <div>
                <div className='ui column'>
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

    renderDisplay(languages, editId, ctrl, addNew) {
        //console.log(languages)
        return (
            
               <div className='language-table'>
                    <table class="ui table">
                        <thead>
                            <tr>
                                <th>Language</th>
                                <th>Level<button type="button" className="ui right floated teal button" onClick={this.addNew}>+ Add New</button></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                languages.map((language) => (
                                    language.id == editId ?
                                        <tr key={language.id}>
                                            <input
                                                inputType="text"
                                                name="name"
                                                defaultValue={language.language}
                                                onChange={this.handleChange}
                                                maxLength={20}
                                                placeholder="Add Language"
                                                errorMessage="Please enter a valid Language"></input>
                                            
                                            <select
                                                className="ui right labeled dropdown"
                                                defaultValue={language.languageLevel}
                                                onChange={this.handleChange}
                                                name="level">
                                                <option>Basic</option>
                                                <option>Conversational</option>
                                                <option>Fluent</option>
                                                <option>Native/Bilingual</option>
                                            </select>
                                            <td><button type="button" className="ui teal button" onClick={this.updateLanguage}>Save</button></td>
                                            <td><button type="button" className="ui button" onClick={this.closeUpdate}>Cancel</button></td>
                                        </tr>
                                        :
                                        <tr key={language.id}>
                                            <td>{language.language}</td>
                                            <td>{language.languageLevel}</td>
                                            <td><button type="button" onClick={() => { this.selectLanguageForUpdate(language) }}><BsFillPencilFill /></button></td>
                                            <td><button type="button" onClick={() => { this.deleteLanguage(language) }}><BsFillTrashFill /></button></td>
                                        </tr>
                                )
                                )}
                        </tbody>
                    </table>
                </div>
            
        )
    }
}

                                                        

                                                   // <td><button className="btn-edit" onClick={() => { ctrl.updateCustomer(customer) }}><BsFillPencilFill /></button></td>
                                //<td><button className="btn-delete" onClick={() => { ctrl.deleteCustomerRequest(customer) }}><BsFillTrashFill /></button></td>