import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props)
        const jobSeekingStatusData = props.status ?
            Object.assign({}, props.status)
            : {
                status: ""
            }

         this.state = {
             newStatus: jobSeekingStatusData
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const data = Object.assign({} , this.state.newStatus)
        data[event.target.name] = event.target.value
        this.setState({
            newStatus: data
        })
        console.log(data)
            this.props.saveProfileData(this.props.componentId, data)
    }

    render() {
       // console.log(this.state.newStatus)
        return (
            <div className='ui sixteen wide column'>
                <div className="profile-data-current-status">
                <label>Current Status</label>
                    <div onChange={this.handleChange} defaultValue="Actively looking for a job">
                        <div><input type="radio" name="status" value="Actively looking for a job" /> Actively looking for a job</div>
                        <div><input type="radio" name="status" value="Not looking for a job at the moment" /> Not looking for a job at the moment</div>
                        <div><input type="radio" name="status" value="Currently employed but open to offers" /> Currently employed but open to offers</div>
                        <div><input type="radio" name="status" value="Will be available on later date" /> Will be available on later date</div>
                   
                    
                    </div>
                </div>
                {/*<select*/}
                {/*    className="ui dropdown"*/}
                {/*    value={selectedNationality}*/}
                {/*    onChange={this.handleChange}*/}
                {/*    name="nationality">*/}
                {/*    {nationalityOptions}*/}
                {/*</select>*/}
            </div>
        )

    }
}