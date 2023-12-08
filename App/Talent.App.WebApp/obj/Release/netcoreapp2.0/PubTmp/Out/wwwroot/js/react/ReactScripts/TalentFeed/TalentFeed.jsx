import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 0,
            loadPosition: 5,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: {
                name: "",
                email: "",
                phone: "",
                location: {
                    country: "",
                    city: ""
                }
            }
        }

        this.init = this.init.bind(this);
        this.loadEmployerProfile = this.loadEmployerProfile.bind(this)
        this.loadTalent = this.loadTalent.bind(this)

    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.init()
        this.loadEmployerProfile()
        this.loadTalent()
    };


    init() {
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Talent");
        loaderData.isLoading = false;
        this.setState({ loaderData, })
    }

    handleScroll() {
        const win = $(window);
        if ((($(document).height() - win.height()) == Math.round(win.scrollTop())) || ($(document).height() - win.height()) - Math.round(win.scrollTop()) == 1) {
            $("#load-more-loading").show();
        }
    };


    loadEmployerProfile() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talentmvpservicesprofile.azurewebsites.net/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let employerData = null;
                if (res.employer) {
                    employerData = res.employer
                    //console.log("employerData", employerData)
                }
                this.setState({
                    companyDetails: employerData.companyContact
                })
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
        this.init()
    }

    loadTalent() {

        var cookies = Cookies.get("talentAuthToken");
        let data = {
            position: this.state.loadPosition,
            number: this.state.loadNumber,
        };

        $.ajax({
            url: "https://talentmvpservicesprofile.azurewebsites.net/profile/profile/getTalent",
            headers: {
                Authorization: "Bearer " + cookies,
                "Content-Type": "application/json",
            },
            type: "GET",
            data: data,
            success: function (res) {
                console.log("talentData", res.data)
                this.setState({
                    feedData: res.data,
                });
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        });
    }



    render() {

        let talents = this.state.feedData ? this.state.feedData : ""

        if (talents.length == 0) {

            return (

                <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>

                    <div className="ui grid talent-feed container">

                        <div className="four wide column">

                            <CompanyProfile
                                companyDetails={this.state.companyDetails}
                            />
                        </div>

                        <div>

                            <p>There are no talents found for your recruitment company</p>

                        </div>
                        <div className="four wide column">
                            <div className="ui card">
                                <FollowingSuggestion />
                            </div>
                        </div>
                    </div>

                </BodyWrapper>

            );

        } else {

            return (

                <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>

                    <div className="ui grid talent-feed container">

                        <div className="five wide column">

                            <CompanyProfile
                                companyDetails={this.state.companyDetails}
                            />
                        </div>
                        <div className="six wide column">
                            {
                                talents.map((x) => {

                                    return <TalentCard key={x.id} data={x} />;

                                })
                            }

                        </div>
                        <div className="five wide column">
                            <div className="ui card">
                                <FollowingSuggestion />
                            </div>
                        </div>
                    </div>

                </BodyWrapper>


            );
        }

    }
}