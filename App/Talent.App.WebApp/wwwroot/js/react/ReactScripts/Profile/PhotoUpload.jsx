/* Photo upload section */
import React, { Component } from 'react';
import { BsCameraFill, BsFillTrashFill } from "react-icons/bs";
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
        const newfileurl = "C:\Users\GGPC\Desktop\Sha profile.jpg";

        this.state = {
            newFile: "",
            newFileUrl: "",
            uploadButton: false,
        };

        this.fileSelectedChange = this.fileSelectedChange.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
        this.uploadPhoto = this.uploadPhoto.bind(this)

    }

    fileSelectedChange(event) {
        let acceptedExt = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

        let selectedFile = event.target.files[0];
        if (this.state.newFile) {
            URL.revokeObjectURL(this.state.newFile);
        }
        if (acceptedExt.includes(selectedFile.type)) {
            this.setState({
                uploadButton: true,
                newFileUrl: URL.createObjectURL(event.target.files[0]),
                newFile: event.target.files[0]
            })
        } else {
            TalentUtil.notification.show("File format not accepted", "error", null, null)
        }
    }

    uploadFiles(e) {
        document.getElementById('selectFile').click()
    }



    uploadPhoto(event) {
        event.preventDefault();
        var cookies = Cookies.get('talentAuthToken');
        var file = this.state.newFile;
        var fileName = file.name;
        var fd = new FormData();

        fd.append('file', file);

        $.ajax({

            url: this.props.savePhotoUrl,
            headers: {
                'Authorization': 'Bearer ' + cookies,
            },

            processData: false,
            contentType: false,
            type: "POST",
            data: fd,

            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                    this.setState({
                        newFileUrl: res.profilePath
                    })
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res) {
                console.log("error", res)
            }
        });

        this.setState({
            uploadButton: false
        })
    }


    render() {
        return (
            <div className="sixteen wide column">
                <input
                    id='selectFile'
                    style={{ display: "none" }}
                    accept=".jpg,.png,.jpeg"
                    onChange={this.fileSelectedChange}
                    type="file"
                />
                {
                    this.state.newFileUrl == null ?
                        <div><BsCameraFill style={{ border: '2px solid', borderRadius: '50%', width: '150px', height: "150px" }} onClick={this.uploadFiles} /></div> :
                        <div><img src={this.state.newFileUrl} style={{ borderRadius: '50%', width: '150px', height: "150px" }} onClick={this.uploadFiles} /></div>
                }

                {
                    this.state.uploadButton ?
                        <div><button className="ui right floated teal button" onClick={this.uploadPhoto}>upload</button> </div>
                        : ""
                }
            </div>
        );
    }
}


