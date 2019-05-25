import { connect } from "react-redux";
import { Map } from "immutable";

import { fetchUser } from "actions/user";
import { fetchWallet, updateWallet, addWallet } from "actions/wallet";
import userSchema from "schemas/user";
import walletSchema from "schemas/wallet";

import Wallet from "./Wallet";

const mapStateToProps = state => ({
  user: state.getIn(["user", "data"], Map()),
  wallet: state.getIn(["wallet", "data"], Map()),
  loadingUser: state.getIn(["user", "loading"], false),
  loadingWallet: state.getIn(["wallet", "loading"], false)
});

const mapDispatchToProps = {
  loadUser: () => fetchUser(userSchema),
  loadWallet: () => fetchWallet(walletSchema),
  addWallet: data => addWallet(data, walletSchema),
  updateWallet: data => updateWallet(data, walletSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);
