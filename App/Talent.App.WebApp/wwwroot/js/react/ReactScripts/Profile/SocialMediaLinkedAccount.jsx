/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props)

        const linkedAccounts = props.linkedAccounts ?
            Object.assign({}, props.linkedAccounts)
            : {
                linkedIn: "",
                github: ""
            }
        
        this.state = {
            showEditSection: false,
            newLinks: linkedAccounts
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveLinks = this.saveLinks.bind(this)
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
            newLinks: this.props.linkedAccounts
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.newLinks)
        data[event.target.name] = event.target.value
        this.setState({
            newLinks: data
        })
    }

    saveLinks() {
        console.log(this.props.componentId)
        console.log(this.state.newLinks)
        const data = Object.assign(this.props.linkedAccounts, this.state.newLinks)
        this.props.saveProfileData(this.props.componentId, data)
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
                    label="Linked In"
                    name="linkedIn"
                    value={this.state.newLinks.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your LinkedIn Url"
                    errorMessage="Please enter a valid LinkedIn Url"
                />
                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.newLinks.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your github Url"
                    errorMessage="Please enter a valid github Url"
                />
                <button type="button" className="ui teal button" onClick={this.saveLinks}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        let linkedIn = this.props.linkedAccounts.linkedIn ? `${this.props.linkedAccounts.linkedIn}` : ""
        let github = this.props.linkedAccounts.github ? `${this.props.linkedAccounts.github}` : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Linked In: {linkedIn}</p>
                        <p>Github: {github}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}