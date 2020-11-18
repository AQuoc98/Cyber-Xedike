import React, { Component } from "react";
import { Form, Input, Button, InputNumber } from "antd";
import { connect } from "react-redux";
import axios from "axios";
import swal from "sweetalert";

class CarProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: "",
      brand: "",
      carImage:
        "https://sanitationsolutions.net/wp-content/uploads/2015/05/empty-image.png",
      numberOfSeats: 2,
      manufacturingYear: "",
      licensePlate: "",
      carId: "",
      carImageUpload: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          brand,
          model,
          manufacturingYear,
          licensePlate,
          numberOfSeats
        } = values;
        const carProfile = {
          brand,
          model,
          manufacturingYear,
          licensePlate,
          numberOfSeats
        };
        let formData = new FormData();
        formData.append("carImage", this.state.carImageUpload);

        if (this.state.carId === "") {
          // chưa có car
          axios
            .post("http://localhost:1234/api/user/driver/addCar", carProfile)
            .then(res => {
              const carId = res.data._id;
              swal(
                "Cập nhật thành công!",
                "Bạn đã tạo thành công thông tin về xe!",
                "success"
              );
              axios
                .patch(
                  `http://localhost:1234/api/user/driver/addCarImage/${carId}`,
                  formData
                )
                .then(res => {
                  console.log(res.data);
                })
                .catch(err => {
                  console.log(err.response);
                });
            })
            .catch(err => {
              console.log(err.response);
            });
        } else {
          // đã có car
          axios
            .patch(
              "http://localhost:1234/api/user/driver/updateCar/" +
                this.state.carId,
              carProfile
            )
            .then(res => {
              swal(
                "Cập nhật thành công!",
                "Bạn đã cập nhật thành công thông tin về xe!",
                "success"
              );
              const carId = res.data[res.data.length - 1]._id;
              if (this.state.carImageUpload !== "") {
                axios
                  .patch(
                    `http://localhost:1234/api/user/driver/addCarImage/${carId}`,
                    formData
                  )
                  .then(res => {
                    console.log(res.data);
                  })
                  .catch(err => {
                    console.log(err.response);
                  });
              }
            })
            .catch(err => {
              console.log(err.response);
            });
        }
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    const { carInfo } = nextProps.driverProfile;
    if (carInfo) {
      if (carInfo.length) {
        const {
          brand,
          model,
          manufacturingYear,
          licensePlate,
          numberOfSeats,
          carImage
        } = carInfo[carInfo.length - 1];

        this.setState({
          brand,
          model,
          manufacturingYear,
          licensePlate,
          numberOfSeats,
          carImage: "http://localhost:1234/" + carImage,
          carId: carInfo[carInfo.length - 1]._id
        });
      }
    }
  }

  handleUploadImage = e => {
    this.setState({
      carImageUpload: e.target.files[0]
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

    const {
      brand,
      model,
      manufacturingYear,
      licensePlate,
      numberOfSeats,
      carImage
    } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="Hình ảnh xe">
            {getFieldDecorator("carImage", {
              rules: [{ required: true, message: "Vui lòng chọn hình ảnh xe!" }]
            })(
              <div style={{ display: "flex" }}>
                <img
                  src={carImage}
                  width="200px"
                  height="150px"
                  className="mr-3"
                  alt="car"
                />
                <input
                  type="file"
                  className="form-control"
                  onChange={this.handleUploadImage}
                  style={{ height: "40px" }}
                  required
                />
              </div>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="Nhãn xe">
            {getFieldDecorator("brand", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập mẫu xe!"
                }
              ],
              initialValue: brand
            })(
              <Input
                placeholder="Nhập nhãn cho xe của bạn"
                style={{ width: "100%" }}
              />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="Model xe">
            {getFieldDecorator("model", {
              rules: [{ required: true, message: "Vui lòng nhập model!" }],
              initialValue: model
            })(
              <Input
                placeholder="Nhập model cho xe của bạn"
                style={{ width: "100%" }}
              />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="Năm sản xuất">
            {getFieldDecorator("manufacturingYear", {
              rules: [
                { required: true, message: "Vui lòng chọn số năm sản xuất!" }
              ],
              initialValue: manufacturingYear
            })(
              <Input
                style={{ width: "100%" }}
                placeholder="Nhập năm sản xuất xe của bạn"
              />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="Mã bằng lái">
            {getFieldDecorator("licensePlate", {
              rules: [{ required: true, message: "Vui lòng nhập bằng lái!" }],
              initialValue: licensePlate
            })(
              <Input
                style={{ width: "100%" }}
                placeholder="Nhập mã bằng lái của bạn"
              />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="Số ghế trên xe">
            {getFieldDecorator("numberOfSeats", {
              rules: [
                { required: true, message: "Vui lòng chọn số ghế trên xe!" }
              ],
              initialValue: numberOfSeats
            })(
              <InputNumber
                placeholder="Chọn số ghế của xe"
                min={2}
                max={10}
                step={1}
                style={{ width: "100%" }}
              />
            )}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrapperCarProfileForm = Form.create({ name: "car-profile" })(
  CarProfileForm
);

const mapStateToProps = state => {
  return {
    driverProfile: state.auth.driverProfile
  };
};

export default connect(
  mapStateToProps,
  null
)(WrapperCarProfileForm);
