import React, { Fragment } from 'react'
import { withTheme } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

import firebase from 'utils/firebase'

const auth = firebase.auth()
const initialState = {
  phone_number: ''
}

class SignInForm extends React.Component {
  state = initialState

  componentDidMount() {
    auth.useDeviceLanguage();

    auth.settings.appVerificationDisabledForTesting = true;
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

  handleChange = name => e => {
    if (name === 'phone_number') {
      this.setState({ [name]: e.target.value.replace('0', '+66') });
    }
    else {
      this.setState({ [name]: e.target.value });
    }
  };

  changeForm = name => () => {
    this.props.changeForm(name)
  }

  submitPhoneNumber = (e) => {
    e.preventDefault()

    if (this.isPhoneNumberValid()) {
      var phone_number = this.state.phone_number;

      this.props.signin({ submit: 'phone_number', phone_number })
    }
  }

  submitCode = code => (e) => {
    e.preventDefault();

    if (code) {
      this.props.signin({ submit: 'code', code })
    }
  }

  cancelVerification = (e) => {
    e.preventDefault();
    window.confirmationResult = null;

    this.setState(initialState)
  }

  isPhoneNumberValid () {
    var pattern = /^\+[0-9\s\-\(\)]+$/;
    var phoneNumber = this.state.phone_number;

    return phoneNumber.search(pattern) !== -1;
  }

  render () {
    const { phone_number } = this.state
    const { loading, verifyCode } = this.props

    var disabled = true

    if (phone_number !== '') {
      disabled = false
    }

    return (
      <Fragment>
        <div className="registre-form" style={{ maxWidth: 400, margin: 'auto', display: verifyCode && 'none'}}>
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              label="เบอร์โทรศัพท์"
              margin="normal"
              onChange={this.handleChange('phone_number')}
            />

            <div id="recaptcha-container"></div>

            <Button fullWidth
              variant="contained"
              color='primary'
              style={{ marginTop: 16 }}
              disabled={disabled || loading}
              onClick={this.submitPhoneNumber}
            >
              เข้าสู่ระบบ
            </Button>

            <Button onClick={this.changeForm('register')} style={{ marginTop: 16 }} color='primary'>
              ลงทะเบียน
            </Button>
          </form>
        </div>

        <div className="code-form" style={{ maxWidth: 400, margin: 'auto', display: !verifyCode && 'none'}}>
          <TextField
            style={{ marginTop: 8 }}
            fullWidth
            label="รหัสยืนยัน"
            margin="normal"
            onChange={this.handleChange('code')}
          />

          <Button fullWidth
            id="verification-button"
            variant="contained"
            color='primary'
            style={{ marginTop: 16 }}
            disabled={loading}
            onClick={this.submitCode(this.state.code)}
          >
            ส่งรหัส
          </Button>
          <Button fullWidth
            variant="contained"
            color='secondary'
            style={{ marginTop: 16 }}
            onClick={this.cancelVerification}
          >
            ยกเลิก
          </Button>
        </div>
      </Fragment>
    )
  }
}

export default withTheme()(SignInForm)
