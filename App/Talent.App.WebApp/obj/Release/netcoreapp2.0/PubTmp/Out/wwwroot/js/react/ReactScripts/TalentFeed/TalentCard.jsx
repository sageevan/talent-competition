import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon, Image } from 'semantic-ui-react'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            talentData: "",
            showVideo: false,
            showTalent: true
        }
        this.getTalent = this.getTalent.bind(this)
        this.getTalentVideo = this.getTalentVideo.bind(this)
    }

    getTalent() {
        this.setState({
            showTalent: true
        })
    }

    getTalentVideo() {
        this.setState({
            showTalent: false
        })
    }

    render() {
        let key = this.props.data ? `${this.props.data.id}` : ""
        let name = this.props.data ? `${this.props.data.name}` : ""
        let videoUrl = this.props.data ? `${this.props.data.videoUrl}` : ""
        let currentEmployment = this.props.data ? this.props.data.currentEmployment : ""
        let visa = this.props.data ? this.props.data.visa : ""
        let position = this.props.data ? this.props.data.position : ""
        let skills = this.props.data ? this.props.data.skills : ""
        let photoId = this.props.data ? this.props.data.photoId : ""
        return (
            <div className="ui raised link job card" key={key}>
                <div className="content">

                    <div className="header">{name} <i className="right floated star icon"></i></div>
                </div>
                <div className="content">
                    {
                        this.state.showTalent ?
                            <video width="100%" height="203" controls src={videoUrl === null ? "" : videoUrl}>
                                Your browser does not support the video tag.
                            </video>
                            :
                            <div className="ui equal width padded grid">
                                <div className="ui row">
                                    <div className="ui column">
                                        <img width="150" height="180" src={photoId == null ? "https://semantic-ui.com/images/avatar/large/matt.jpg" : photoId} />
                                    </div>
                                    <div className="ui column">
                                        <h4>Talent Snapshot</h4>
                                        <p></p>
                                        <label>CURRENT EMPLOYER</label>
                                        {currentEmployment == null ? <p>No data available</p> : <p>{currentEmployment}</p>}
                                        <label>VISA STATUS</label>
                                        {visa == null ? <p>No data available</p> : <p>{visa}</p>}
                                        <label>POSITION</label>
                                        {position == null ? <p>No data available</p> : <p>{position}</p>}
                                    </div>
                                </div>
                            </div>


                    }
                </div>

                <div className="extra content center aligned">
                    <div className="ui equal width padded grid">
                        <div className="ui row">
                            <div className="ui column">
                                {
                                    this.state.showTalent ?
                                        <i className="user icon" onClick={this.getTalentVideo}></i> :
                                        <i className="video icon" onClick={this.getTalent}></i>

                                }
                            </div>
                            <div className="ui column">
                                <i className="file pdf outline icon"></i>
                            </div>
                            <div className="ui column">
                                <i className="linkedin icon"></i>
                            </div>
                            <div className="ui column">
                                <i className="github icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="extra content">
                    {
                        skills.map((skill, i) => {
                            return <div className="ui basic blue button" key={i}>
                                {skill}
                            </div>
                        })
                    }

                </div>
            </div>
        )
    }
}

