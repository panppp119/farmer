import React from "react";
import { Link } from "react-router-dom";
import { withTheme } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";

const initialState = {
  first_name: "",
  last_name: "",
  phone_number: "",
  password: "",
  gender: "",
  birthday: ""
};

class RegisterForm extends React.Component {
  state = initialState;

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  register = e => {
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone_number: this.state.phone_number,
      password: this.state.password,
      gender: this.state.gender,
      role_id: this.state.role_id,
      birthday: this.state.birthday
    };

    this.props.signup(data);
  };

  render() {
    const {
      first_name,
      last_name,
      phone_number,
      password,
      confirm_password,
      role_id,
      gender,
      birthday
    } = this.state;

    const { loading } = this.props;

    var disabled = true;
    var pwMatched = false;

    pwMatched = confirm_password !== password;

    if (
      !pwMatched &&
      first_name !== "" &&
      last_name !== "" &&
      gender !== "" &&
      birthday !== "" &&
      role_id !== ""
    ) {
      disabled = false;
    }

    const genderOptions = [
      { label: "ชาย", value: 1 },
      { label: "หญิง", value: 2 }
    ];

    const roleOptions = [
      { label: "ผู้บริโภค", value: 2 },
      { label: "คนขับรถ", value: 3 },
      { label: "ร้านค้า", value: 4 },
      { label: "เกษตรกร", value: 5 }
    ];

    return (
      <div
        className='registre-form'
        style={{
          maxWidth: 400,
          margin: "auto"
        }}
      >
        <form noValidate autoComplete='off'>
          <TextField
            fullWidth
            select
            label='ประเภท'
            value={role_id}
            onChange={this.handleChange("role_id")}
            margin='normal'
          >
            {roleOptions.map((option, i) => (
              <MenuItem key={i} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label='ชื่อ'
            margin='normal'
            value={first_name || ""}
            onChange={this.handleChange("first_name")}
          />
          <TextField
            fullWidth
            label='นามสกุล'
            margin='normal'
            value={last_name || ""}
            onChange={this.handleChange("last_name")}
          />
          <TextField
            fullWidth
            label='เบอร์โทรศัพท์'
            margin='normal'
            value={phone_number || ""}
            onChange={this.handleChange("phone_number")}
          />
          <TextField
            fullWidth
            label='รหัสผ่าน'
            type='password'
            margin='normal'
            value={password || ""}
            onChange={this.handleChange("password")}
          />
          <TextField
            fullWidth
            label='ยืนยันรหัสผ่าน'
            type='password'
            margin='normal'
            value={confirm_password || ""}
            onChange={this.handleChange("confirm_password")}
          />
          <TextField
            fullWidth
            select
            label='เพศ'
            value={gender}
            onChange={this.handleChange("gender")}
            margin='normal'
          >
            {genderOptions.map((option, i) => (
              <MenuItem key={i} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label='วันเกิด'
            type='date'
            value={birthday}
            InputLabelProps={{
              shrink: true
            }}
            onChange={this.handleChange("birthday")}
            style={{ marginTop: 16, marginBottom: 8 }}
          />

          <Button
            fullWidth
            id='signin-button'
            variant='contained'
            color='primary'
            style={{ marginTop: 16, marginBottom: 16 }}
            disabled={disabled || loading}
            onClick={this.register}
          >
            ลงทะเบียน
          </Button>

          <Link to='/sign_in'>เข้าสู่ระบบ</Link>
        </form>
      </div>
    );
  }
}

export default withTheme()(RegisterForm);
