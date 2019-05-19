import { connect } from "react-redux";

import { register } from "actions/auth";

import Register from "./Register";

const mapStateToProps = state => ({
  loadingAuth: state.getIn(["auth", "loading"], false)
});

const mapDispatchToProps = {
  signup: data => register(data)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
