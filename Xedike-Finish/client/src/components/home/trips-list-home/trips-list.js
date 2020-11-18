import React, { Component } from 'react';
import TripListItem from "./trip-item/trip-item";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeSearchValue } from "../../../actions/search-action";

class TripList extends Component {
  renderTripList = () => {
    const { userList, tripList } = this.props;
    return tripList.map(function (trip, index) {
      const driver = userList.find(user => {
        return user._id === trip.driverId;
      })
      if (index < 5 && !trip.isFinished && trip)
        return <TripListItem driver={driver} trip={trip} key={index} />
    })
  }

  handleResetSearchValue = (e) => {
    this.props.onChangeSearchValue("", "", new Date(), 1);
  }

  render() {
    return (
      <section className="trip-list-container py-5">
        <div className="container">
          <h1 className="text-center">Danh sách chuyến đi</h1>
          <ul className="trip-list my-5">
            {this.renderTripList()}

            <p className="text-center mt-5">
              <Link to="/trips" className="btn btn-dark" onClick={this.handleResetSearchValue}>Xem thêm</Link>
            </p>
          </ul>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tripList: state.tripList,
    userList: state.userList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeSearchValue: (locationFrom, locationTo, startTime, availableSeats) => {
      dispatch(changeSearchValue(locationFrom, locationTo, startTime, availableSeats));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripList);


