import React from "react";
import { Map } from 'immutable'
import { withTheme } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";
import { Grid, Container } from 'semantic-ui-react'
import { TextField, Button } from "@material-ui/core";

import GMap from 'components/GMap'

import './ProfileForm.scss'

const initialState = ({ user, address }) => ({
  edit: false,
  first_name: user.get('first_name'),
  last_name: user.get('last_name'),
  gender: user.get('gender'),
  birth_date: user.get('birth_date'),
  address: {
    name: address.get('name'),
    lat: address.get('lat'),
    lng: address.get('lng'),
    number: address.get('number'),
    district: address.get('district'),
    sub_district: address.get('sub_district'),
    province: address.get('province'),
    zip_code: address.get('zip_code')
  }
})

class ProfileForm extends React.Component {
  static defaultProps = {
    user: Map()
  }

  state = initialState;

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  update = e => {
    e.preventDefault();

    const user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      gender: this.state.gender,
      birth_date: this.state.birth_date,
    }

    // const address = {
    //   name: this.state.address.name,
    //   lat: this.state.address.name,
    //   lng: this.state.address.name,
    //   number: this.state.address.number,
    //   district: this.state.address.district,
    //   sub_district: this.state.address.sub_district,
    //   province: this.state.address.province,
    //   zip_code: this.state.address.zip_code
    // }

    this.props.updateUser(user)
    // this.props.updateAddress(address)

    this.setState({ edit: false })
  };

  edit = e => {
    e.preventDefault()

    this.setState({ edit: true })
  }

  render() {
    const { first_name, last_name, gender, birth_date, address, edit } = this.state;
    const { loading, user } = this.props;

    var disabled = true;
    var phone_number = (!user.isEmpty() && user.get('phone_number').replace('+66', '0')) || ''

    if (first_name !== '' && last_name !== '' && gender !== '' && birth_date !== '') {
      disabled = false
    }

    const genderOptions = [
      { label: 'ชาย', value: 0 },
      { label: 'หญิง', value: 1 }
    ]

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
                  value={first_name || user.get('first_name')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange("first_name")}
                  disabled={!edit}
                />
                <TextField
                  fullWidth
                  label='นามสกุล'
                  margin='normal'
                  value={last_name || user.get('last_name')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange("last_name")}
                  disabled={!edit}
                />
                <TextField
                  fullWidth
                  label='เบอร์โทรศัพท์'
                  margin='normal'
                  value={phone_number}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
                <TextField
                  select
                  fullWidth
                  label="เพศ"
                  value={gender || user.get('gender')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange('gender')}
                  disabled={!edit}
                  margin="normal"
                >
                  {genderOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField style={{ marginTop: 16, marginBottom: 8 }}
                  fullWidth
                  label="วันเกิด"
                  type="date"
                  defaultValue={birth_date || user.get('first_name')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange('birth_date')}
                  disabled={!edit}
                />
              </Grid.Column>

              <Grid.Column computer={8} mobile={16}>
                <GMap place={edit} drag={edit} />
              </Grid.Column>
            </Grid>

            {edit ? (
              <Button
                fullWidth
                id='save-profile-button'
                variant='contained'
                color='primary'
                style={{ marginTop: 16 }}
                disabled={disabled || loading}
                onClick={this.update}
              >
                บันทึก
              </Button>
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
          </form>
        </Container>
      </div>
    );
  }
}

export default withTheme()(ProfileForm);
