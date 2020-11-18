import React, { Component } from "react";
import TripInfoComp from "./trip-info/trip-info";
import BookTripFormComp from "./book-trip-form/book-trip-form";

export default class BookTripContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationGetIn: "",
      locationGetOff: "",
      paymentMethod: "",
      numberOfBookingSeats: 0,
      notes: ""
    };
  }
  render() {
    const { tripId } = this.props;
    return (
      <div className="container main">
        <div className="box-wrapper mb-5">
          <TripInfoComp tripId={tripId} />
        </div>
        <div className="box-wrapper">
          <BookTripFormComp tripId={tripId} />
        </div>
      </div>
    );
  }
}
