import { connect } from "react-redux";
import { Map } from "immutable";

import { updateUser, fetchUser } from "actions/user";
import { fetchAddress, addAddress, updateAddress } from "actions/addresses";
import userSchema from "schemas/user";
import addressSchema from "schemas/address";

import Profile from "./Profile";

const mapStateToProps = state => ({
  user: state.getIn(["user", "data"], Map()),
  address: state.getIn(["address", "data"], Map()),
  loadingUser: state.getIn(["user", "loading"], false),
  loadingAddress: state.getIn(["address", "loading"], false)
});

const mapDispatchToProps = {
  loadUser: () => fetchUser(userSchema),
  loadAddress: () => fetchAddress(addressSchema),
  updateUser: data => updateUser(data, userSchema),
  addAddress: data => addAddress(data, addressSchema),
  updateAddress: data => updateAddress(data, addressSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
