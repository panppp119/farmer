import { connect } from "react-redux";
import { Map } from 'immutable'

import { updateUser, fetchUser } from "actions/user";
import { addAddress, updateAddress } from "actions/addresses";
import userSchema from 'schemas/user'
import addressSchema from 'schemas/address'

import Profile from "./Profile";

const mapStateToProps = state => ({
  user: state.getIn(["user", "data"], Map()),
  address: state.getIn(["addresses", "data"], Map()),
  loadingUser: state.getIn(["user", "loading"], false),
  loadingAddress: state.getIn(["addresses", "loading"], false),
});

const mapDispatchToProps = {
  loadUser: () => fetchUser(userSchema),
  updateUser: (data) => updateUser(data, userSchema),
  addAddress: (data) => addAddress(data, addressSchema),
  updateAddress: (data) => updateAddress(data, addressSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
