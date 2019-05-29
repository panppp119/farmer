import React from "react";
import Numeral from "numeral";
import S from "string";
import Moment from "moment";
import { withTheme } from "@material-ui/core/styles";
import { Grid, Label } from "semantic-ui-react";

import "./TransactionsTable.scss";

class TransactionsTable extends React.Component {
  componentDidMount() {
    this.props.transactions.isEmpty() && this.props.loadTransactions();
  }

  render() {
    const { transactions } = this.props;

    return (
      <div className='transactions-table'>
        <Grid>
          {!transactions.isEmpty() ? (
            transactions.map((item, i) => {
              return (
                <Grid.Row key={i}>
                  <Grid.Column
                    width={6}
                    textAlign='left'
                    verticalAlign='middle'
                  >
                    <p>
                      {item.get("type")} - (
                      {Moment(item.get("created_at")).format("DD/MM/YY")})
                    </p>
                  </Grid.Column>

                  <Grid.Column
                    width={5}
                    textAlign='right'
                    verticalAlign='middle'
                  >
                    THB {Numeral(item.get("amount")).format("0,0.00")}
                  </Grid.Column>

                  <Grid.Column
                    width={5}
                    textAlign='center'
                    verticalAlign='middle'
                  >
                    <Label>{S(item.get("status")).humanize().s}</Label>
                  </Grid.Column>
                </Grid.Row>
              );
            })
          ) : (
            <Grid.Row>
              <p>ไม่มีประวัติ</p>
            </Grid.Row>
          )}
        </Grid>
      </div>
    );
  }
}

export default withTheme()(TransactionsTable);
