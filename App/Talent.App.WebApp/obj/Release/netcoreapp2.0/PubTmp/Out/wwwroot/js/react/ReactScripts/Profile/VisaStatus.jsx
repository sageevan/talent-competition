import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)

        const visaStatusData = props.visaStatus ?
            Object.assign({}, props.visaStatus)
            : {
                visaStatus: ""
            }

        this.state = {
            visaStatus: visaStatusData
        }

        this.handleChange = this.handleChange.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.saveVisaStatus = this.saveVisaStatus.bind(this)
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.visaStatus)
        data[event.target.name] = event.target.value
        this.setState({
            visaStatus: data
        })
        this.props.saveProfileData(data)
    }

    saveVisaStatus(visaexpirydate) {
        if (visaexpirydate == null || visaexpirydate == "") {
            TalentUtil.notification.show("Please enter Expiry date before save!", "error", null, null)
        } else { 
        const visaStatusData = {
            visaExpiryDate: visaexpirydate
        }
        this.props.saveProfileData(visaStatusData)
    }
    }
    formatDate(_date) {
        let date = _date.getDate();
        let month = _date.getMonth() + 1;
        let year = _date.getFullYear();
        let formattedDate = `${year}${'-'}${month < 10 ? `0${month}` : `${month}`}${'-'}${date < 10 ? `0${date}` : `${date}`}`;
        return formattedDate;
    }

    render() {
        return (
            this.renderDisplay(this.props.visaStatus, this.state.visaExpiryDate)
        )
    }


    renderDisplay(visaStatus, visaExpiryDate) {
        return (
            <div className='ui sixteen wide column'>
                {
                    visaStatus == 'Work Visa' || visaStatus == 'Student Visa' ?
                        < div className='ui sixteen wide column' >
                            <div className='profile-data-visa-status'>
                                <select
                                    className="ui right labeled dropdown"
                                    onChange={this.handleChange}
                                    value={this.props.visaStatus}
                                    name="visaStatus">
                                    <option>Citizen</option>
                                    <option>Permanent Resident</option>
                                    <option>Work Visa</option>
                                    <option>Student Visa</option>
                                </select>
                            </div >
                            <div className='profile-data-visa-expiry'>
                                <input
                                    type="date"
                                    className="input"
                                    onChange={(event) => { visaExpiryDate = event.target.value; }}
                                    defaultValue={this.formatDate(new Date(this.props.visaExpiryDate)) }
                                    name="visaExpiryDate">
                                </input>
                            </div >
                            <div className='profile-data-visa-save'>
                                <button
                                    type="button"
                                    className="ui right floated teal button"
                                    onClick={() => { this.saveVisaStatus(visaExpiryDate) }} > Save
                                </button>
                            </div >
                        </div>



                        :
                        < div >
                            <select
                                className="ui right labeled dropdown"
                                onChange={this.handleChange}
                                value={this.props.visaStatus}
                                name="visaStatus">
                                <option>Citizen</option>
                                <option>Permanent Resident</option>
                                <option>Work Visa</option>
                                <option>Student Visa</option>
                            </select>
                        </div >
                }
            </div>
        )

    }
}