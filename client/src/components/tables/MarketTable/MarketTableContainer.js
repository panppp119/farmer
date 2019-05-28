import { connect } from "react-redux";
import { Map } from "immutable";

import {
  fetchMarket,
  updateMarket,
  addMarket,
  deleteMarket
} from "actions/market";
import marketSchema from "schemas/market";

import MarketTable from "./MarketTable";

const mapStateToProps = state => ({
  user: state.getIn(["user", "data"], Map()),
  market: state.getIn(["market", "data"], Map()),
  loadingMarket: state.getIn(["market", "loading"], false)
});

const mapDispatchToProps = {
  loadMarket: () => fetchMarket(marketSchema),
  save: data => addMarket(data, marketSchema),
  update: data => updateMarket(data, marketSchema),
  delete: id => deleteMarket(id, marketSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketTable);
