import { connect } from "react-redux";
import { Map } from "immutable";

import { updateUser, fetchUser } from "actions/user";
import { fetchAddress, addAddress, updateAddress } from "actions/addresses";
import { fetchFarms, addFarm, updateFarm } from "actions/farms";
import userSchema from "schemas/user";
import addressSchema from "schemas/address";
import farmSchema from "schemas/farm";

import Profile from "./Profile";

const mapStateToProps = state => ({
  user: state.getIn(["user", "data"], Map()),
  address: state.getIn(["address", "data"], Map()),
  farms: state.getIn(["farms", "data"], Map()),
  loadingUser: state.getIn(["user", "loading"], false),
  loadingAddress: state.getIn(["address", "loading"], false),
  loadingFarms: state.getIn(["farms", "loading"], false)
});

const mapDispatchToProps = {
  loadUser: () => fetchUser(userSchema),
  loadAddress: () => fetchAddress(addressSchema),
  loadFarms: () => fetchFarms(farmSchema),
  updateUser: data => updateUser(data, userSchema),
  addAddress: data => addAddress(data, addressSchema),
  updateAddress: data => updateAddress(data, addressSchema),
  addFarms: data => addFarm(data, farmSchema),
  updateFarms: data => updateFarm(data, farmSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
