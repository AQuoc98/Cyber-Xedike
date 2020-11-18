import React, { Component } from "react";

export default class EmptyTripList extends Component {
  render() {
    return (
      <div className="text-center my-5 mx-auto">
        <p className="mt-2">
          <b>{this.props.message}</b>
        </p>
      </div>
    );
  }
}
