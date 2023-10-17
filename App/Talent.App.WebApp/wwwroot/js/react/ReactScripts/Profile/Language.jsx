/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import { confirmAlert } from 'react-confirm-alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
            languageData: languagedata,
            deleteConfirm: false,
            currentLanguage: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.addNew = this.addNew.bind(this)
        this.saveLanguage = this.saveLanguage.bind(this)
        this.init = this.init.bind(this)
        this.loadData = this.loadData.bind(this)
        this.updateLanguage = this.updateLanguage.bind(this)
        this.deleteLanguage = this.deleteLanguage.bind(this)
        this.onClose = this.onClose.bind(this)
        this.selectLanguageForUpdate = this.selectLanguageForUpdate.bind(this)
        this.deleteConfirm = this.deleteConfirm.bind(this)
  
    }
    init() {
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Talent");
        loaderData.isLoading = false;
        this.setState({ loaderData, })
    }

    componentDidMount() {
        this.loadData();
        //this.init();
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.newLanguage)
        data[event.target.name] = event.target.value
        this.setState({
            newLanguage: data
        })
    }
    addNew() {
        this.setState({
            addNew: true,
            deleteConfirm:false
        })
    }
    render() {
        return (
            this.renderDisplay(this.state.languageData, this.state.editLanguageId, this.state.addNew, this.state.deleteConfirm, this.state.currentLanguage)
        )
    }

    saveLanguage() {
        //this.loadData();
        const language = { 'name': this.state.newLanguage.name, 'level': this.state.newLanguage.level }
        console.log(language)
        if (language.name == null || language.level == null || language.name == '' || language.level == '') {
            TalentUtil.notification.show("Enter Language details before save!", "error", null, null)
        }
        else {
            
            const data = Object.assign({}, language)
            console.log(data)
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
                    let languagedata = null;
                    if (res) {
                        languagedata = res.languages
                        console.log("After save", languagedata)
                        this.setState({
                            languageData: languagedata
                        })

                        TalentUtil.notification.show("Language added sucessfully", "success", null, null)

                    } else {
                        console.log(res.state);
                        TalentUtil.notification.show("Language did not add successfully", "error", null, null)
                    }

                }.bind(this),
                error: function (res, a, b) {
                    console.log(res)
                    console.log(a)
                    console.log(b)
                }
            })

            this.onClose()
        }
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
       // console.log(language)
        this.setState({
            editLanguageId: language.id,
            currentLanguage : language,
        })
    }

    updateLanguage(currentLanguage) {
        if (currentLanguage.language == null || currentLanguage.languageLevel == null || currentLanguage.language == '' || currentLanguage.languageLevel == '') {
            TalentUtil.notification.show("Enter Language details before update!", "error", null, null)
        }
        else {
            const language = { 'id': this.state.editLanguageId, 'name': currentLanguage.language, 'level': currentLanguage.languageLevel }
            const data = Object.assign({}, language)
            console.log(data)
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
                    let languagedata = null;
                    if (res) {
                        languagedata = res.languages
                        this.setState({
                            languageData: languagedata
                        })

                        TalentUtil.notification.show("Language updated sucessfully", "success", null, null)

                    } else {
                        console.log(res.state);
                        TalentUtil.notification.show("Language did not update successfully", "error", null, null)
                    }

                }.bind(this),
                error: function (res, a, b) {
                    console.log(res)
                    console.log(a)
                    console.log(b)
                }
            })
            this.onClose()
        }
    }


    deleteLanguage() {
        const language = { 'id': this.state.currentLanguage.id, 'name': this.state.currentLanguage.name, 'level': this.state.currentLanguage.level }
        const data = Object.assign({}, language)
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
                let languagedata = null;
                if (res) {
                    languagedata = res.languages
                    this.setState({
                        languageData: languagedata
                    })
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
        this.onClose()


    }
    deleteConfirm(data) {
        console.log(data)
        this.setState({
            deleteConfirm: true,
            currentLanguage: data,
            addNew: false
        })
    }

    onClose() {
        this.setState({
            editLanguageId: "",
            deleteConfirm: false,
            addNew: false

        })
    }


    renderDisplay(languages, editId, addNew, deleteConfirm, currentLanguage
) {
        //console.log(languages)
        return (

            <div className='profile-data-table'>
                {addNew &&

                    <div>
                        <div className='profile-data-name-input'>
                            <ChildSingleInput
                                inputType="text"
                                name="name"
                                controlFunc={this.handleChange}
                                maxLength={20}
                                placeholder="Add Language"
                                errorMessage="Please enter a valid Language"
                            />
                        </div>
                        <div className='profile-data-level-input'>
                            <select
                                className="ui right labeled dropdown"
                                onChange={this.handleChange}
                                name="level">
                                <option defaultValue hidden>
                                    {'Select Level'}
                                </option>
                                <option>Basic</option>
                                <option>Conversational</option>
                                <option>Fluent</option>
                                <option>Native/Bilingual</option>
                            </select>
                        </div>
                        <div className='profile-data-input-btn'>
                            <button type="button" className="ui teal button" onClick={this.saveLanguage}>Save</button>
                            <button type="button" className="ui button" onClick={this.onClose}>Cancel</button>
                        </div>
                    </div>
                }

                {deleteConfirm &&

                    <div>
                      
                        <div class="profile-data-delete-body">
                            <h4 class="language-delete-title">Language Delete Confirmation</h4>
                                        Are you Sure!!! You want to delete this Language?
                                    </div>
                        <div class="profile-data-delete-footer">
                            <button type="button" className="ui right floated teal button" onClick={this.deleteLanguage}>Yes</button>
                            <button type="button" className="ui right floated teal button" onClick={this.onClose}>No</button>
                                    </div>
                                </div>
                }
                    <table class="ui table">
                        <thead>
                            <tr>
                            <th>Language</th>
                            <th>Level</th>
                            <th><button type="button" className="ui right floated teal button" onClick={this.addNew}>+ Add New</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                languages.map((language) => (
                                    language.id == editId ?
                                        <tr key={language.id}>
                                            <td>
                                                <div className='profile-data-name-update'>
                                            <input
                                                inputType="text"
                                                name="name"
                                                        defaultValue={currentLanguage.language}
                                                        onChange={(event) => { currentLanguage.language = event.target.value; }}
                                                maxLength={20}
                                                placeholder="Add Language"
                                                errorMessage="Please enter a valid Language"></input>
                                            </div>
                                            </td>
                                            <td>
                                                <div className='profile-data-level-update'>
                                            <select
                                                        className="ui right labeled dropdown"
                                                        defaultValue={currentLanguage.languageLevel}
                                                        onChange={(event) => { currentLanguage.languageLevel = event.target.value; }}
                                                name="level">
                                                <option>Basic</option>
                                                <option>Conversational</option>
                                                <option>Fluent</option>
                                                <option>Native/Bilingual</option>
                                                </select>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='profile-data-update-btn'>
                                                    <button type="button" className="ui teal button" onClick={() => { this.updateLanguage(currentLanguage) }}>Save</button>
                                             <button type="button" className="ui button" onClick={this.onClose}>Cancel</button>
                                                </div>
                                            </td>
                                        </tr>
                                        :
                                        <tr key={language.id}>
                                            <td>{language.language}</td>
                                            <td>{language.languageLevel}</td>
                                            <td><button type="button" className="profile-data-edit-btn" onClick={() => { this.deleteConfirm(language) }}><BsFillTrashFill /></button>
                                                <button type="button" className="profile-data-edit-btn" onClick={() => { this.selectLanguageForUpdate(language) }}><BsFillPencilFill /></button></td>
                                        </tr>

                                )
                                )}
                        </tbody>
                    </table>
                
                </div>
            
        )
    }
}

                                                        
