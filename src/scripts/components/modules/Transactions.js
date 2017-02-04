import React, {PropTypes} from 'react';
import Component from '../../Model';
import Theme from '../../utilities/theme';
import getPath from 'lodash/get';
// Components
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';
import Transaction from './Transaction';
import ReactTransitionGroup from 'react-addons-css-transition-group';
import Avatar from 'material-ui/Avatar';
// Icons
import CompareArrows from 'material-ui/svg-icons/action/compare-arrows';
// Colors
import {blue500} from 'material-ui/styles/colors';

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

        if (!list || !list.length) {
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
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
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

    render() {
        const {
            getList,
            getHeader
        } = this;

        return (
            <Theme>
                <Paper style={{margin: 12}}>
                    <Subheader>
                        <Avatar
                            style={{
                                position: 'relative',
                                top: 5,
                                marginRight: 12
                            }}
                            color={blue500}
                            icon={<CompareArrows />}
                            size={30} />
                        {getHeader || Transactions}
                    </Subheader>
                    {getList}
                </Paper>
            </Theme>
        );
    }
}
