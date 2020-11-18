import React, { Component } from "react";
import { Select, Icon, Row, Col } from "antd";
import "./action-box.css";
import places from "../../../../../constants/places-data";

const Option = Select.Option;

export default class ActionBox extends Component {
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

  handleChangeLocationForm = e => {
    this.props.handleOnChange("locationFrom", e);
  };

  handleChangeLocationTo = e => {
    this.props.handleOnChange("locationTo", e);
  };

  handleOnChangeSeat = e => {
    this.props.handleOnChange("availableSeats", e);
  };

  handleOnChangeStartDate = e => {
    this.props.handleOnChange("startTime", e);
  };

  render() {
    const { locationFrom, locationTo} = this.props;
    return (
      <Row type="flex">
        <Col md={12} xs={24}>
          <Select
            className="rounded-left action-item"
            showSearch
            placeholder="Nơi đi"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            size="large"
            suffixIcon={
              <Icon type="environment" theme="twoTone" twoToneColor="#2bc71f" />
            }
            value={locationFrom}
            onChange={this.handleChangeLocationForm}
          >
            {this.renderOptions()}
          </Select>
        </Col>

        <Col md={12} xs={24}>
          <Select
            className="action-item"
            showSearch
            placeholder="Nơi đến"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            name="locationTo"
            size="large"
            suffixIcon={
              <Icon type="environment" theme="twoTone" twoToneColor="#F95F48" />
            }
            value={locationTo}
            onChange={this.handleChangeLocationTo}
          >
            {this.renderOptions()}
          </Select>
        </Col>
      </Row>
    );
  }
}
