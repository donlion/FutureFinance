import React, {PropTypes} from 'react';
import Component from '../../Model';
import Theme from '../../utilities/theme';
import getPath from 'lodash/get';
import formatTime from '../../utilities/formatTime';
import numberToCurrency from '../../utilities/numberToCurrency';
// Components
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Transaction from './Transaction';
import ReactTransitionGroup from 'react-addons-css-transition-group';
import Avatar from 'material-ui/Avatar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
// Icons
import CompareArrows from 'material-ui/svg-icons/action/compare-arrows';
// Colors
import {blue500} from 'material-ui/styles/colors';

export default class Transactions extends Component {
    static propTypes = {
        data: PropTypes.object
    };

    constructor() {
        super();

        this.state = {limit: 5};
    }

    get getTransactions() {
        const {
            props: {data},
            state: {limit}
        } = this;

        let transactions = getPath(data, 'transactions');

        if (transactions.length > limit && limit !== 0) {
            transactions = transactions.slice(0, limit);
        }

        return transactions;
    }

    get getList() {
        const {getTransactions} = this;

        let list = getTransactions;

        if (!list || !list.length) {
            return (
                <div className="table">
                    <div className="row">
                        <div className="column">
                            No transactions found
                        </div>
                        <div className="column">
                        </div>
                    </div>
                </div>
            );
        }

        list = list.map(transaction => (
                <Transaction
                    key={transaction.id}
                    data={transaction}/>
            ));

        return (
            <div className="table">
                <div className="row">
                    <div className="column">
                        <small className="prominent">Date</small>
                    </div>
                    <div className="column absorbing">
                        <small className="prominent">Description</small>
                    </div>
                    <div className="column">
                        <small className="prominent">Amount</small>
                    </div>
                </div>
                <ReactTransitionGroup
                    component="div"
                    className="body"
                    transitionName="animated"
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={400}>
                    {list}
                </ReactTransitionGroup>
            </div>
        );
    }

    get getHeader() {
        const {data} = this.props;

        let header = getPath(data, 'header');

        return header || false;
    }

    get getTime() {
        const {data} = this;

        let time = getPath(data, 'time');

        return time || false;
    }

    get getLimitDropdown() {
        const {limit} = this.state;

        let onChange = (event, index, value) => this.setState({limit: value});

        return (
            <DropDownMenu
                value={limit}
                onChange={onChange}>
                <MenuItem
                    value={1}
                    primaryText="Limit list to 1 transaction" />
                <MenuItem
                    value={5}
                    primaryText="Limit list to 5 transactions" />
                <MenuItem
                    value={10}
                    primaryText="Limit list to 10 transactions" />
                <MenuItem
                    value={20}
                    primaryText="Limit list to 20 transactions" />
                <MenuItem
                    value={50}
                    primaryText="Limit list to 50 transactions" />
                <MenuItem
                    value={0}
                    primaryText="Show all transactions" />
            </DropDownMenu>
        );
    }

    get getAmount() {
        const {data} = this.props;

        let amount = getPath(data, 'amount');

        if (!amount) {
            amount = 0;
        }

        return numberToCurrency(amount);
    }

    render() {
        const {
            getList,
            getHeader,
            getTime,
            getLimitDropdown,
            getAmount
        } = this;

        return (
            <Theme>
                <Paper
                    className="transactions"
                    style={{margin: 12}}>
                    <Subheader>
                        <Avatar
                            style={{
                                position: 'relative',
                                top: 5,
                                marginRight: 12
                            }}
                            color={blue500}
                            backgroundColor="transparent"
                            icon={<CompareArrows />}
                            size={30} />
                        <strong>{getHeader || 'Transactions'}</strong>
                        {getTime ? ` - ${formatTime(getTime)}` : null}
                    </Subheader>
                    <Subheader>You spent DKK <strong>{getAmount}</strong></Subheader>
                    <Divider />
                    {getLimitDropdown}
                    {getList}
                </Paper>
            </Theme>
        );
    }
}
