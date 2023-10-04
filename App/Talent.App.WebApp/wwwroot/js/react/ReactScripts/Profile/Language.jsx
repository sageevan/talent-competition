/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export default class Language extends React.Component {
    constructor(props) {
        super(props);
        const languagedata = props.languageData ?
            Object.assign({}, props.languageData)
            : {
                language: "",
                languageLevel :""
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
        const data = Object.assign(this.props.languageData, this.state.newLanguage)
        this.props.updateProfileData(data)
        this.closeAddNew()
    }


    renderAddNew() {
        return (

            <div>
                <div className='ui sixteen wide column'>
                    <ChildSingleInput
                        inputType="text"
                        name="language"
                        value={this.state.newLanguage.language}
                        controlFunc={this.handleChange}
                        maxLength={20}
                        placeholder="Add Language"
                        errorMessage="Please enter a valid Language"
                    />
                    <select
                        className="ui right labeled dropdown"
                        value={this.state.newLanguage.languageLevel}
                        onChange={this.handleChange}
                        name="languageLevel">
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