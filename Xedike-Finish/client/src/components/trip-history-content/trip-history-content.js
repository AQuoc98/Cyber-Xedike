import React, { Component } from "react";
import axios from "axios";
import EmptyTripList from "../trip-list-page-content/trips-list/empty-list/empty-trip-list";
import { Icon } from "antd";
import TripHistoryItem from "./trip-history-item/trip-history-item";
import { connect } from "react-redux";

class TripHistoryContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripsHistory: [],
      title: ""
    };
  }
  componentDidMount() {
    if (this.props.user.userType === "passenger") {
      axios
        .get("http://localhost:1234/api/user/getUserTrip/:tripId")
        .then(res => {
          this.setState({
            tripsHistory: res.data,
            title: "Lịch sử hành trình của bạn:"
          });
        })
        .catch(err => {
          console.log(err.response);
        });
    } else {
      axios("http://localhost:1234/api/user/driver/getDriverTrip/:tripId")
        .then(res => {
          this.setState({
            tripsHistory: res.data,
            title: "Lịch sử chuyến đi của bạn:"
          });
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }

  renderHIstoryTrip = () => {
    if (this.state.tripsHistory.length) {
      return this.state.tripsHistory.map((trip, index) => {
        return <TripHistoryItem key={index} tripInfo={trip} />;
      });
    } else {
      return <EmptyTripList message={"Bạn chưa có chuyến đi nào"} />;
    }
  };
  render() {
    return (
      <div className="container main">
        <div className="box-wrapper">
          <h3>
            <Icon type="car" /> {this.state.title}
          </h3>
          {this.renderHIstoryTrip()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};
export default connect(
  mapStateToProps,
  null
)(TripHistoryContent);
