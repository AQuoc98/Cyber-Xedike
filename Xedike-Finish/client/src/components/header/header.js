import React, { Component } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import ActionBox from "./action-group/action-group";
import { connect } from "react-redux";
import UserLoginAction from "./user-login-action/user-login-action";
import DriverLoginAction from "./driver-login-action/driver-login-action";
import { changeSearchValue } from "../../actions/search-action";

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: this.props.user ? this.props.user.userType : ""
    };
  }

  renderActionGroup = () => {
    if (!localStorage.jwtToken) {
      return <ActionBox />;
    } else if (this.state.userType === "passenger") {
      return <UserLoginAction />;
    } else if (this.state.userType === "driver") {
      return <DriverLoginAction />;
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      userType: nextProps.user ? nextProps.user.userType : ""
    });
  }

  handleResetSearchValue = e => {
    this.props.onChangeSearchValue("", "", new Date(), 1);
  };

  render() {
    return (
      <header>
        <nav className="navbar navbar-xedike">
          <Link className="navbar-brand" to="/">
            <img src="../img/logo.png" alt="logo" />
          </Link>

          <div className="navbar-btn-group">
            <Link
              className="nav-link"
              to="/trips"
              onClick={this.handleResetSearchValue}
            >
              Danh sách chuyến đi
            </Link>
            {this.renderActionGroup()}
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeSearchValue: (
      locationFrom,
      locationTo,
      startTime,
      availableSeats
    ) => {
      dispatch(
        changeSearchValue(locationFrom, locationTo, startTime, availableSeats)
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(header);
