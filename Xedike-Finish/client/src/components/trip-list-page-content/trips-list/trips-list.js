import React, { Component } from "react";
import "./trip-list.css";
import { connect } from "react-redux";
import TripItem from "./trip-item/trip-item";
import EmptyTripList from "./empty-list/empty-trip-list";

class TripsListComp extends Component {
  renderTripList() {
    const { userList, tripList, searchValue } = this.props;

    if (!tripList.length) {
      return <EmptyTripList message={"Hiện chưa có chuyến đi nào"} />;
    } else {
      if (searchValue.locationFrom === "" || searchValue.locationTo === "") {
        // render full trip list
        return tripList.map((trip, index) => {
          const driver = userList.find(user => {
            return user._id === trip.driverId;
          });
          if (!trip.isFinished)
            return <TripItem driver={driver} trip={trip} key={index} />;
        });
      } else {
        // render filter
        return tripList.map((trip, index) => {
          const driver = userList.find(user => {
            return user._id === trip.driverId;
          });
          if (
            !trip.isFinished &&
            trip.locationFrom === searchValue.locationFrom &&
            trip.locationTo === searchValue.locationTo
          )
            return <TripItem driver={driver} trip={trip} key={index} />;
        });
      }
    }
  }

  render() {
    return (
      <div className="trip-list box-wrapper">
        <div className="trip-list-header">
          <h5>
            <i className="fa fa-list-alt"></i> Danh sách chuyến đi
          </h5>
        </div>
        <div className="trip-list-body">{this.renderTripList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tripList: state.tripList,
    userList: state.userList,
    searchValue: state.searchValue
  };
};

export default connect(
  mapStateToProps,
  null
)(TripsListComp);
