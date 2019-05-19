import React from 'react';
import { Link } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

const initialState = {
  phone_number: '',
  password: ''
};

class SignInForm extends React.Component {
  state = initialState;

  handleChange = name => e => {
    this.setState({ [name]: e.target.value })
  };

  signin = e => {
    e.preventDefault();

    const data = {
      phone_number: this.state.phone_number,
      password: this.state.password
    }

    this.props.signin(data)
  };

  render() {
    const { phone_number, password } = this.state;
    const { loading, verifyCode } = this.props;

    var disabled = true;

    if (phone_number !== '' && password !== '') {
      disabled = false;
    }

    return (
      <div
        className='signin-form'
        style={{
          maxWidth: 400,
          margin: 'auto',
          display: verifyCode && 'none'
        }}
      >
        <form autoComplete='off'>
          <TextField
            fullWidth
            label='เบอร์โทรศัพท์'
            margin='normal'
            value={phone_number || ''}
            onChange={this.handleChange('phone_number')}
          />
          <TextField
            fullWidth
            type='password'
            label='รหัสผ่าน'
            margin='normal'
            value={password || ''}
            onChange={this.handleChange('password')}
          />

          <Button
            fullWidth
            id='signin-button'
            variant='contained'
            color='primary'
            style={{ marginTop: 16 }}
            disabled={disabled || loading}
            onClick={this.signin}
          >
            เข้าสู่ระบบ
          </Button>

          <Link to='/register'>ลงทะเบียน</Link>
        </form>
      </div>
    );
  }
}

export default withTheme()(SignInForm);
