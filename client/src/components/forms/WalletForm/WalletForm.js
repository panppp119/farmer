import React, { Fragment } from "react";
import { Map } from "immutable";
import { withTheme } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";
import { Grid, Container } from "semantic-ui-react";
import { TextField, Button } from "@material-ui/core";

import "./WalletForm.scss";

const initialState = ({ user, address }) => ({
  account_name: "",
  account_number: "",
  bank_name: ""
});

class WalletForm extends React.Component {
  static defaultProps = {
    user: Map()
  };

  state = initialState;

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  update = e => {
    const { account_name, account_number, bank_name } = this.state;
    const { wallet, user } = this.props;

    const wl = {
      account_name: account_name || wallet.get("account_name"),
      account_number: account_number || wallet.get("account_number"),
      bank_name: bank_name || wallet.get("bank_name"),
      user_id: user.get("id")
    };

    if (wallet.isEmpty()) {
      this.props.addWallet(wl);
    } else {
      this.props.updateWallet(wl);
    }

    this.setState({ edit: false });
  };

  edit = e => this.setState({ edit: true });
  cancel = e => this.setState({ edit: false });
  withdraw = e => this.setState({ withdraw: true });

  render() {
    const { account_name, account_number, bank_name, edit } = this.state;
    const { loading, wallet } = this.props;

    var disabled = true;

    if (account_name !== "" && account_number !== "" && bank_name !== "") {
      disabled = false;
    }

    const bankOptions = [
      { label: "ธนาคารกรุงเทพ", value: "bbl" },
      { label: "ธนาคารกสิกรไทย", value: "kbank" },
      { label: "ธนาคารกรุงไทย", value: "ktb" },
      { label: "ธนาคารทหารไทย", value: "tmb" },
      { label: "ธนาคารไทยพาณิชย์", value: "scb" },
      { label: "ธนาคารกรุงศรีอยุธยา", value: "bay" },
      { label: "ธนาคารธนชาต", value: "tbank" },
      { label: "ธนาคารยูโอบี", value: "uob" },
      { label: "ธนาคารแลนด์ แอนด์ เฮาส์", value: "lhbank" },
      {
        label: "ธนาคารพัฒนาวิสาหกิจขนาดกลางและขนาดย่อมแห่งประเทศไทย",
        value: "sme"
      },
      { label: "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร", value: "baac" },
      { label: "ธนาคารเพื่อการส่งออกและนำเข้าแห่งประเทศไทย", value: "exim" },
      { label: "ธนาคารออมสิน", value: "gsb" },
      { label: "ธนาคารอาคารสงเคราะห์", value: "ghb" },
      { label: "ธนาคารอิสลามแห่งประเทศไทย", value: "isalam" }
    ];

    return (
      <div className='wallet-form'>
        <Container>
          <form noValidate autoComplete='off'>
            <Grid>
              <Grid.Column computer={8} mobile={16}>
                <TextField
                  select
                  fullWidth
                  label='ธนาคาร'
                  value={bank_name || wallet.get("bank_name")}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.handleChange("bank_name")}
                  disabled={!wallet.isEmpty() && !edit}
                  margin='normal'
                >
                  {bankOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label='ชื่อบัญชี'
                  margin='normal'
                  value={account_name || wallet.get("account_name")}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.handleChange("account_name")}
                  disabled={!wallet.isEmpty() && !edit}
                />
                <TextField
                  fullWidth
                  label='เลขบัญชี'
                  margin='normal'
                  value={account_number || wallet.get("account_number")}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.handleChange("account_number")}
                  disabled={!wallet.isEmpty() && !edit}
                />
              </Grid.Column>

              <Grid.Column computer={8} mobile={16}>
                {wallet.isEmpty() || edit ? (
                  <Fragment>
                    <Button
                      fullWidth
                      id='save-wallet-button'
                      variant='contained'
                      color='primary'
                      disabled={disabled || loading}
                      onClick={this.update}
                    >
                      บันทึก
                    </Button>

                    <Button
                      fullWidth
                      id='edit-button'
                      variant='contained'
                      onClick={this.cancel}
                    >
                      ยกเลิก
                    </Button>
                  </Fragment>
                ) : (
                  <Button
                    fullWidth
                    id='edit-button'
                    variant='contained'
                    style={{ marginTop: 16 }}
                    onClick={this.edit}
                  >
                    แก้ไข
                  </Button>
                )}

                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  style={{ marginTop: 16, display: edit && "none" }}
                  onClick={this.withdraw}
                >
                  ถอนเงิน
                </Button>
              </Grid.Column>
            </Grid>
          </form>
        </Container>
      </div>
    );
  }
}

export default withTheme()(WalletForm);
