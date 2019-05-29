import React from "react";
import Numeral from "numeral";
import { Grid, Header } from "semantic-ui-react";
import { withTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import MarketTable from "components/tables/MarketTable";
import TransactionsTable from "components/tables/TransactionsTable";
import AddressesTable from "components/tables/AddressesTable";

import "./Home.scss";

class Home extends React.Component {
  componentDidMount() {
    this.props.loadWallet();
  }

  render() {
    const { wallet } = this.props;

    return (
      <div className='home'>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={8} mobile={16}>
              <div className='market card'>
                <Header as='h4'>ราคาตลาด</Header>
                <MarketTable />
              </div>
            </Grid.Column>

            <Grid.Column computer={8} mobile={16}>
              <div className='total-amount card'>
                <Header as='h4'>เงินในกระเป๋า</Header>
                <Header as='h1'>
                  THB {Numeral(wallet.get("amount") || 0).format("0,0.00")}
                </Header>

                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  onClick={this.withdraw}
                >
                  ถอนเงิน
                </Button>
              </div>

              <div className='activities card'>
                <Header as='h4'>ประวัติ</Header>
                <TransactionsTable />
              </div>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16} textAlign='left'>
              <div className='addresses card'>
                <Header as='h4'>สถานที่</Header>
                <AddressesTable />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default withTheme()(Home);
