import React from "react";
import Numeral from "numeral";
import { withTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Header, Container } from "semantic-ui-react";

import WalletForm from "components/forms/WalletForm";
import TransactionsTable from "components/tables/TransactionsTable";

import "./Wallet.scss";

class Wallet extends React.Component {
  state = {
    add: false
  };

  componentDidMount() {
    this.props.wallet.isEmpty() && this.props.loadWallet();
  }

  add = e => {
    e.preventDefault();

    this.setState({ add: true });
  };

  render() {
    const { add } = this.state;
    const { wallet } = this.props;

    return (
      <div className='wallet'>
        {wallet.isEmpty() && !add ? (
          <Button
            fullWidth
            id='add-button'
            variant='contained'
            style={{ marginTop: 16 }}
            onClick={this.add}
          >
            เพิ่มบัญชี
          </Button>
        ) : (
          <WalletForm
            user={this.props.user}
            wallet={wallet}
            updateWallet={this.props.updateWallet}
            addWallet={this.props.addWallet}
            loadingUser={this.props.loadingUser}
            loadingWallet={this.props.loadingWallet}
          />
        )}

        <Container>
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
        </Container>
      </div>
    );
  }
}

export default withTheme()(Wallet);
