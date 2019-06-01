import { connect } from "react-redux";
import { Map } from "immutable";

import Shop from "./Shop";

const mapStateToProps = state => ({
  user: state.getIn(["user", "data"], Map())
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
