import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./trip-info.css";
import { Icon } from "antd";

class TripInfoComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: "",
      locationFrom: "",
      locationTo: "",
      availableSeats: 0,
      fee: 0,
      driverProfile: {},
      driver: {}
    };
  }

  componentDidMount() {
    const { tripId, tripList, userList } = this.props;
    const tripBookInfo = tripList.find(trip => {
      return trip._id === tripId;
    });

    if (tripBookInfo) {
      const driver = userList.find(user => user._id === tripBookInfo.driverId);
      if (driver) {
        const {
          startTime,
          locationFrom,
          locationTo,
          availableSeats,
          fee
        } = tripBookInfo;

        this.setState({
          startTime,
          locationFrom,
          locationTo,
          availableSeats,
          fee,
          driver
        });
      }

      axios
        .get(`http://localhost:1234/api/user/driver/${tripBookInfo.driverId}`)
        .then(res => {
          if (res.data) {
            this.setState({
              driverProfile: res.data
            });
          }
        })
        .catch(err => console.log(err));
    }
  }

  calcRate = () => {
    if (Object.keys(this.state.driverProfile).length) {
      const { passengerRates } = this.state.driverProfile;
      if (passengerRates.length) {
        let sum = 0;
        for (let num of passengerRates) {
          sum += num;
        }

        return (sum / passengerRates.length).toFixed(1);
      } else return 0.0;
    }
  };

  render() {
    const {
      startTime,
      locationFrom,
      locationTo,
      availableSeats,
      fee,
      driver
    } = this.state;

    return (
      <div className="book-trip-info-wrapper">
        <h4 className="my-3">
          <Icon type="car" /> Thông tin chuyến đi
        </h4>
        <div className="trip-info row">
          <div className="wrapper col-md-4 col-6">
            <div className="location">
              <span className="location-from">{locationFrom}</span>
              <i className="fa fa-arrow-right mx-2"></i>
              <span className="location-to">{locationTo}</span>
            </div>
            <div className="start-time">
              <i className="fa fa-calendar"></i>
              {new Date(startTime).toLocaleDateString()}
            </div>
          </div>

          <div className="wrapper col-md-4 col-6">
            <div className="number-of-seats">
              <i className="fa fa-users"></i>
              <span>{availableSeats}</span>
            </div>
          </div>

          <div className="wrapper col-md-4 col-6">
            <div className="driver">
              <img
                src={
                  driver.avatar
                    ? "http://localhost:1234/" + driver.avatar
                    : "http://localhost:3001/img/user-ic.png"
                }
                alt="avatar"
                className="avatar mr-1 rounded-circle"
              />
              <div>
                <span>{driver.fullName}</span>
                <p className="rates m-0">
                  <i className="fa fa-star"></i>
                  {this.calcRate()}
                </p>
              </div>
            </div>
          </div>

          <div className="wrapper col-md-4 col-6">
            <label>Chi phí: </label>
            <h5 className="fee d-inline mr-3">
              {" "}
              {fee}
              <sup>vnd</sup>
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tripList: state.tripList,
    userList: state.userList
  };
};

export default connect(
  mapStateToProps,
  null
)(TripInfoComp);
