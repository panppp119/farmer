import React from "react";
import Numeral from "numeral";
import { List } from "immutable";
import { Grid, Header, Modal } from "semantic-ui-react";
import { withTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import MarketTable from "components/tables/MarketTable";
import TransactionsTable from "components/tables/TransactionsTable";
import AddressesTable from "components/tables/AddressesTable";
import WithdrawForm from "components/forms/WithdrawForm";

import "./Home.scss";

class Home extends React.Component {
  state = {
    modal: false
  };

  componentDidMount() {
    this.props.loadWallet();
  }

  withdraw = e => this.setState({ modal: true });
  close = e => this.setState({ modal: false });

  modal() {
    return (
      <Modal open={this.state.modal} onClose={this.close} closeIcon>
        <Modal.Header>ถอนเงิน</Modal.Header>
        <Modal.Content>
          <WithdrawForm
            wallet={this.props.wallet}
            addTransaction={this.props.addTransaction}
            close={this.close}
          />
        </Modal.Content>
      </Modal>
    );
  }

  render() {
    const { wallet, user } = this.props;

    const roles = user.get("roles") || List();
    const driver = roles.includes("driver");

    return (
      <div className='home'>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={8} mobile={16}>
              <div className='total-amount card'>
                <Header as='h4'>เงินในกระเป๋า</Header>
                <Header as='h1'>
                  THB {Numeral(wallet.get("amount") || 0).format("0,0.00")}
                </Header>

                {this.modal()}

                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  onClick={this.withdraw}
                  disabled={wallet.get("status") === 0}
                >
                  ถอนเงิน
                </Button>
              </div>

              <div className='activities card'>
                <Header as='h4'>ประวัติ</Header>
                <TransactionsTable />
              </div>
            </Grid.Column>

            <Grid.Column computer={8} mobile={16}>
              <div className='market card'>
                <Header as='h4'>ราคาตลาด</Header>
                <MarketTable />
              </div>
            </Grid.Column>
          </Grid.Row>

          {driver && (
            <Grid.Row>
              <Grid.Column width={16} textAlign='left'>
                <div className='addresses card'>
                  <Header as='h4'>สถานที่</Header>
                  <AddressesTable />
                </div>
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </div>
    );
  }
}

export default withTheme()(Home);
