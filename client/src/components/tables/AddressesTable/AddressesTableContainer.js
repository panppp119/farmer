import { connect } from "react-redux";
import { Map, List } from "immutable";

import { fetchAddresses } from "actions/addresses";
import { addProduct, fetchProducts, updateProduct } from "actions/products";
import { fetchMarket } from "actions/market";
import { addTransaction } from "actions/transactions";
import addressSchema from "schemas/address";
import productSchema from "schemas/product";
import marketSchema from "schemas/market";
import transactionSchema from "schemas/transaction";

import AddressesTable from "./AddressesTable";

const mapStateToProps = state => ({
  user: state.getIn(["user", "data"], Map()),
  addresses: state.getIn(["address", "collection"], List()),
  products: state.getIn(["products", "data"], List()),
  market: state.getIn(["market", "data"], List()),
  loadingAddresses: state.getIn(["address", "loading"], false),
  loadingProducts: state.getIn(["products", "loading"], false),
  loadingMarket: state.getIn(["market", "loading"], false),
  loadingTransaction: state.getIn(["transactions", "loading"], false)
});

const mapDispatchToProps = {
  loadAddresses: () => fetchAddresses(addressSchema),
  loadProducts: () => fetchProducts(productSchema),
  loadMarket: () => fetchMarket(marketSchema),
  addProduct: data => addProduct(data, productSchema),
  addTransaction: data => addTransaction(data, transactionSchema),
  updateProduct: (id, data) => updateProduct(id, data, productSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressesTable);
