import React, { Component } from 'react';
import {connect} from "react-redux";

// TODO: import actions
import {actGetUserList} from "../actions/user-action";
import {actGetTripList} from "../actions/trip-action";

// TODO: import components
import HeaderComp from '../components/header/header';
import FooterComp from '../components/footer/footer';
import MainBannerComp from "../components/home/main-banner/main-banner";
import TripList from '../components/home/trips-list-home/trips-list';
import ModalRegister from '../components/modal-register/modal-register';
import ModalLogin from "../components/modal-login/modal-login";

class home extends Component {

    componentWillMount(){
      this.props.onStoreUsersList();
      this.props.onStoreTripList();
    }

  render() {    
    return (
      <div>
          <HeaderComp/>
          <MainBannerComp/>
          <TripList/>
          <FooterComp/>     
          <ModalRegister/>     
          <ModalLogin/>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onStoreUsersList: () => {
      dispatch(actGetUserList())
    },

    onStoreTripList: () => {
      dispatch(actGetTripList())
    },
  }
}

export default connect(null ,mapDispatchToProps)(home);