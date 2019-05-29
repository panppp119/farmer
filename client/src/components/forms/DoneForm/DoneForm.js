import React from "react";
import { Map } from "immutable";
import { withTheme } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { Grid } from "semantic-ui-react";

import "./DoneForm.scss";

class DoneForm extends React.Component {
  static defaultProps = {
    driver: Map()
  };

  state = {
    amount: 0
  };

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  add = e => {
    const { amount } = this.state;
    const price =
      this.props.market
        .find(m => m.get("id") === this.props.product.get("product_id"))
        .get("amount") || Map();
    const total = price * this.props.product.get("quantity") || 0;

    const product = {
      driver_id: this.props.driver.get("id"),
      status: "ปิดการขาย"
    };

    const transaction = {
      wallet_id: this.props.driver.get("wallet_id"),
      amount: amount === 0 || amount === "" ? total : amount,
      status: "เสร็จสิ้น",
      type: "เงินเข้า"
    };

    this.props.updateProduct(this.props.product.get("id"), product);
    this.props.addTransaction(transaction);
    this.props.close();
  };

  render() {
    const { amount } = this.state;
    const { loading, product, market } = this.props;

    const product_name =
      market.find(m => m.get("id") === product.get("product_id")).get("name") ||
      Map();
    const price =
      market
        .find(m => m.get("id") === product.get("product_id"))
        .get("amount") || Map();
    const total = price * product.get("quantity");

    return (
      <div className='done-form'>
        <Grid columns={2} stackable>
          <Grid.Column>
            <Grid columns={2}>
              <Grid.Column>
                <h4>ชื่อสินค้า</h4>
              </Grid.Column>
              <Grid.Column>
                <p>{product_name}</p>
              </Grid.Column>

              <Grid.Column>
                <h4>จำนวน</h4>
              </Grid.Column>
              <Grid.Column>
                <p>{product.get("quantity")}</p>
              </Grid.Column>

              <Grid.Column>
                <h4>หน่วย</h4>
              </Grid.Column>
              <Grid.Column>
                <p>{product.get("unit")}</p>
              </Grid.Column>
            </Grid>
          </Grid.Column>

          <Grid.Column>
            <form noValidate autoComplete='off'>
              <TextField
                fullWidth
                type='number'
                label='ยอดขาย'
                margin='normal'
                value={amount === 0 || amount === "" ? total : amount}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={this.handleChange("amount")}
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
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withTheme()(DoneForm);
