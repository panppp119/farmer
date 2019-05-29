import { connect } from "react-redux";
import { Map } from "immutable";

import { fetchWallet } from "actions/wallet";
import walletSchema from "schemas/wallet";

import Home from "./Home";

const mapStateToProps = state => ({
  wallet: state.getIn(["wallet", "data"], Map()),
  loadingWallet: state.getIn(["wallet", "loading"], false)
});

const mapDispatchToProps = {
  loadWallet: () => fetchWallet(walletSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
