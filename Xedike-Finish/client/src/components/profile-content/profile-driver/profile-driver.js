import React, { Component } from 'react'
import { Icon } from "antd";
import ProfileCarComp from './profile-car/profile-car';
import DriverFormComp from './driver-form/driver-form';

export default class ProfileDriver extends Component {
    render() {
        return (
            <div className="box-wrapper mt-5">
                <div className="driver-form-box">
                    <h5><Icon type="user-add" /> Thông tin tài xế</h5>
                    <DriverFormComp />
                </div>
                <div className="car-info-form-box">
                    <h5><Icon type="car" /> Thông tin xe</h5>
                    <ProfileCarComp />
                </div>
            </div>
        )
    }
}
