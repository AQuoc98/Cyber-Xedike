import React from "react";

import { Form, Select, Button, InputNumber, DatePicker } from "antd";
import moment from "moment";
import places from "../../../../constants/places-data";
import axios from "axios";
import swal from "sweetalert";

const { Option } = Select;

class CreateTripForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleCancel();
        axios
          .post("http://localhost:1234/api/trip/createTrip", values)
          .then(res => {
            console.log(res.data);
            swal(
              "Tạo chuyến đi thành công!",
              "Bạn đã có thể cho người khác tham gia vào cuộc hành trình",
              "success"
            );
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  renderOptions = () => {
    return places
      .sort((a, b) => a.value.localeCompare(b.value))
      .map((place, index) => {
        return (
          <Option value={place.value} key={index}>
            {place.label}
          </Option>
        );
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

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
        <Form.Item {...formItemLayout} label="Nơi đi">
          {getFieldDecorator("locationFrom", {
            rules: [
              {
                required: true,
                message: "Vui lòng nhập nơi đi!"
              }
            ]
          })(
            <Select
              style={{ width: "100%" }}
              size="large"
              placeholder="Chọn nơi đi"
            >
              {this.renderOptions()}
            </Select>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Nơi đến">
          {getFieldDecorator("locationTo", {
            rules: [
              {
                required: true,
                message: "Vui lòng nhập nơi đến!"
              }
            ]
          })(
            <Select
              style={{ width: "100%" }}
              size="large"
              placeholder="Chọn nơi đến"
            >
              {this.renderOptions()}
            </Select>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Số ghế hành khách">
          {getFieldDecorator("availableSeats", {
            rules: [
              {
                required: true,
                message: "Vui lòng nhập số ghế!"
              }
            ],
            initialValue: 2
          })(
            <InputNumber
              min={2}
              max={36}
              style={{ width: "100%" }}
              size="large"
              placeholder="Chọn số ghế cần đặt"
            />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Ngày khởi hành">
          {getFieldDecorator("startTime", {
            rules: [
              {
                required: true,
                message: "Vui lòng nhập ngày khởi hành!"
              }
            ],
            initialValue: moment(new Date(), "DD/MM/YYYY")
          })(
            <DatePicker
              size="large"
              name="startTime"
              style={{ width: "100%" }}
            />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Số phí">
          {getFieldDecorator("fee", {
            rules: [
              {
                required: true,
                message: "Vui lòng nhập số tiền thanh toán!"
              }
            ],
            initialValue: 30000
          })(
            <InputNumber
              placeholder="Nhập số tiền"
              style={{ width: "100%" }}
              size="large"
              step={20000}
              min={30000}
            />
          )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">
            Tạo chuyến đi
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrapperCreateTrip = Form.create({ name: "createTrip" })(CreateTripForm);

export default WrapperCreateTrip;
