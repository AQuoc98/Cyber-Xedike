import React, { Component } from "react";
import HeaderComp from "../components/header/header";
import ModalRegister from "../components/modal-register/modal-register";
import ModalLogin from "../components/modal-login/modal-login";
import BookTripContent from "../components/book-trip-page-content/book-trip-content";

export default class BookTripPage extends Component {
  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { tripId } = this.props.match.params;
    return (
      <div>
        <HeaderComp />
        <BookTripContent tripId={tripId} />
        <ModalRegister />
        <ModalLogin />
      </div>
    );
  }
}
