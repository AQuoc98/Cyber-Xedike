import React, { Component } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import "./trip-history-item.css";

class TripHistoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: "",
      locationFrom: "",
      locationTo: "",
      availableSeats: 0,
      fee: 0,
      driverProfile: undefined,
      avatar: "./img/user-ic.png",
      fullName: ""
    };
  }

  componentDidMount() {
    const {
      startTime,
      locationFrom,
      locationTo,
      availableSeats,
      fee
    } = this.props.tripInfo;
    this.setState({
      startTime,
      locationFrom,
      locationTo,
      availableSeats,
      fee,
      avatar:
        "http://localhost:1234/" +
        this.props.userList.find(user => {
          return user._id === this.props.tripInfo.driverId;
        }).avatar,
      fullName: this.props.userList.find(user => {
        return user._id === this.props.tripInfo.driverId;
      }).fullName
    });

    axios
      .get(
        `http://localhost:1234/api/user/driver/${this.props.tripInfo.driverId}`
      )
      .then(res => {
        this.setState({
          driverProfile: res.data
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  calcRate = () => {
    if (this.state.driverProfile) {
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
      driverProfile,
      avatar,
      fullName
    } = this.state;
    return (
      <div className="trip-item trip-history-item row">
        <div className="wrapper col-md-3 col-6">
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

        <div className="wrapper col-md-3 col-6">
          <div className="number-of-seats">
            <i className="fa fa-users"></i>
            <span>{availableSeats}</span>
          </div>
        </div>

        <div className="wrapper col-md-3 col-6">
          <div className="driver">
            {driverProfile ? (
              <Link to={"/driverProfile/" + driverProfile.userId}>
                <img
                  src={avatar}
                  alt="avatar"
                  className="avatar mr-1 rounded-circle"
                />
              </Link>
            ) : (
              <img
                src="./img/user-ic.png"
                alt="avatar"
                className="avatar mr-1 rounded-circle"
              />
            )}
            <div>
              <span>{fullName}</span>
              <p className="rates m-0">
                <i className="fa fa-star"></i>
                {this.calcRate()}
              </p>
            </div>
          </div>
        </div>

        <div className="wrapper col-md-3 col-6">
          <h5 className="fee d-inline mr-3">
            <NumberFormat
              value={fee}
              displayType={"text"}
              thousandSeparator={true}
            />
            <sup>vnd</sup>
          </h5>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    userList: state.userList
  };
};

export default connect(
  mapStateToProps,
  null
)(TripHistoryItem);
