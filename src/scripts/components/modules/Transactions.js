import React, {PropTypes} from 'react';
import Component from '../../Model';
import Theme from '../../utilities/theme';
import getPath from 'lodash/get';
// Components
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';
import Transaction from './Transaction';

export default class Transactions extends Component {
    static propTypes = {
        data: PropTypes.object
    };

    get getList() {
        const {data} = this.props;

        let list = getPath(data, 'transactions');

        let style = {
            display: 'block',
            margin: '12px auto'
        };

        if (!list) {
            return (
                <CircularProgress style={style}/>
            );
        }

        list = list.map(transaction => (
                <Transaction
                    key={transaction.id}
                    data={transaction}/>
            ));

        return (
            <div className="table">
                {list}
            </div>
        );
    }

    render() {
        const {getList} = this;

        return (
            <Theme>
                <Paper>
                    <Subheader>Transactions</Subheader>
                    {getList}
                </Paper>
            </Theme>
        );
    }
}
