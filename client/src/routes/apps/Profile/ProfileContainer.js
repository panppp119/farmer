import { connect } from "react-redux";

import { update } from "actions/user";

import Profile from "./Profile";

const mapStateToProps = state => ({
  loadingAuth: state.getIn(["auth", "loading"], false),
  verifyCode: state.getIn(["auth", "verifyCode"], false)
});

const mapDispatchToProps = {
  update: (id, data) => update(id, data)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
