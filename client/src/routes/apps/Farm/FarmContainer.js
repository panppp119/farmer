import { connect } from "react-redux";
import { Map } from "immutable";

import { fetchFarms, addFarm, updateFarm } from "actions/farms";
import farmSchema from "schemas/farm";

import Farm from "./Farm";

const mapStateToProps = state => ({
  user: state.getIn(["user", "data"], Map()),
  farms: state.getIn(["farms", "data"], Map()),
  loadingFarms: state.getIn(["farms", "loading"], false)
});

const mapDispatchToProps = {
  loadFarms: () => fetchFarms(farmSchema),
  add: data => addFarm(data, farmSchema),
  update: data => updateFarm(data, farmSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Farm);
