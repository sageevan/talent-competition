import React from 'react';
import { MdLocalPhone, MdOutlineMailOutline } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Loader } from 'semantic-ui-react';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
        const companyDetails = props.companyDetails ?
            Object.assign({}, props.companyDetails)
            : {
                name: "",
                email: "",
                phone: "",
                location: {
                    country: "",
                    city: ""
                },
                profilePhotoUrl: ""
            }
        this.state = {
            companyDetails: companyDetails
        }
    }

    render() {
        return (
            <div className="ui card">
                <div className="content">
                    <div className=" center aligned"><img className="ui avatar image" src={this.state.companyDetails.profilePhotoUrl == null ? "http://semantic-ui.com/images/wireframe/image.png" : this.state.companyDetails.profilePhotoUrl} /></div>
                    <p></p>
                    <div className="center aligned header">{this.props.companyDetails.name}</div>
                    <div className="center aligned meta"><FaMapMarkerAlt />  {this.props.companyDetails.location.city},{this.props.companyDetails.location.country}</div>
                    <div className="center aligned description">
                        <p>We currently do not have specific skills that we desire.</p>
                    </div>
                </div>
                <div className="extra content">
                    <div className="center aligned author">
                        <div className="left aligned footer"><MdLocalPhone /> : {this.props.companyDetails.phone}</div>
                        <div className="left aligned footer"><MdOutlineMailOutline /> : {this.props.companyDetails.email}</div>

                    </div>
                </div>
            </div>
        )
    }
}