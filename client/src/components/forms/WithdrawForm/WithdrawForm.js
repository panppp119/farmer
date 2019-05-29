import React from "react";
import Numeral from "numeral";
import { Map } from "immutable";
import { withTheme } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { Grid } from "semantic-ui-react";

import "./WithdrawForm.scss";

class WithdrawForm extends React.Component {
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

    const transaction = {
      wallet_id: this.props.wallet.get("id"),
      amount: amount,
      status: "รอการยืนยัน",
      type: "ถอนเงิน"
    };

    this.props.addTransaction(transaction);
    this.props.close();
  };

  render() {
    const { amount } = this.state;
    const { loading, wallet } = this.props;

    return (
      <div className='withdraw-form'>
        <Grid columns={2} stackable>
          <Grid.Column>
            <Grid columns={2}>
              <Grid.Column>
                <h4>เงินในกระเป๋า</h4>
              </Grid.Column>
              <Grid.Column>
                <p>THB {Numeral(wallet.get("amount")).format("0,0.00")}</p>
              </Grid.Column>
            </Grid>
          </Grid.Column>

          <Grid.Column>
            <form noValidate autoComplete='off'>
              <TextField
                fullWidth
                type='number'
                label='จำนวนเงินที่ต้องการถอน'
                margin='normal'
                value={amount}
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

export default withTheme()(WithdrawForm);
