import React, { Component } from 'react';
import { Rate } from "antd";
import axios from "axios";
import swal from 'sweetalert';

export default class ProfileDriverSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerTime: '',
            avatar: "./img/user-ic.png",
            fullName: '',
            passengerRates: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        const { avatar, fullName, passengerRates } = nextProps;
        if (avatar) {
            this.setState({
                registerTime: new Date(nextProps.registerDate).toLocaleDateString(),
                avatar: "http://localhost:1234/" + avatar,
                fullName,
            })
        }
        else {
            this.setState({
                registerTime: new Date(nextProps.registerDate).toLocaleDateString(),
                fullName,
            })
        }
        this.calcRate(passengerRates)
    }

    calcRate = (rateArr) => {
        if (rateArr) {
            if (rateArr.length) {
                let sum = 0;
                for (let num of rateArr) {
                    sum += num;
                }
                this.setState({
                    passengerRates: parseFloat((sum / rateArr.length).toFixed(1))
                })
            }
            else
                this.setState({
                    passengerRates: 0
                })
        }
    }

    handleOnRate = (rate) => {
        this.setState({
            passengerRates: rate
        })
        const data = {
            raiting: rate
        }
        axios.post("http://localhost:1234/api/user/rateDriver/" + this.props.driverId, data)
            .then(res => {
                console.log(res.data);
                swal("Thành công!", "Đánh giá của bạn về tài xế đã được gửi!", "success");
            })
            .catch(err => {
                console.log(err.response)
                if (err.response.status === 401) {
                    swal("Thất bại!", "Bạn phải đăng nhập để thực hiện chức năng này!", "info");
                }
                else {
                    swal("Thất bại!", "Bạn không có quyền sử dụng chức năng này!", "info");
                }
            })
    }

    render() {
        const { avatar, fullName, registerTime, passengerRates } = this.state;
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
                    <div>
                        <strong>Đánh giá:</strong>
                        <div><Rate allowHalf value={passengerRates} onChange={this.handleOnRate} /></div>
                    </div>
                </div>

            </div>
        )
    }
}

