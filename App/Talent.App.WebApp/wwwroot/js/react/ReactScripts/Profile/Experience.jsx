﻿/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import { confirmAlert } from 'react-confirm-alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";

export default class Experience extends React.Component {
 constructor(props) {
        super(props);
        const experiencedata = [
            {
                id:"",
                company: "",
                position: "",
                responsibility: "",
                start: "",
                end:""
            }
        ]

        this.state = {
            editExperienceId : "",
            loaderData: loaderData,
            addNew: false,
            newExperience: experiencedata,
            experienceData: experiencedata,
            deleteConfirm: false,
            currentExperience: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.addNew = this.addNew.bind(this)
        this.saveExperience = this.saveExperience.bind(this)
        this.init = this.init.bind(this)
        this.loadData = this.loadData.bind(this)
     this.updateExperience = this.updateExperience.bind(this)
        this.deleteExperience = this.deleteExperience.bind(this)
        this.onClose = this.onClose.bind(this)
        this.selectExperienceForUpdate = this.selectExperienceForUpdate.bind(this)
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
        const data = Object.assign({}, this.state.newExperience)
        data[event.target.name] = event.target.value
        this.setState({
            newExperience: data
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
            //<div>
            //    <label>sha</label>
            //    <button type="button" className="ui teal button" onClick={this.saveExperience}>Save</button>
            //</div>
            this.renderDisplay(this.state.experienceData, this.state.editExperienceId, this.state.addNew, this.state.deleteConfirm, this.state.currentExperience)
        )
    }

    saveExperience() {
        //this.loadData();
        const experience = {
            'company': this.state.newExperience.company,
            'responsibilities': this.state.newExperience.responsibility,
            'position': this.state.newExperience.position,
            'start': this.state.newExperience.start,
            'end': this.state.newExperience.end
        }
        //if (language.name == null || language.level == null || language.name == '' || language.level == '') {
        //    TalentUtil.notification.show("Enter Language details before save!", "error", null, null)
        //}
        //else {
            
        const data = Object.assign({}, experience)
            console.log(data)
            var cookies = Cookies.get('talentAuthToken');
            $.ajax({
                url: 'http://localhost:60290/profile/profile/addExperience',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "POST",
                dataType: "json",
                data: JSON.stringify(data),
                success: function (res) {
                    let experiencedata = null;
                    if (res) {
                        experiencedata = res.experience
                        console.log("After save", experiencedata)
                        this.setState({
                            experienceData: experiencedata
                        })

                        TalentUtil.notification.show("Experience added sucessfully", "success", null, null)

                    } else {
                        console.log(res.state);
                        TalentUtil.notification.show("Experience did not add successfully", "error", null, null)
                    }

                }.bind(this),
                error: function (res, a, b) {
                    console.log(res)
                    console.log(a)
                    console.log(b)
                }
            })

            this.onClose()
      //  }
    }
    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                let experiencedata = null;
                if (res) {
                    experiencedata = res.experience
                    console.log("experienceData", res.experience)
                }
                this.setState({
                    experienceData: experiencedata
                })
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        });
        this.init();

    }

    selectExperienceForUpdate(experience) {
        console.log(experience)
        this.setState({
            editExperienceId: experience.id,
            currentExperience: experience,
        })
    }

    updateExperience(updateExperience) {
        const experience = {
            'id': this.state.editExperienceId,
            'company': updateExperience.company,
            'responsibilities': updateExperience.responsibility,
            'position': updateExperience.position,
            'start': updateExperience.start,
            'end': updateExperience.end
        }
          //  const language = { 'id': this.state.editLanguageId, 'name': currentLanguage.language, 'level': currentLanguage.languageLevel }
        const data = Object.assign({}, experience)
            console.log(data)
            var cookies = Cookies.get('talentAuthToken');
            $.ajax({
                url: 'http://localhost:60290/profile/profile/updateExperience',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "POST",
                dataType: "json",
                data: JSON.stringify(data),
                success: function (res) {
                    let experiencedata = null;
                    if (res) {
                        experiencedata = res.experience
                        this.setState({
                            experienceData: experiencedata
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


    deleteExperience() {
        const experience = {
            'id': this.state.currentExperience.id,
            'company': this.state.currentExperience.company,
            'responsibilities': this.state.currentExperience.responsibility,
            'position': this.state.currentExperience.position,
            'start': this.state.currentExperience.start,
            'end': this.state.currentExperience.end
        }
        //const language = { 'id': this.state.currentLanguage.id, 'name': this.state.currentLanguage.name, 'level': this.state.currentLanguage.level }
        const data = Object.assign({}, experience)
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/deleteExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (res) {
                let experiencedata = null;
                if (res) {
                    experiencedata = res.experience
                    console.log('after deleted'+experiencedata)
                    this.setState({
                        experienceData: experiencedata
                    })
                    TalentUtil.notification.show("Experience deleted sucessfully", "success", null, null)
                } else {
                    console.log(res.state);
                    TalentUtil.notification.show("Experience did not delete successfully", "error", null, null)
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
            currentExperience: data,
            addNew: false
        })
    }
    formatDate(_date) {
        let date = _date.getDate();
        let month = _date.toLocaleString('en-us', { month: 'short'})
        let year = _date.getFullYear();
        let s = ["th", "st", "nd", "rd"];
        let v = date % 100;
        let nthDate = date + (s[(v - 20) % 10] || s[v] || s[0]);

        let formattedDate = `${nthDate < 10 ? `0${nthDate}` : `${nthDate}`}${' '}${month < 10 ? `0${month}` : `${month}`}${', '}${year}`;
        return formattedDate;
    }

    onClose() {
        this.setState({
            editExperienceId: "",
            deleteConfirm: false,
            addNew: false

        })
        this.loadData();
    }


    renderDisplay(experiences, editId, addNew, deleteConfirm, currentExperience) {
        return (

            <div className='profile-data-table'>
                {addNew &&

                    <div>
                        <div className='profile-data-company'>
                        <ChildSingleInput
                            inputType="text"
                            label="Company"
                            name="company"
                            controlFunc={this.handleChange}
                            maxLength={20}
                            placeholder="Enter your company name"
                            errorMessage="Please enter a valid company name"
                            />
                        </div>
                        <div className='profile-data-position'>
                        <ChildSingleInput
                            inputType="text"
                            label="Position"
                            name="position"
                            controlFunc={this.handleChange}
                            maxLength={100}
                            placeholder="Enter your position"
                            errorMessage="Please enter a valid position"
                            />
                        </div><div className='profile-data-start'>
                        <label>Start Date</label>
                        <input type="date"
                            name="start"
                            onChange={this.handleChange}
                         >
                        </input>
                        </div>
                        <div className='profile-data-end'>
                            <label>End Date</label>
                            <input type="date"
                                name="end"
                                onChange={this.handleChange }
                            >
                            </input>
                        </div>
                        <div className='profile-data-responsibilities'>
                        <ChildSingleInput
                            inputType="text"
                            label="Responsibilities"
                            name="responsibility"
                            controlFunc={this.handleChange}
                            maxLength={100}
                            placeholder="Enter your responsibility"
                            errorMessage="Please enter a responsibility"
                            />
                        </div>
                        

                        <button type="button" className="ui teal button" onClick={this.saveExperience}>Save</button>
                        <button type="button" className="ui button" onClick={this.onClose}>Cancel</button>
                    </div>
                }

                {deleteConfirm &&

                    <div>
                      
                        <div class="profile-data-delete-body">
                            <h4 class="language-delete-title">Experience Delete Confirmation</h4>
                                        Are you Sure!!! You want to delete this Experience?
                                    </div>
                        <div class="profile-data-delete-footer">
                            <button type="button" className="ui right floated teal button" onClick={this.deleteExperience}>Yes</button>
                            <button type="button" className="ui right floated teal button" onClick={this.onClose}>No</button>
                                    </div>
                                </div>
                }
                    <table class="ui table">
                        <thead>
                            <tr>
                            <th>Company</th>
                            <th>Position</th>
                            <th>Responsibilities</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th><button type="button" className="ui right floated teal button" onClick={this.addNew}>+ Add New</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            experiences.map((experience) => (
                                experience.id == editId ?
                                    <tr key={experience.id}>
                                            <td>
                                                <div className='profile-data-company'>
                                                <input
                                                    inputType="text"
                                                    label="Company"
                                                    name="company"
                                                    defaultValue={currentExperience.company}
                                                    onChange={(event) => { currentExperience.company = event.target.value; }}
                                                    maxLength={80}
                                                    errorMessage="Please enter a valid company name">
                                                </input>
                                            </div>
                                            </td>
                                            <td>
                                                <div className='profile-data-position'>
                                                <input
                                                    inputType="text"
                                                    label="Position"
                                                    name="position"
                                                    defaultValue={currentExperience.position}
                                                    onChange={(event) => { currentExperience.position = event.target.value; }}
                                                    maxLength={100}
                                                    errorMessage="Please enter a valid position">
                                                </input>
                                                </div>
                                        </td>
                                        <td>
                                            <div className='profile-data-responsibilities'>
                                                <input
                                                    inputType="text"
                                                    label="Responsibilities"
                                                    name="responsibility"
                                                    defaultValue={currentExperience.responsibilities}
                                                    onChange={(event) => { currentExperience.responsibility = event.target.value; }}
                                                    maxLength={100}
                                                    errorMessage="Please enter a responsibility">
                                                </input>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='profile-data-start'>
                                                <label>Start Date</label>
                                                <input type="date"
                                                    name="start"
                                                    defaultValue={currentExperience.start}
                                                    onChange={(event) => { currentExperience.start = event.target.value; }}
                                                    >
                                                </input>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='profile-data-end'>
                                                <label>End Date</label>
                                                <input type="date"
                                                    name="end"
                                                    defaultValue={currentExperience.end}
                                                    onChange={(event) => { currentExperience.end = event.target.value; }}
                                                >
                                                </input>
                                            </div>
                                        </td>
                                            <td>
                                                <div className='profile-data-update-btns'>
                                                    <button type="button" className="profile-data-update-btn" onClick={() => { this.updateExperience(currentExperience) }}>Update</button>
                                                    <button type="button" className="profile-data-cancel-btn" onClick={this.onClose}>Cancel</button>
                                                </div>
                                            </td>
                                        </tr>
                                        :
                                    <tr key={experience.id}>
                                        <td>{experience.company}</td>
                                        <td>{experience.position}</td>
                                        <td>{experience.responsibilities}</td>
                                        <td>{this.formatDate(new Date(experience.start))}</td>
                                        <td>{this.formatDate(new Date(experience.end))}</td>
                                            <td><button type="button" className="profile-data-edit-btn" onClick={() => { this.deleteConfirm(experience) }}><BsFillTrashFill /></button>
                                            <button type="button" className="profile-data-edit-btn" onClick={() => { this.selectExperienceForUpdate(experience) }}><BsFillPencilFill /></button></td>
                                        </tr>

                                )
                                )}
                        </tbody>
                    </table>
                
                </div>
            
        )
    }
}

                                                        
