import { connect } from "react-redux";
import { Map } from "immutable";

import { fetchWallet } from "actions/wallet";
import { addTransaction } from "actions/transactions";
import walletSchema from "schemas/wallet";
import transactionSchema from "schemas/transaction";

import Home from "./Home";

const mapStateToProps = state => ({
  user: state.getIn(["user", "data"], Map()),
  wallet: state.getIn(["wallet", "data"], Map()),
  loadingWallet: state.getIn(["wallet", "loading"], false)
});

const mapDispatchToProps = {
  loadWallet: () => fetchWallet(walletSchema),
  addTransaction: data => addTransaction(data, transactionSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
