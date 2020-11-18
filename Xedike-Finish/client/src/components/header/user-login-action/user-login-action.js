import React, { Component } from 'react';
import { Menu, Dropdown } from 'antd';
import { Link } from "react-router-dom";


import "./user-login-action.css";
import { actLogout } from "../../../actions/user-action";
import { connect } from "react-redux";

class UserLoginAction extends Component {


    render() {
        const { avatar } = this.props.user;
        const menu = (
            <Menu>
                <Menu.Item>
                    <Link to="/profile">Thông tin cá nhân</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/trips-history">Lịch sử hành trình</Link>
                </Menu.Item>
                <Menu.Item>
                    <span onClick={this.props.actLogout}>Đăng xuất</span>
                </Menu.Item>
            </Menu>
        );

        return (
            <div>
                <Dropdown overlay={menu} placement="bottomCenter">
                    <img src={avatar ? ("http://localhost:1234/" + avatar) : "./img/user-ic.png"} alt="user avatar" className="user-avatar img-fluid" />
                </Dropdown>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}


export default connect(mapStateToProps, { actLogout })(UserLoginAction)
