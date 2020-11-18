import React, { Component } from "react";
import "../modal-register/modal-register.css";
import { connect } from "react-redux";
import { actLogin } from "../../actions/user-action";
import classnames from "classnames";

class ModalLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleInputOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLoginSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.actLogin({ email, password });

    setTimeout(() => {
      if (localStorage.jwtToken) {
        document.querySelector(".btn-close-login").click();
        document.querySelector(".modal__form-login").reset();
      }
    }, 500);
  };

  render() {
    const { errors } = this.props;
    return (
      <div
        className="modal fade"
        id="modalLogin"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modal login"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close btn-close-login"
                data-dismiss="modal"
                aria-label="Close"
              >
                x
              </button>
              <h3 className="modal-title text-center">Đăng nhập tài khoản</h3>

              <br />
              <form
                className="modal__form-login"
                onSubmit={this.handleLoginSubmit}
              >
                <div className="form-group">
                  <label htmlFor="emailLogin">Email:</label>
                  <input
                    id="emailLogin"
                    name="email"
                    className={classnames("form-control", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Nhập địa chỉ email của bạn"
                    onChange={this.handleInputOnChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group pr-1">
                  <label htmlFor="passwordLogin">Mật khẩu:</label>
                  <input
                    id="passwordLogin"
                    name="password"
                    className={classnames("form-control", {
                      "is-invalid": errors.password
                    })}
                    type="password"
                    placeholder="Nhập mật khẩu"
                    onChange={this.handleInputOnChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <button className="btn btn-block btn-xedike" type="submit">
                  Đăng nhập
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { actLogin }
)(ModalLogin);
