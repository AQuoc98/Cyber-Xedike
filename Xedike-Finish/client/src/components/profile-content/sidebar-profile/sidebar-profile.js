import React, { Component } from 'react';
import { connect } from "react-redux";
import { Rate } from 'antd';
import "./sidebar-profile.css";
import axios from "axios";

class SidebarProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerTime: '',
            avatar: "./img/user-ic.png"
        }
    }

    calcRate = () => {
        if (Object.keys(this.props.driverProfile).length) {
            const { passengerRates } = this.props.driverProfile;
            if (passengerRates.length) {
                let sum = 0;
                for (let num of passengerRates) {
                    sum += num;
                }

                return parseFloat((sum / passengerRates.length).toFixed(1));
            }
            else
                return 0.0;
        }
    }

    componentWillReceiveProps(nextProps) {
        const { avatar } = nextProps;
        if (avatar) {
            this.setState({
                registerTime: new Date(nextProps.registerDate).toLocaleDateString(),
                avatar: "http://localhost:1234/" + avatar
            })
        }
        else {
            this.setState({
                registerTime: new Date(nextProps.registerDate).toLocaleDateString(),
            })
        }
    }

    handleChangeAvatar = (e) => {
        const formData = new FormData();

        formData.append('avatar', e.target.files[0]);
        axios.post("http://localhost:1234/api/user/uploadAvatar", formData)
            .then(res => {
                this.setState({
                    avatar: "http://localhost:1234/" + res.data.avatar
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { registerTime, avatar } = this.state;
        const { fullName, userType, numberOfTrips } = this.props;
        return (
            <div className="sidebar-profile box-wrapper">
                <div className="user-interface text-center">
                    <img
                        src={avatar}
                        className="user-avatar"
                        alt="avatar"
                    />
                    <div className="overlay-avatar">
                        <label htmlFor="change-avatar">
                            <i className="fa fa-file-image-o"></i>
                        </label>
                        <input type="file" id="change-avatar" onChange={this.handleChangeAvatar} className="d-none" />
                    </div>
                </div>
                <h5 className="user-name text-center">{fullName}</h5>
                <div className="user-active mt-3">
                    <strong>Hoạt động: </strong>
                    <p>Thành viên từ: <span>{registerTime}</span></p>
                    {
                        (userType === "driver")
                            ? (
                                <div>
                                    <strong>Đánh giá:</strong>
                                    <div><Rate allowHalf defaultValue={this.calcRate()} disabled /></div>
                                </div>
                            )
                            : (
                                <div>
                                    <b>Tổng số chuyến đi: </b>
                                    <span>{numberOfTrips ? numberOfTrips : 0}</span>
                                </div>
                            )
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        driverProfile: state.auth.driverProfile
    }
}

export default connect(mapStateToProps, null)(SidebarProfile);