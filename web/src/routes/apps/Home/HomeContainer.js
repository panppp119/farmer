import { connect } from 'react-redux';

import {
  signin,
  signup,
  checkAuth
} from 'actions/auth'

import Home from './Home';

const mapStateToProps = ({ auth }) => ({
  loadingAuth: auth.get('loading', false),
  verifyCode: auth.get('verifyCode', false)
});

const mapDispatchToProps = {
  signin: (data) => signin(data),
  signup: (data) => signup(data),
  checkAuth: () => checkAuth()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
