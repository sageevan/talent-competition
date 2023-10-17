/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        const skilldata = [
            {
                id: "",
                skill: "",
                level: ""
            }
        ]

        this.state = {
            editSkillId: "",
            loaderData: loaderData,
            addNew: false,
            newSkill: skilldata,
            skillData: skilldata,
            deleteConfirm: false,
            currentSkill: skilldata
        }
        this.handleChange = this.handleChange.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.addNew = this.addNew.bind(this)
        this.saveSkill = this.saveSkill.bind(this)
        this.init = this.init.bind(this)
        this.loadData = this.loadData.bind(this)
        this.updateSkill = this.updateSkill.bind(this)
        this.deleteSkill = this.deleteSkill.bind(this)
        this.onClose = this.onClose.bind(this)
        this.selectSkillForUpdate = this.selectSkillForUpdate.bind(this)
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
        const data = Object.assign({}, this.state.newSkill)
        data[event.target.name] = event.target.value
        this.setState({
            newSkill: data
        })
    }
    addNew() {
        this.setState({
            addNew: true,
            deleteConfirm: false
        })
    }
    render() {
        return (
            this.renderDisplay(this.state.skillData, this.state.editSkillId, this.state.addNew, this.state.deleteConfirm, this.state.currentSkill)
        )
    }

    saveSkill() {

        const skill = { 'name': this.state.newSkill.name, 'level': this.state.newSkill.level }
        if (skill.name == null || skill.level == null || skill.name == '' || skill.level == '') {
            TalentUtil.notification.show("Enter skill details before save!", "error", null, null)
        }
        else {
            const data = Object.assign({}, skill)
            console.log(data)
            var cookies = Cookies.get('talentAuthToken');
            $.ajax({
                url: 'http://localhost:60290/profile/profile/addSkill',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "POST",
                dataType: "json",
                data: JSON.stringify(data),
                success: function (res) {
                    let skilldata = null;
                    if (res) {
                        skilldata = res.skills
                        console.log("After save", skilldata)
                        this.setState({
                            skillData: skilldata
                        })

                        TalentUtil.notification.show("Skill added sucessfully", "success", null, null)

                    } else {
                        console.log(res.state);
                        TalentUtil.notification.show("Skill did not add successfully", "error", null, null)
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
            url: 'http://localhost:60290/profile/profile/getSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                let skilldata = null;
                if (res) {
                    skilldata = res.skills
                    console.log("profileData", res.skills)
                }
                console.log(res.skills)
                this.setState({
                    skillData: skilldata
                })
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        });
        this.init();

    }

    selectSkillForUpdate(skill) {
        //console.log(skill)
        this.setState({
            editSkillId: skill.id,
            currentSkill : skill
        })
    }

    updateSkill(currentSkill) {
        if (currentSkill.skill == null || currentSkill.experienceLevel == null || currentSkill.skill == '' || currentSkill.experienceLevel == '') {
            TalentUtil.notification.show("Enter skill details before update!", "error", null, null)
        }
        else {
            const skill = { 'id': this.state.editSkillId, 'name': currentSkill.skill, 'level': currentSkill.experienceLevel }
            const data = Object.assign({}, skill)
            console.log(data)
            var cookies = Cookies.get('talentAuthToken');
            $.ajax({
                url: 'http://localhost:60290/profile/profile/updateSkill',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "POST",
                dataType: "json",
                data: JSON.stringify(data),
                success: function (res) {
                    let skilldata = null;
                    if (res) {
                        skilldata = res.skills
                        this.setState({
                            skillData: skilldata
                        })

                        TalentUtil.notification.show("Skill updated sucessfully", "success", null, null)

                    } else {
                        console.log(res.state);
                        TalentUtil.notification.show("Skill did not update successfully", "error", null, null)
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


    deleteSkill() {
        console.log(this.state.currentSkill)
        const skill = { 'id': this.state.currentSkill.id, 'name': this.state.currentSkill.name, 'level': this.state.currentSkill.level }
        const data = Object.assign({}, skill)
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/deleteSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (res) {
                let skilldata = null;
                if (res) {
                    skilldata = res.skills
                    this.setState({
                        skillData: skilldata
                    })
                    TalentUtil.notification.show("Skill deleted sucessfully", "success", null, null)
                } else {
                    console.log(res.state);
                    TalentUtil.notification.show("Skill did not delete successfully", "error", null, null)
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
            currentSkill: data,
            addNew: false
        })
    }

    onClose() {
        this.setState({
            editSkillId: "",
            deleteConfirm: false,
            addNew: false

        })
    }

    renderDisplay(skills, editId, addNew, deleteConfirm, currentSkill) {
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
                                placeholder="Add Skill"
                                errorMessage="Please enter a valid Skill"
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
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Expert</option>
                            </select>
                        </div>
                        <div className='profile-data-input-btn'>
                            <button type="button" className="ui teal button" onClick={this.saveSkill}>Save</button>
                            <button type="button" className="ui button" onClick={this.onClose}>Cancel</button>
                        </div>
                    </div>
                }

                {deleteConfirm &&

                    <div>

                        <div class="profile-data-delete-body">
                            <h4 class="delete-title">Skill Delete Confirmation</h4>
                            Are you Sure!!! You want to delete this Skill?
                        </div>
                        <div class="profile-data-delete-footer">
                            <button type="button" className="ui right floated teal button" onClick={this.deleteSkill}>Yes</button>
                            <button type="button" className="ui right floated teal button" onClick={this.onClose}>No</button>
                        </div>
                    </div>
                }
                <table class="ui table">
                    <thead>
                        <tr>
                            <th>Skill</th>
                            <th>Level</th>
                            <th><button type="button" className="ui right floated teal button" onClick={this.addNew}>+ Add New</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            skills.map((skill) => (
                                skill.id == editId ?
                                    <tr key={skill.id}>
                                        <td>
                                            <div className='profile-data-name-update'>
                                        <input
                                            inputType="text"
                                            name="name"
                                            defaultValue={currentSkill.skill}
                                                    onChange={(event) => { currentSkill.skill = event.target.value; }}
                                            maxLength={20}
                                            placeholder="Add Skill"
                                            errorMessage="Please enter a valid Skill"></input>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='profile-data-level-update'>
                                        <select
                                            className="ui right labeled dropdown"
                                                    defaultValue={currentSkill.experienceLevel}
                                                    onChange={(event) => { currentSkill.experienceLevel = event.target.value; }}
                                            name="level">
                                            <option>Beginner</option>
                                            <option>Intermediate</option>
                                            <option>Expert</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='profile-data-update-btn'>

                                        <button type="button" className="ui teal button" onClick={() => { this.updateSkill(currentSkill)}}>Save</button>
                                        <button type="button" className="ui button" onClick={this.onClose}>Cancel</button>
                                    </div>
                                            </td>
                </tr>
                                    :
                                    <tr key={skill.id}>
                                        <td>{skill.skill}</td>
                                        <td>{skill.experienceLevel}</td>
                                        <td><button type="button" className="profile-data-edit-btn" onClick={() => { this.deleteConfirm(skill) }}><BsFillTrashFill /></button>
                                            <button type="button" className="profile-data-edit-btn" onClick={() => { this.selectSkillForUpdate(skill) }}><BsFillPencilFill /></button>
                                            </td>
                                    </tr>

                            )
                            )}
                    </tbody>
                </table>

            </div>

        )
    }
}
