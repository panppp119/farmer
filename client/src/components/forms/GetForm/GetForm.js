import React from "react";
import { Map } from "immutable";
import { withTheme } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";

import "./GetForm.scss";

const initialState = ({ user, address }) => ({
  product_id: null,
  quantity: 0,
  unit: null
});

class GetForm extends React.Component {
  static defaultProps = {
    driver: Map()
  };

  state = initialState;

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  add = e => {
    e.preventDefault();

    const product = {
      driver_id: this.props.driver.get("id"),
      user_id: this.props.user_id,
      product_id: this.state.product_id,
      quantity: this.state.quantity,
      unit: this.state.unit,
      status: "รอปิดการขาย"
    };

    this.props.addProduct(product);
    this.props.close();
  };

  render() {
    const { product_id, quantity, unit } = this.state;
    const { loading, market } = this.props;

    const productOptions = market.map(item => ({
      label: item.get("name"),
      value: item.get("id")
    }));

    return (
      <div className='get-form'>
        <form noValidate autoComplete='off'>
          <TextField
            select
            fullWidth
            label='สินค้า'
            value={product_id}
            InputLabelProps={{
              shrink: true
            }}
            style={{ marginTop: 0 }}
            onChange={this.handleChange("product_id")}
            margin='normal'
          >
            {productOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            type='number'
            label='จำนวน'
            margin='normal'
            value={quantity}
            InputLabelProps={{
              shrink: true
            }}
            onChange={this.handleChange("quantity")}
          />

          <TextField
            fullWidth
            label='หน่วย'
            margin='normal'
            value={unit}
            InputLabelProps={{
              shrink: true
            }}
            onChange={this.handleChange("unit")}
          />

          <Button
            fullWidth
            color='primary'
            variant='contained'
            style={{ marginTop: 16 }}
            onClick={this.add}
            disabled={loading}
          >
            ยืนยัน
          </Button>
        </form>
      </div>
    );
  }
}

export default withTheme()(GetForm);
