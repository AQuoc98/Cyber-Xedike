import React, { Component } from "react";
import { connect } from "react-redux";

import { actGetUserList } from "../actions/user-action";
import { actGetTripList } from "../actions/trip-action";

import HeaderComp from "../components/header/header";
import ModalRegister from "../components/modal-register/modal-register";
import ModalLogin from "../components/modal-login/modal-login";
import TripListPageContent from "../components/trip-list-page-content/trip-list-main";

class TripListPage extends Component {
  componentWillMount() {
    this.props.onStoreTripList();
    this.props.onStoreUsersList();
  }

  render() {
    const { tripList } = this.props;
    return (
      <div>
        <HeaderComp />
        <TripListPageContent tripList={tripList} />
        <ModalRegister />
        <ModalLogin />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStoreUsersList: () => {
      dispatch(actGetUserList());
    },
    onStoreTripList: () => {
      dispatch(actGetTripList());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(TripListPage);
