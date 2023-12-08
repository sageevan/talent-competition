import React from 'react';
import Cookies from 'js-cookie';

export default class Description extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showEditSection : false,

            newData: {
                description: '',
                summary: ''
            }
        };
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveData = this.saveData.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openEdit() {
        this.setState({
            showEditSection: true,
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false,
            newData: {
                description: '',
                summary: ''
            }

        })
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.newData)
        data[event.target.name] = event.target.value
        this.setState({
            newData: data
        })
    }

    saveData() {
        const data = Object.assign({}, this.state.newData)
        if (data.description.length <= 0 && data.summary.length <= 0) {
            TalentUtil.notification.show("Empty field or No changes cannot be updated!", "error", null, null)
            this.closeEdit()
        }
        else if (data.description.length <= 0 && data.summary.length >=0 ) {
            data.description = this.props.description
            this.props.saveProfileData(data)
            this.closeEdit()
        }
        else if (data.description.length >= 0 && data.summary.length <= 0) {
            if (data.description.length < 150 && data.description.length > 0) {
                TalentUtil.notification.show("Description must be more than 150 characters!", "error", null, null)
            } else {
                data.summary = this.props.summary
                this.props.saveProfileData(data)
                this.closeEdit()
            }            
        }
        else {
            if (data.description.length < 150 && data.description.length > 0) {
                TalentUtil.notification.show("Description must be more than 150 characters!", "error", null, null)
            } else {
            this.props.saveProfileData(data)
                this.closeEdit()
            }
        }
        
    }


    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    renderEdit() {
        return (
            <React.Fragment>
                <div className="four wide column">
                    <h5>Summary</h5>
                    <div className="tooltip">Write a summary of your self.</div>
                </div>
                <div className="ten wide column">
                    <div className="field" >
                        <textarea maxLength={150} name="summary" placeholder="Please provide a short summary of your self." defaultValue={this.props.summary} onChange={this.handleChange} ></textarea>
                    </div>
                    <p>Summary must be no more than 150 characters</p>
                </div>
                <div className="four wide column">
                    <h5>Description</h5>
                    <div className="tooltip">Write a description of your company.</div>
                </div>
                <div className="ten wide column">
                    <div className="field" >
                        <textarea maxLength={600} minLength={150} name="description" placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add." defaultValue={this.props.description} onChange={this.handleChange} ></textarea>
                    </div>
                    <p>Description must be between 150-600 characters</p>
                </div>
                <div className="sixteen wide column">
                    <button type="button" className="ui right floated teal button" onClick={this.saveData}>Save</button>
                </div>
               
            </React.Fragment>
        )
    }

    renderDisplay() {

        return (
            <React.Fragment>
                <div className="four wide column">
                    <h5>Summary</h5>
                </div>
                <div className="ten wide column">
                    <div className="field" >
                        <p name="summary" value={this.props.summary}>{this.props.summary}</p>
                    </div>
                </div>
                <div className="four wide column">
                    <h5>Description</h5>
                </div>
                <div className="ten wide column">
                    <div className="field" >
                        <p name="description" value={this.props.description}>{this.props.description}</p>
                    </div>
                </div>
                <div className="sixteen wide column">
                <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </React.Fragment>

        )

    }
}

