import React from "react";
import Numeral from "numeral";
import { Grid, Header } from "semantic-ui-react";

import "./Home.scss";

class Home extends React.Component {
  render() {
    return (
      <div className='home'>
        <Grid>
          <Grid.Column computer={8} mobile={16}>
            <div className='total-amount card'>
              <Header as='h3'>เงินในกระเป๋า</Header>
              <Header as='h1'>THB {Numeral(0).format("0,0.00")}</Header>
            </div>
          </Grid.Column>

          <Grid.Column computer={8} mobile={16}>
            <div className='sale-amount card'>
              <Header as='h3'>ยอดขาย</Header>
              <Header as='h1'>THB {Numeral(0).format("0,0.00")}</Header>
            </div>
          </Grid.Column>

          <Grid.Column computer={16} mobile={16}>
            <div className='activities card'>
              <Header as='h3'>กิจกรรม</Header>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Home;
