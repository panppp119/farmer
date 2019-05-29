import { connect } from "react-redux";
import { Map } from "immutable";

import { fetchTransactions } from "actions/transactions";
import transactionSchema from "schemas/transaction";

import TransactionsTable from "./TransactionsTable";

const mapStateToProps = state => ({
  user: state.getIn(["user", "data"], Map()),
  transactions: state.getIn(["transactions", "data"], Map()),
  loadingtransactions: state.getIn(["transactions", "loading"], false)
});

const mapDispatchToProps = {
  loadTransactions: () => fetchTransactions(transactionSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsTable);
