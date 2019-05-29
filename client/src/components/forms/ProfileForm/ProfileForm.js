import React, { Fragment } from "react";
import { Map } from "immutable";
import { withTheme } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";
import { Grid, Container } from "semantic-ui-react";
import { TextField, Button } from "@material-ui/core";

import GMap from "components/GMap";

import "./ProfileForm.scss";

const initialState = ({ user, address }) => ({
  edit: false,
  first_name: user.get("first_name"),
  last_name: user.get("last_name"),
  phone_number: user.get("phone_number"),
  gender: user.get("gender"),
  birthday: user.get("birthday"),
  address: {
    lat: address.get("lat"),
    lng: address.get("lng"),
    name: address.get("name")
  }
});

class ProfileForm extends React.Component {
  static defaultProps = {
    user: Map()
  };

  state = initialState;

  componentDidUpdate(prevProps) {
    if (
      prevProps.address.isEmpty() &&
      prevProps.address !== this.props.address
    ) {
      this.setState({ address: this.props.address });
    }
  }

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  update = e => {
    const { user, address } = this.props;

    const usr = {
      first_name: this.state.first_name || user.get("first_name"),
      last_name: this.state.last_name || user.get("last_name"),
      gender: this.state.gender || user.get("gender"),
      birthday: this.state.birthday || user.get("birthday")
    };

    const addrs = {
      lat: this.state.address.lat || address.get("lat"),
      lng: this.state.address.lng || address.get("lng"),
      name: this.state.address.name || address.get("name") || "",
      user_id: user.get("id")
    };

    if (address.isEmpty()) {
      this.props.addAddress(addrs);
    } else {
      this.props.updateAddress(addrs);
    }

    this.props.updateUser(usr);
    this.setState({ edit: false });
  };

  onPlaceChange = address => {
    this.setState({ address });
  };

  edit = e => {
    this.setState({ edit: true });
  };

  cancel = e => {
    this.setState({ edit: false });
  };

  render() {
    const {
      first_name,
      last_name,
      gender,
      birthday,
      phone_number,
      edit
    } = this.state;
    const { loading, user, address } = this.props;

    var disabled = true;

    if (
      first_name !== "" &&
      last_name !== "" &&
      gender !== "" &&
      birthday !== ""
    ) {
      disabled = false;
    }

    const genderOptions = [
      { label: "ชาย", value: 1 },
      { label: "หญิง", value: 2 }
    ];

    return (
      <div className='profile-form'>
        <Container>
          <form noValidate autoComplete='off'>
            <Grid>
              <Grid.Column computer={8} mobile={16}>
                <TextField
                  fullWidth
                  label='ชื่อ'
                  margin='normal'
                  value={first_name || user.get("first_name")}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.handleChange("first_name")}
                  disabled={!edit}
                />
                <TextField
                  fullWidth
                  label='นามสกุล'
                  margin='normal'
                  value={last_name || user.get("last_name")}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.handleChange("last_name")}
                  disabled={!edit}
                />
                <TextField
                  fullWidth
                  label='เบอร์โทรศัพท์'
                  margin='normal'
                  value={phone_number || user.get("phone_number")}
                  InputLabelProps={{
                    shrink: true
                  }}
                  disabled={!edit}
                  onChange={this.handleChange("phone_number")}
                />
                <TextField
                  select
                  fullWidth
                  label='เพศ'
                  value={gender || user.get("gender")}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.handleChange("gender")}
                  disabled={!edit}
                  margin='normal'
                >
                  {genderOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  style={{ marginTop: 16, marginBottom: 8 }}
                  fullWidth
                  label='วันเกิด'
                  type='date'
                  value={birthday || user.get("birthday")}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.handleChange("birthday")}
                  disabled={!edit}
                />

                {!address.isEmpty() && (
                  <div
                    style={{
                      marginTop: 16,
                      pointerEvents: !edit && "none",
                      filter: !edit && "opacity(50%)"
                    }}
                  >
                    <GMap
                      place
                      drag
                      address={this.props.address.toJS()}
                      onPlaceChange={this.onPlaceChange}
                    />
                  </div>
                )}
              </Grid.Column>

              <Grid.Column computer={8} mobile={16}>
                {edit ? (
                  <Fragment>
                    <Button
                      fullWidth
                      id='save-profile-button'
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
              </Grid.Column>
            </Grid>
          </form>
        </Container>
      </div>
    );
  }
}

export default withTheme()(ProfileForm);
