import React, { Component } from 'react';
import {
    Form, Input, Button
} from 'antd';
import { connect } from "react-redux";
import axios from "axios";
import swal from 'sweetalert';


class DriverProfileForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (Object.keys(this.props.driverProfile).length) {
                    axios.post("http://localhost:1234/api/user/driver/adjustDriverProfile", values)
                        .then(res => {
                            console.log(res.data);
                            swal("Sửa thông tin thành công!", "Thông tài về tài xế đã được cập nhật", "success");
                        })
                        .catch(err => {
                            console.log(err.response);
                        })
                }
                else {
                    axios.post("http://localhost:1234/api/user/driver/createProfile", values)
                        .then(res => {
                            swal("Thêm thông tin thành công!", "Thông tài về tài xế đã được cập nhật", "success");
                            console.log(res.data)
                        })
                        .catch(err => {
                            console.log(err.response);
                        })
                }
            }
            else {
                console.log(err);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { passportId, address, job } = this.props.driverProfile;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };


        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                    {...formItemLayout}
                    label="Địa chỉ"
                >
                    {getFieldDecorator('address', {
                        rules: [{
                            required: true, message: 'Vui lòng nhập địa chỉ!',
                        }],
                        initialValue: address,
                    })(
                        <Input placeholder="Nhập địa chỉ của bạn" style={{ width: '100%', }}
                            onChange={this.handleChangeAddress} />
                    )}
                </Form.Item>

                <Form.Item
                    {...formItemLayout}
                    label="Số cmnd"
                >
                    {getFieldDecorator('passportId', {
                        rules: [{ required: true, message: 'Vui lòng nhập số cmnd!' }],
                        initialValue: passportId,
                    })(
                        <Input placeholder="Nhập số cmnd của bạn" style={{ width: '100%', }}
                            onChange={this.handleChangePassport} />
                    )}
                </Form.Item>

                <Form.Item
                    {...formItemLayout}
                    label="Nghề nghiệp"
                >
                    {getFieldDecorator('job', {
                        rules: [{ required: true, message: 'Vui lòng nhập nghề nghiệp của bạn' }],
                        initialValue: job,
                    })(
                        <Input style={{ width: '100%', }} placeholder="Nhập nghề nghiệp của bạn"
                            onChange={this.handleChangeJob} />
                    )}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        {Object.keys(this.props.driverProfile).length > 0 ? "Sửa thông tin tài xế" : "Tạo thông tin tài xế"}
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrapperDriverProfileFomr = Form.create({ name: 'driver-profile' })(DriverProfileForm);

const mapStateToProps = (state) => {
    return {
        driverProfile: state.auth.driverProfile
    }
}

export default connect(mapStateToProps, null)(WrapperDriverProfileFomr);