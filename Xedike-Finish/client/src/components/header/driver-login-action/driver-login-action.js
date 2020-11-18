import React, { Component } from 'react';
import { Menu, Dropdown, Modal } from 'antd';
import { connect } from "react-redux";
import { actLogout } from "../../../actions/user-action";
import { actRemoveDriverProfile } from "../../../actions/driver-action";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import CreateTripComp from './create-trip/create-trip';


class DriverLoginAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    handleLogout = () => {
        this.props.actLogout();
        this.props.actRemoveDriverProfile();
    }

    showModal = (e) => {
        this.setState({
            visible: true,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

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
                    <span onClick={this.handleLogout}>Đăng xuất</span>
                </Menu.Item>
            </Menu>
        );

        return (
            <div style={{ display: "flex" }}>
                <button className="btn-action mr-3" onClick={this.showModal}><Icon type="plus" /> Tạo chuyến đi</button>
                <Dropdown overlay={menu} placement="bottomCenter" >
                    <img src={avatar ? ("http://localhost:1234/" + avatar) : "./img/user-ic.png"}
                        alt="user avatar" className="user-avatar img-fluid" />
                </Dropdown>
                <Modal
                    title="Tạo chuyến đi của bạn "
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    className="modal-create-trip"
                >
                    <CreateTripComp handleCancel={this.handleCancel} />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { actLogout, actRemoveDriverProfile })(DriverLoginAction);