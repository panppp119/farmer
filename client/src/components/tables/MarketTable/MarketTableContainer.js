import { connect } from "react-redux";
import { Map } from "immutable";

// import { fetchUser } from "actions/user";
// import { fetchMarket, updateMarket, addMarket } from "actions/market";
// import userSchema from 'schemas/user'
// import marketSchema from 'schemas/market'

import MarketTable from "./MarketTable";

const mapStateToProps = state => ({
  // user: state.getIn(["user", "data"], Map()),
  // market: state.getIn(["market", "data"], Map()),
  // loadingUser: state.getIn(["user", "loading"], false),
  // loadingMarket: state.getIn(["market", "loading"], false),
});

const mapDispatchToProps = {
  // loadUser: () => fetchUser(userSchema),
  // loadMarket: () => fetchMarket(marketSchema),
  // addMarket: (data) => addMarket(data, marketSchema),
  // updateMarket: (data) => updateMarket(data, marketSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketTable);
