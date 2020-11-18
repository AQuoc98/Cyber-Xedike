import React, { Component } from 'react';
import HeadersComp from '../components/header/header';
import ModalRegister from '../components/modal-register/modal-register';
import ModalLogin from "../components/modal-login/modal-login";
import ProfileDriverContent from '../components/profile-driver-content/profile-driver-content';

export default class ProfileDriver extends Component {
  render() {
    const { driverId } = (this.props.match.params);
    return (
      <div>
        <HeadersComp/>
        <ProfileDriverContent driverId={driverId} />
        <ModalRegister />
        <ModalLogin />
      </div>
    )
  }
}

