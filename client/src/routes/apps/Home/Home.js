import React from "react";
import Numeral from "numeral";
import { Grid, Header } from "semantic-ui-react";
import { withTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import MarketTable from "components/tables/MarketTable";

import "./Home.scss";

class Home extends React.Component {
  render() {
    return (
      <div className='home'>
        <Grid>
          <Grid.Column computer={8} mobile={16}>
            <div className='market card'>
              <Header as='h4'>ราคาตลาด</Header>
              <MarketTable />
            </div>
          </Grid.Column>

          <Grid.Column computer={8} mobile={16}>
            <div className='total-amount card'>
              <Header as='h4'>เงินในกระเป๋า</Header>
              <Header as='h1'>THB {Numeral(0).format("0,0.00")}</Header>

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
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withTheme()(Home);
