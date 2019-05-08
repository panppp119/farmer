import { connect } from "react-redux";

import { signin, cancelVerification } from "actions/auth";

import SignIn from "./SignIn";

const mapStateToProps = state => ({
  loadingAuth: state.getIn(["auth", "loading"], false),
  verifyCode: state.getIn(["auth", "verifyCode"], false)
});

const mapDispatchToProps = {
  signin: data => signin(data),
  cancelVerification: () => cancelVerification()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
