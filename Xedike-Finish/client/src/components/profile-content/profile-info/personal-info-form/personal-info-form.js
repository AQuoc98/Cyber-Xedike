import React, { Component } from "react";
import "./personal-info-form.css";
import { Form, Input, Button, DatePicker } from "antd";
import moment from "moment";
import axios from "axios";
import swal from "sweetalert";

class RegistrationForm extends Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { fullName, DOB } = values;
        const data = {
          fullName,
          DOB: DOB._d
        };

        axios
          .patch("http://localhost:1234/api/user/updateAccount", data)
          .then(res => {
            console.log(res.data);
            swal("Thành công!", "Thông tin của bạn đã được đổi!", "success");
          })
          .catch(err => {
            console.log(err.response);
          });
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { email, fullName, DOB, phone } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="Email">
          {getFieldDecorator("email", {
            rules: [
              {
                required: true
              }
            ],
            initialValue: email ? email : ""
          })(<Input readOnly />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Họ và tên">
          {getFieldDecorator("fullName", {
            rules: [{ required: true, message: "Vui lòng nhập họ và tên!" }],
            initialValue: fullName ? fullName : ""
          })(<Input placeholder="Nhập họ tên của bạn" />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Số điện thoại">
          {getFieldDecorator("phone", {
            rules: [{ required: true }],
            initialValue: phone ? phone : ""
          })(<Input style={{ width: "100%" }} readOnly />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Ngày tháng năm sinh">
          {getFieldDecorator("DOB", {
            rules: [
              { required: true, message: "Vui lòng chọn nhập tháng năm sinh!" }
            ],
            initialValue: DOB ? moment(new Date(DOB), "DD/MM/YYYY") : ""
          })(
            <DatePicker
              placeholder="Chọn ngày tháng năm sinh"
              style={{ width: "100%" }}
            />
          )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Sửa thông tin
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "personal-info" })(
  RegistrationForm
);

export default WrappedRegistrationForm;
