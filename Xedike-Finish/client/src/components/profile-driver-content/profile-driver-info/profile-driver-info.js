import React, { Component } from "react";
import { Icon } from "antd";
var dateFormat = require('dateformat');

export default class ProfileDirverInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DOB: "",
      email: "",
      fullName: "",
      phone: "",
      driverProfile: {},
      carProfile: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    const { DOB, email, fullName, phone, driverProfile } = nextProps;
    if (driverProfile) {
      this.setState({
        DOB,
        email,
        fullName,
        phone,
        driverProfile
      });
      this.getCarProfile(driverProfile);
    } else {
      this.setState({
        DOB,
        email,
        fullName,
        phone
      });
    }
  }

  getCarProfile = driver => {
    if (driver.carInfo) {
      if (driver.carInfo.length) {
        this.setState({
          carProfile: driver.carInfo[driver.carInfo.length - 1]
        });
      }
    }
  };

  render() {
    const {
      DOB,
      email,
      fullName,
      phone,
      driverProfile,
      carProfile
    } = this.state;
    return (
      <div className="box-wrapper profile-driver-info">
        <div className="driver-info mb-5">
          <h5 className="mb-4">
            <Icon type="user" /> Thông tin tài xế:
          </h5>
          <div className="profile-item row mb-3">
            <div className="col-2">
              <label>Email:</label>
            </div>
            <div className="col-8">
              <span>{email}</span>
            </div>
          </div>
          <div className="profile-item row mb-3">
            <div className="col-2">
              <label>Họ tên:</label>
            </div>
            <div className="col-8">
              <span>{fullName}</span>
            </div>
          </div>
          <div className="profile-item row mb-3">
            <div className="col-2">
              <label>Ngày sinh:</label>
            </div>
            <div className="col-8">
              <span>{dateFormat(DOB, "dddd, mmmm dS, yyyy")}</span>
            </div>
          </div>
          <div className="profile-item row mb-3">
            <div className="col-2">
              <label>Số diện thoại:</label>
            </div>
            <div className="col-8">
              <span>{phone}</span>
            </div>
          </div>
          <div className="profile-item row mb-3">
            <div className="col-2">
              <label>Số cmnd:</label>
            </div>
            <div className="col-8">
              <span>{driverProfile.passportId}</span>
            </div>
          </div>
          <div className="profile-item row mb-3">
            <div className="col-2">
              <label>Nghề nghiệp:</label>
            </div>
            <div className="col-8">
              <span>{driverProfile.job}</span>
            </div>
          </div>
          <div className="profile-item row mb-3">
            <div className="col-2">
              <label>Địa chỉ:</label>
            </div>
            <div className="col-8">
              <span>{driverProfile.address}</span>
            </div>
          </div>
        </div>

        <div className="car-info">
          <h5 className="mb-4">
            <Icon type="car" /> Thông tin xe
          </h5>
          <div className="profile-item row mb-3">
            <div className="col-2">
              <label>Hãng xe:</label>
            </div>
            <div className="col-8">
              <span>{carProfile.brand}</span>
            </div>
          </div>
          <div className="profile-item row mb-3">
            <div className="col-2">
              <label>Tên xe:</label>
            </div>
            <div className="col-8">
              <span>{carProfile.model}</span>
            </div>
          </div>
          <div className="profile-item row mb-3">
            <div className="col-2">
              <label>Số ghế của xe:</label>
            </div>
            <div className="col-8">
              <span>{carProfile.numberOfSeats}</span>
            </div>
          </div>
          <div className="profile-item row mb-3">
            <div className="col-2">
              <label>Năm sản xuất:</label>
            </div>
            <div className="col-8">
              <span>{carProfile.manufacturingYear}</span>
            </div>
          </div>
          <div className="profile-item row mb-3">
            <div className="col-2">
              <label>Giấy phép xe:</label>
            </div>
            <div className="col-8">
              <span>{carProfile.licensePlate}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
