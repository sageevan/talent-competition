/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props)
        const details = props.details ?
            Object.assign({}, props.details)
            : {
                firstName: "",
                lastName: "",
                email: "",
                phone: ""
            }

        this.state = {
            showEditSection: false,
            newContact: details
        }


        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveLink.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }
    openEdit() {
        const details = Object.assign({}, this.props.details)
        this.setState({
            showEditSection: true,
            newContact: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newContact)
        data[event.target.name] = event.target.value
        this.setState({
            newContact: data
        })
    }

    saveLink() {
        console.log(this.props.componentId)
        console.log(this.state.newContact)
        const data = Object.assign({}, this.state.newContact)
        this.props.controlFunc(this.props.componentId, data)
        this.closeEdit()
    }


    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType ="text"
                    label="First Name"
                    name="firstName"
                    value={this.state.newContact.firstName}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your first name"
                    errorMessage="Please enter a valid first name"
                />
                <ChildSingleInput
                    inputType="text"
                    label="Last Name"
                    name="lastName"
                    value={this.state.newContact.lastName}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your last name"
                    errorMessage="Please enter a valid last name"
                />
                <button type="button" className="ui teal button" onClick={this.saveLink}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        let firstName = this.props.details ? `${this.props.details.firstName}` : ""
        let lastName = this.props.details ? `${this.props.details.lastName}` : ""
        let email = this.props.details ? this.props.details.email : ""
        let phone = this.props.details ? this.props.details.phone : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Name: {firstName} {lastName}</p>
                        <p>Email: {email}</p>
                        <p>Phone: {phone}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}