import React, { Component } from "react";
import { Form, Input, Select, Button } from "antd";
import places from "../../../constants/places-data";
import axios from "axios";
import swal from "sweetalert";

const { Option } = Select;
const { TextArea } = Input;

class BookTripForm extends Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios({
          method: "POST",
          url: `http://localhost:1234/api/trip/bookTrip/${this.props.tripId}`,
          data: values
        })
          .then(res => {
            swal(
              "Đăng ký thành công!",
              "Bạn đã có thể tham gia cuộc hành trình này",
              "success"
            );
            setTimeout(() => {
              window.location.href = "http://localhost:3000";
            }, 500);
          })
          .catch(err => {
            if (err.response.status === 500) {
              swal("Lỗi!", err.response.data.error, "warning");
            } else if (err.response.status === 401) {
              swal("Lỗi!", "Yêu cầu đăng nhập để tiếp tục", "warning");
            } else {
              if (err.response.data.error === "No permission") {
                swal(
                  "Lỗi!",
                  "Bạn không thể thực hiện chức năng này",
                  "warning"
                );
              }
            }
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
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
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
        <Form.Item {...formItemLayout} label="Hình thức thanh toán">
          {getFieldDecorator("paymentMethod", {
            rules: [
              {
                required: true,
                message: "Vui lòng nhập hình thức thanh toán!"
              }
            ],
            initialValue: "cash"
          })(
            <Select style={{ width: "100%" }} size="large">
              <Option value="cash">Tiền mặt</Option>
              <Option value="card">Thẻ</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Ghi chú">
          {getFieldDecorator("notes", {})(
            <TextArea
              rows={6}
              placeholder="Nội dung ghi chú"
              style={{ width: "100%" }}
            />
          )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">
            Đặt chỗ
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrapperBookTripForm = Form.create({ name: "register" })(BookTripForm);

export default WrapperBookTripForm;
